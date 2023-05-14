const express = require('express')
const app = express()
let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]
let aujourdhui = new Date()
//We are going to create route that display our persons variable on the browser
app.get('/api/persons/', (request, response) => {
    response.json(persons)
})

//We are going to create another route that return the number of the element in our persons array and the time
//where the request has been made
app.get('/api/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} peoples <p></p> ${aujourdhui}`)
})




























const PORT = 3002
app.listen(PORT, () => {
    console.log(`Your application is listening on port ${PORT}`)
})
