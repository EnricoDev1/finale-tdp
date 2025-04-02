export const getPosts = (req, res) => {
    res.json([{id: 0, title: "Articolo 1", desc: "Descrizione 1"}, {id: 1, nome: "Articolo 2", cognome: "Descrizione 2"}])
}

export const newPost = (req, res) => {
    /* ... */
}

export const getPostById = (req, res) => {
    /* ... */
}

export const deletePostById = (req, res) => {
    /* ... */
}
