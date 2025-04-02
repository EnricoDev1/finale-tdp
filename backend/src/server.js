import apiRoutes from "./routes/api.js";
import express from "express";
import pool from './db.js';
import path from "path";

const app = express()


pool.getConnection()
  .then((connection) => {
    app.set("view engine", "ejs");
    app.set("views", path.join(process.cwd(), "views"));
    app.use(express.static("public"));

    // parse request
    app.use(express.json());

    // start every request with /api/
    app.use('/api', apiRoutes)

    app.listen(process.env.PORT, '0.0.0.0', () => {
        console.log("Server in ascolto su http://localhost:3000.");

        // Test query
        pool.query('SELECT 1')
          .then(([rows]) => {
            console.log("Query test riuscita:", rows);
          })
          .catch(err => {
            console.error("Query test fallita:", err);
          });
      });
  })
  .catch(err => {
    console.error('❌ Connessione al DB fallita:', err);
    process.exit(1);
  });
