const express = require('express')

require('dotenv').config()

const PORT = process.env.PORT || 7000

const app = express()

app.use(express.json())

app.get('/api/fae', (_,res) => {
    res.send({
        msg: "Chez FAE on a tout ce qu'on veut!"
    })
})

app.listen(PORT, () => {
    console.log(`le serveur est lancé sur le port: ${PORT}`)
})