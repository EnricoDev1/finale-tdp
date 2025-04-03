import pool from "../db.js"

export const getPosts = (req, res) => {
    pool.query('SELECT displayname as author, title, content, timestamp FROM posts JOIN users ON users.id = posts.id_author')
        .then(([rows]) => {
            res.json(rows);
        })
        .catch(err => {
            console.error("Query test fallita:", err);
        });
}

export const newPost = (req, res) => {
    /* ... */
}

export const getPostById = (req, res) => {
    const { id } = req.params;
    pool.query('SELECT displayname as author, title, content, timestamp FROM posts JOIN users ON users.id = posts.id_author WHERE posts.id = ?', [id])
        .then(([rows]) => {
            res.json(rows);
        })
        .catch(err => {
            console.error("Query test fallita:", err);
        });
}

export const deletePostById = (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM posts WHERE id = ?', [id])
        .then(([rows]) => {
            res.json({ "status": "ok" });
        })
        .catch(err => {
            res.status(500);
            res.json({"err" : "Impossible to delete"});
            console.error("Query test fallita:", err);
        });
}
