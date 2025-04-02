export const getUsers = (req, res) => {
    res.json([{id: 0, nome: "Michele", cognome: "Cavagni"}, {id: 1, nome: "Enrico", cognome: "Officioso"}])
}

export const getUserById = (req, res) => {
    const { id } = req.body;
    res.json({id, nome: "Michele"}) // poi lo implemento lol
}
