const mysql = require('mysql2/promise');

// Datenbankverbindung konfigurieren
const pool = mysql.createPool({
  host: '10.0.1.217',     // MySQL Host
  user: 'root',  // MySQL Benutzer
  password: 'root', // Passwort
  database: 'todo_db',   // Datenbankname
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;