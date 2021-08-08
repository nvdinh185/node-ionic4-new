const formidable = require('formidable');
const fs = require('fs');
const systempath = require('path');

const db = require('../db/sqlite3/db-pool');
const dirUpload = 'uploads';
if (!fs.existsSync(dirUpload)) fs.mkdirSync(dirUpload);

class Handlers {
    getItems(req, res) {
        db.getRsts("select * from users")
            .then(results => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify(results
                    , (key, value) => {
                        if (value === null) { return undefined; }
                        return value;
                    }
                ));
            })
            .catch(err => {
                res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(JSON.stringify(err));
            });
    }

    postUpload(req, res) {
        try {
            var form = new formidable.IncomingForm();
            //thư mục chứa files upload lên
            form.uploadDir = dirUpload;
            form.parse(req, (err, fields, files) => {
                for (let key in files) {//duyệt qua các file đã post lên
                    var oldpath = files[key].path;
                    var newpath = form.uploadDir + systempath.sep + files[key].name;
                    fs.rename(oldpath, newpath, err => { });
                }
            });
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(JSON.stringify({ message: 'success' }));
        } catch (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(JSON.stringify({ error: err }));
        }
    }
}

module.exports = new Handlers()