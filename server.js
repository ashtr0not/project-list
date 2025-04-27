// Setting Up Required Modules
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const PORT = 7777

//Database Setup 
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'projects' 

MongoClient.connect(dbConnectionStr)
    .then(client =>{
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

//Middleware/Application Set Up
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//CRUD API SECTION

//GET Request
app.get('/', (request,response) => {
    db.collection('projects').find().toArray()
    .then(data => {
        response.render('index.ejs', {project: data})
    })
    .catch(error => console.error(error))
})

//POST Request
app.post('/addProject', (request,response) => {
    db.collection('projects').insertOne({projectName: request.body.projectName, projectDescription: request.body.projectDescription, projectLink: request.body.projectLink, status: ""})
    .then(result => {
        console.log('Project Added')
        response.redirect('/') 
    })
})
//PUT Request (Drop-Down arrow for Status Updates which will change the block color)
app.put('/updateProjectStatus', (request,response) => {
    const { projectName, color } = request.body
    db.collection('projects').updateOne(
        { projectName },
        { $set: { color } }
        )
    .then(result => {
        console.log('Oh yea')
        response.json('I am working but not 100% yet')
    })
    .catch(error => console.error(error))
    // console.log("Route is good!!")
})

//DELETE Request 
app.delete('/deleteProject', (request,response) => {
    db.collection('projects').deleteOne({projectName: request.body.projectName})
    .then(result => {
        console.log('Project Deleted')
        response.json('Project Deleted')
    })
    .catch(error => console.error(error))
})

//Setting up app to listen on port 7777
app.listen(process.env.PORT || PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})