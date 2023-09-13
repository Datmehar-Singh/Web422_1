/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Datmehar Singh, Student ID: 108011214, Date: 13-09-2023
*  Cyclic Link: _______________________________________________________________
*
********************************************************************************/ 

const express = require('express');
const app = express();
const path = require('path');
var HTTP_PORT = process.env.PORT || 3000;
const cors = require('cors');
require('dotenv').config();
app.use(express.json())
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();


app.use(cors());


app.get("/", function(req,res){
    res.json({"message":"API Listening"})
})

app.post("/api/movies",function(req,res){
    db.addNewMovie(req.body)
    .then(()=>{res.status(201).json('new movie added')})
    .catch((err)=>{res.status(500).json(err)})
})

app.get("/api/movies",function(req,res){
    db.getAllMovies(req.query.page,req.query.perPage,req.query.title)
    .then((movies)=>{res.status(201).json(movies)})
    .catch((err)=>{res.status(500).json(err)})
})

app.get("/api/movies/:id",function(req,res){
    db.deleteMovieById(req.params.id)
    .then((movies)=>{res.status(201).json(movies)})
    .catch((err)=>{res.status(500).json(err)})
})

app.put("/api/movies/:id",function(req,res){
    db.updateMovieById(req.body,req.params.id)
    .then((movies)=>{res.status(201).json(movies)})
    .catch((err)=>{res.status(500).json(err)})
})

app.delete("/api/movies/:id",function(req,res){
    db.deleteMovieById(req.params.id)
    .then(()=>{res.status(201).json('movie deleted successfully')})
    .catch((err)=>{res.status(500).json(err)})
})



db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});

