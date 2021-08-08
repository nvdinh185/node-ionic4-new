const db = require('../db/sqlite3/db-pool');

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

    postItem(req, res) { }
}

module.exports = new Handlers()