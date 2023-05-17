const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const morgan = require('morgan')
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static('build'))
let persons = [
    {
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
//We are going to create a route that display information for a single person
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})
//We are going to Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
    response.status(204).end()
})
//We are going to expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address http://localhost:3001/api/persons.
app.post('/api/persons', (request, response) => {
    const body = request.body
    const person = {
        id: Math.floor(Math.random(100) * 100),
        name: body.name,
        number: body.number,
    }
    if (body.name === '' || body.number === '') {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const existingPerson = persons.find((person) => person.name === body.name);
    if (existingPerson) {
        return response.status(400).json({
            error: 'name must be unique',
        });
    }
    else {
        persons = persons.concat(person),
            response.json(person)
    }

})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Your application is listening on port ${PORT}`)
})
