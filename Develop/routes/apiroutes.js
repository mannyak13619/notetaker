// import dependencies
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// save file path to db storage as notesPath variable
const notesPath = path.join(__dirname, '../db/db.json');

// function to return data of GET from note file path
function getNotes() {
    try {
        const noteData = fs.readFileSync(notesPath, 'utf-8');
        if (!noteData) {
            return [];
        }
        return JSON.parse(noteData);
    } catch (error) {
        console.error('Error reading notes file:', error);
        return [];
    }
};

// GET route to render list of notes
router.get('/notes', (req, res) => {
    const notes = getNotes();
    console.log(notes);
    return res.json(notes);
});

// function to SET data to note file path
function setNotes(notes) {
    fs.writeFileSync(notesPath, JSON.stringify(notes));
};

// POST route to save new note
router.post('/notes', (req, res) => {
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
    };

    const notesArray = getNotes();
    notesArray.push(newNote);
    setNotes(notesArray);
    return res.status(201).json({ message: 'Note saved successfully.' })
});


// DELETE route to delete a specific note
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    let noteData = getNotes();
    // parses noteData and includes all notes that DO NOT have the same ID as noteId (effectively removes all notes with the same ID as noteId)
    noteData = noteData.filter(note => note.id !== noteId);
    setNotes(noteData);
    res.status(204).json({ message: 'Deletion request receieved.' })
});

module.exports = router;