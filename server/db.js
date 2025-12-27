const mysql = require("mysql2/promise");

function poolFromPublicUrl(publicUrl) {
  const u = new URL(publicUrl);

  return mysql.createPool({
    host: u.hostname,
    port: Number(u.port || 3306),
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace("/", ""), // <-- learnhub
    ssl: { rejectUnauthorized: false },
    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 20000,
  });
}

if (!process.env.MYSQL_PUBLIC_URL) {
  throw new Error("MYSQL_PUBLIC_URL is missing");
}

const db = poolFromPublicUrl(process.env.MYSQL_PUBLIC_URL);

module.exports = db;
