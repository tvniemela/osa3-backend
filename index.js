require('dotenv').config()
const express=require('express')
const app=express()
const cors=require('cors')
const Person=require('./models/person')
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

  app.get('/api/persons', (request, response) => {
    Person.find().then(persons=>{
      response.json(persons)
    })
  })

  app.get('/info',(request,response)=>{
    Person.find().then(persons=>{response.send
      (`<p>Phonebook has info for ${persons.length} people<p/><p>${new Date()}</p>`)
    })
  })

  app.get('/api/persons/:id',(request, response,next)=>{
    Person.findById(request.params.id).then(person=>{
      if(person){
      response.json(person)
    }
      else{
        response.status(404).end()
      }
    })
    .catch(error=>next(error))
  })

  app.delete('/api/persons/:id',(request,response,next)=>{
    Person.findByIdAndDelete(request.params.id).then(result=>{
      response.status(204).end()
      .catch(error=>next(error))
    })

  })
  app.post('/api/persons',(request,response,next)=>{
    const id=Math.floor(Math.random() * 100000)
    const body=request.body
    
    if(!body.name || !body.number){
      return response.status(400).json({
        error:'must include name and number'
      })
    }
    else {
      const person=new Person({
        name:body.name,
        number:body.number,
        id:id
      })
      person.save().then(savedPerson=>{
        response.json(savedPerson)
      })
      .catch(error=>next(error))
    }
  })

  const errorHandler=(error,request,response,next)=>{
    console.error(error.message)
    if(error.name==='CastError'){
      return response.status(400).send({error: 'malformatted id'})
    }
    else if(error.name==='ValidationError'){
      return response.status(400).json({error:error.message})
    }
    next(error)
  }
  app.use(errorHandler)

  const PORT=process.env.PORT || 3001
  app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
  
  