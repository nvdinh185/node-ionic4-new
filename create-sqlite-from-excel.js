/**
 * Tao database sqlite from excel
 * file nay chay mot lan bang tay khi muon tao mot csdl bang file exel
 * Thuc hien doc cau truc file excel roi tao database ban dau
 * sau do cac service se lay de handle db sau
 */

const excel_db = require('./db/sqlite3/excel-sqlite-service');

const excelFilename = "./db/excel/users.xlsx"; //ten file excel cau hinh
const dbFilename = "./db/database/users.db";     //ten database muon tao
const fs = require('fs');
//xoa file csdl cu neu co
if (fs.existsSync(dbFilename)) {
    fs.unlinkSync(dbFilename);
    console.error("Xoa file cu thanh cong");
}
excel_db.Excel2Sqlite.createDatabase(excelFilename, dbFilename);