//
const data = require("../db/db.json");
const uuid = require('uuid');
const fs = require("fs");
const path = require("path");
const { json } = require("express");



module.exports = (app) => {
    //gets and returns api json
    app.get('/api/notes', function (req, res) {
        const notesRead = fs.readFileSync(__dirname + '/../db/db.json');
        const db = JSON.parse(notesRead);
        console.log(db);
        res.json(db);
    });
    //posts notes to database
    app.post('/api/notes', (req, res) => {
        const notesRead = fs.readFileSync(__dirname + '/../db/db.json');
        const db = JSON.parse(notesRead);
        console.log(req.body);
        const note = buildNote(req.body);
        note.id = uuid.v4();
        db.push(note);
        const saveNote = JSON.stringify(db);
        fs.writeFileSync(__dirname + "/../db/db.json", saveNote);
        res.json(saveNote);
    });
    //deletes notes from database
    app.delete("/api/notes/:id", (req, res) => {
        const notesRead = fs.readFileSync(__dirname + '/../db/db.json');
        const db = JSON.parse(notesRead);
        const rmvNote = db.filter((noteID) => noteID.id !== req.params.id);
        fs.writeFileSync(__dirname + "/../db/db.json", JSON.stringify(rmvNote));
        res.json(rmvNote);
    })

    function buildNote(note) {
        const noteData = {
            title: note.title,
            text: note.text,
        }
        return noteData;
    }

};