/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Glenn Parreno Student ID: 115814196 Date: 13 - 01 - 23
*  Cyclic Link: https://violet-gosling-hose.cyclic.app
*
********************************************************************************/
const express = require('express');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const cors = require('cors');
require('dotenv').config();
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();


app.use(cors());
app.use(express.json());

app.get("/", function(req, res) {
    res.json({message: "API Listening"});
});

//Routes

//POST /api/movies
app.post("/api/movies", function(req, res){
    var newItem = req.body;

    db.addNewMovie(newItem).then((data)=>{
        res.status(201).send(data);
    }).catch((err)=>{
        res.json({message: `Unable to create new movie`});
    });
})

//GET /api/movies
app.get("/api/movies", function(req,res){
    var page = req.query.page;
    var perPage = req.query.perPage;
    var title = req.query.title;

    db.getAllMovies(page, perPage, title).then((data)=>{
        res.json({message: data});
    }).catch((err)=>
    {
        res.status(204).send("Movie does not exist in the collection");
    })
});

//GET /api/movies
app.get("/api/movies/:id", function(req, res){
    var id = req.params.id;

    db.getMovieById(id).then((data)=>
    {
        res.json({message: data});
    }).catch((err) =>
    {
        res.status(204).send("Movie does not exist in the collection");
    })
});

//PUT /api/movie
app.put("/api/movies/:id", function(req,res){
    var id = req.params.id;
    var data = req.body;

    db.updateMovieById(data, id).then(()=>{
        res.json({message: `movie ${id} has been deleted`});
    }).catch((err)=>{
        res.send({message: err});
    })
})

//DELETE /api/movies
app.delete("/api/movies/:id", function(req,res){
    var id = req.params.id;

    db.deleteMovieById(id).then(()=>{
        res.json({message: `movie ${id} has been deleted`});
    }).catch((err)=> {
        res.status(500)
    })
});

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
})