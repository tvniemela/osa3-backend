const mongoose=require('mongoose')

const password=process.argv[2]
const url=`mongodb+srv://dbUser:${password}@cluster0.08zbuka.mongodb.net/puhelinluetteloApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)
    

const personSchema=new mongoose.Schema({
    name:String,
    number:String
})
const Person=mongoose.model('Person',personSchema)

if (process.argv[3]){
    const person=new Person({
        name:process.argv[3],
        number:process.argv[4]

    })

    person.save().then(result=>{
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}
Person.find({}).then(result=>{
    console.log('phonebook:')
    result.forEach(person=>{
        console.log(`${person.name} ${person.number}`)}
    )
    mongoose.connection.close()
})