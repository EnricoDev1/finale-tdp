import pool from "../db.js"

export const getUsers = (req, res) => {
    pool.query('SELECT id, displayname, username, lastlogin, role FROM users')
    .then(([rows]) => {
        res.json(rows);
    })
    .catch(err => {
      console.error("Query test fallita:", err);
    });
}

export const getUserById = (req, res) => {
    const { id } = req.params;
    pool.query('SELECT displayname, lastlogin, role FROM users WHERE id = ?', [id])
    .then(([rows]) => {
        res.json(rows);
    })
    .catch(err => {
        res.status(500);
        res.json({"err" : "Impossible to get this user"});
        console.error("Query fallita:", err);
    });
}
