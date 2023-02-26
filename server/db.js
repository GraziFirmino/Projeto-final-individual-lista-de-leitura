const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            author TEXT,
            category TEXT,
            completed BOOLEAN,
            progress INTEGER
        )`,
        (err) => {
          if (err) {
            console.log('Table already exists.');
          } else {
            const insert = 'INSERT INTO tasks (title, author, category, completed, progress) VALUES (?, ?, ?, ?, ?)';
            db.run(insert, ['Book 1', 'Author 1', 'Fiction', false, 0]);
            db.run(insert, ['Book 2', 'Author 2', 'Non-fiction', true, 100]);
            console.log('Table created and sample data added.');
          }
        }
    );
  }
});

module.exports = db;
