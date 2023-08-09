const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./test.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.log(err.message);
  console.log("Database Connected");
});

const sql = `delete from users where username='NULL'`;

db.run(sql, [], (err, rows) => {
  if (err) console.log(err.message);
  console.log("row deleted");
});
