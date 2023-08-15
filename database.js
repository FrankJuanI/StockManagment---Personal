const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("items.db");

db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY,
    nombre TEXT,
    precio INTEGER,
    descripcion TEXT,
    cantidad INTEGER,
    url TEXT
)`);

module.exports = db;
