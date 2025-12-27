const mysql = require("mysql2");

function poolFromPublicUrl(publicUrl) {
  const u = new URL(publicUrl);

  return mysql.createPool({
    host: u.hostname,
    port: Number(u.port || 3306),
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace("/", ""),
    ssl: { rejectUnauthorized: false },

    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 20000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
  });
}

const db = process.env.MYSQL_PUBLIC_URL
  ? poolFromPublicUrl(process.env.MYSQL_PUBLIC_URL)
  : mysql.createPool({
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      port: Number(process.env.MYSQLPORT || 3306),
      ssl: { rejectUnauthorized: false },
      waitForConnections: true,
      connectionLimit: 10,
      connectTimeout: 20000,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
    });

module.exports = db;
