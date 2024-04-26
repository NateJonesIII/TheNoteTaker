# Note Taker

## Description

Note Taker is a web application built using Express and Heroku, allowing users to create, store, and delete notes conveniently.

## Table of Contents

- [Link](#link)
- [Demo](#demo)
- [Installation](#installation)
- [Technologies](#technologies)
- [Usage](#usage)
- [Tests](#tests)
- [CodeSamples](#code-samples)
  - [routes](#routes)
- [Creator](#creator)

## Link

[View Here!](https://notetaker24-a729bbe2a4f4.herokuapp.com)

## Demo

You can watch a demo of Note Taker here.
https://youtu.be/n1Fh4QklBEw

## Installation

To install Note Taker, you'll need Node.js along with npm. Once you have these installed, you can run the following command to install the necessary dependencies:

```
npm install express fs
```

## Technologies

Note Taker is a web application built using `Node.js`, `Express`, and `Heroku`. It allows users to create, store, and delete notes conveniently. The server-side script (server.js) handles the backend logic, while the front end is managed by HTML files (index.html and notes.html) and associated JavaScript files.

## Usage

After installation, you can use Note Taker to take notes by navigating to the provided link. Simply click on "Get Started" to begin creating and managing your notes.

## Tests

Note Taker has been tested on both Mac and Windows platforms using terminal and heroku commands.

## Code Samples

```Server.js
// Dependencies
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => {
console.log(`App listening on PORT: ${PORT}`);
});
```

```Index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Meta tags -->
  <title>Note Taker</title>
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.1.3/flatly/bootstrap.min.css" />
</head>
<body>
  <!-- Navbar -->
  <nav class="navbar navbar-dark bg-success">
    <a class="navbar-brand" href="/">The Note Taker📝</a>
  </nav>
  <!-- Main content -->
  <div class="container">
    <div style="margin-top: 80px;" class="jumbotron text-center">
      <h1 class="display-4">The Note Taker<span role="img" aria-label="Memo">📝</span></h1>
      <h4 class="mt-4">Take notes with Express</h4>
      <a class="btn btn-primary btn-lg mt-4" href="/notes" role="button">Get Started</a>
    </div>
  </div>
  <!-- JavaScript -->
  <script src="/assets/js/index.js"></script>
</body>
</html>
```

```db.json
[
    {
        "title": ":0",
        "text": "First time?",
        "id": "e0d81234-89b1-47f6-9a7c-68790abfd5c7"
    },
    {
        "title": "New note",
        "text": "newwww ",
        "id": "811b5e2f-c8d6-419f-86fd-29780df0f62e"
    }
]
```

### Routes

```apiRoutes.js

const data = require("../db/db.json");
const uuid = require('uuid');
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
app.get('/api/notes', function (req, res) {
const notesRead = fs.readFileSync(\_\_dirname + '/../db/db.json');
const db = JSON.parse(notesRead);
console.log(db);
res.json(db);
});

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
```

```htmlRoutes.js

const path = require("path");

module.exports = (app) => {
app.get('/notes', (req, res) => {
res.sendFile(path.join(\_\_dirname, '../public/notes.html'));
});

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

};
```

```Notes.html


<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Meta tags -->
  <title>Note Taker</title>
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.1.3/flatly/bootstrap.min.css" />
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
  <!-- Custom CSS -->
  <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
  <!-- Navbar -->
  <nav class="navbar navbar-dark bg-success">
    <a class="navbar-brand" href="/">The Note Taker📝</a>
    <div class="icons">
      <i class="fas fa-save text-light save-note"></i>
      <i class="fas fa-pen text-light new-note"></i>
    </div>
  </nav>
  <!-- Main content -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-4 list-container">
        <div class="card">
          <ul class="list-group">
          </ul>
        </div>
      </div>
      <div class="col-8">
        <input class="note-title" placeholder="Note Title" maxlength="28" type="text">
        <textarea class="note-textarea" placeholder="Note Text"></textarea>
      </div>
    </div>
  </div>
  <!-- JavaScript -->
  <script src="/assets/js/index.js"></script>
</body>
</html>
```

## Creator

- [Profile](https://github.com/NateJonesIII/ "Nathaniel Jones") - [LinkedIn](https://www.linkedin.com/in/nathaniel-jones/) - [Email](mailto:15nate.jones@gmail.com?subject=Hello "Hello Nate!")
