const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://biroue10:${password}@cluster0.z8qsr8z.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)
const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

person.save().then(result => {
    console.log(`Add ${person.name} number ${person.number} to the phonebook`)
    mongoose.connection.close()
})