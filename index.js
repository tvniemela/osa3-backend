
const express=require('express')
const app=express()
const cors=require('cors')
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

let persons=
    [
      {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456", 
      },
      {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523" 
      },
      {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
      },
      {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
      }
    ]
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
  app.get('/info',(request,response)=>{
    const date=new Date()
    response.send(`Phonebook has info for ${persons.length} people ${date}`)
  })
  app.get('/api/persons/:id',(request, response)=>{
    const id=request.params.id
    const person=persons.find(person=>person.id===id)
    response.json(person)
  })
  app.delete('/api/persons/:id',(request,response)=>{
    const id=request.params.id
    persons=persons.filter(person=>person.id!==id)
    response.status(204).end()
  })
  app.post('/api/persons',(request,response)=>{
    const id=Math.floor(Math.random() * ((100-persons.length) + persons.length))
    const body=request.body
    const person={
      id:id,
      name:body.name,
      number:body.number
    }
    if(!body.name || !body.number){
      return response.status(400).json({
        error:'must include name and number'
      })
    }
    else if(persons.some(person=>person.name==body.name)){
      return response.status(400).json({
        error:'name must be unique' 
      })
    }
    persons=persons.concat(person)
    response.json(person)

  })

  const PORT=process.env.PORT || 3001

  app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
  
  