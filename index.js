const { response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {id: 1, name: "Arto Hellas", number: "040-123456"},
    {id: 2, name: "Ada Lovelace", number: "39-44-5323523"},
    {id: 3, name: "Dan Abramov", number: "12-43-234245"},
    {id: 4, name: "Mary Poppendick", number: "39-23-6423122"}
]

app.get('/', (req, res) => {
    res.send('<h1>Hello world!</h1>')
})

app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`<div>
                Phonebook has info for ${persons.length} people
              </div>
              <div>
                ${date.toString()}
              </div>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    }
    if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    if (persons.find(p => p.name === person.name)) {
        return res.status(400).json({
            error: 'name already exists'
        })
    }

    persons = persons.concat(person)
    res.json(person)
})

const generateId = () => {
    return Math.floor(Math.random()*1000000)
}

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})