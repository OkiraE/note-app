const fs = require('fs');
const chalk = require('chalk');

// Loads the notes for me to store the data and use it in functions
const loadNotes = () => {
    try{
        const dataJSON = fs.readFileSync('notes.json').toString();
        return JSON.parse(dataJSON);
    }catch (e) {
        return [];
    }
};

// Adds a new note with Error handling
const addNote = (title, body) => {
    const notes = loadNotes();
    let permission = true;  // By default is true, the exception is for existing titles
    const successMessage = `New note of title: '${title}' has been added!`;
    const failMessage = `Sorry, title: '${title}' already exists`;

    debugger

    notes.map((x) => {
      if (title === x.title) {
          permission = false;
      }});

    if (permission === true) {
        notes.push({
            title: title,
            body: body
        });
        saveNote(notes);
        console.log(chalk.green(successMessage));
    }else {
        console.log(chalk.red(failMessage));
    }
};

// Overwrites 'notes.json' file with the updated note
const saveNote = (note) => {
    note = JSON.stringify(note);
    fs.writeFileSync('notes.json', note);
};

// Removes note with specified title
const rmNote = (title) => {
    let notes = loadNotes();
    let permission = false; // By default is false, only existing titles should be removed
    // let foundNote;
    const successMessage = `the note of title: '${title}' has been deleted!`;
    const failMessage = `Sorry, there isn't an existing Note with the title: ${title}`;

    notes.map((x) => {
        if (title === x.title) {
            permission = true;
            // foundNote = x;
            let value = x;
            notes = notes.filter((i) => {
                return i !== value
            });

        }});

    if (permission === true) {
        saveNote(notes);
        console.log(chalk.green(successMessage));
    }else {
        console.log(chalk.red(failMessage));
    }
};

// Lists all notes
const listNotes = () => {
    const notes = loadNotes();
    let cleanerNotes = Array();

    notes.map((note) => {
        cleanerNotes.push(note.title);
        // console.log(cleanerNotes);
    });

    cleanerNotes.map((title) => {
        console.log(chalk.cyan(title));
    });
};

// Get a specific note using a valid title
const getNote = (title) => {
    const notes = loadNotes();

    const foundNote = notes.find((note) => {
        return note.title === title;
    });

    if (foundNote) {
        console.log(`'${foundNote.body}'`);
    }else {
        const failMessage = "Sorry but we couldn't find the note you were looking for";
        console.log(chalk.red(failMessage));
    }
};

module.exports = {
    getNote: getNote,
    addNote: addNote,
    rmNote: rmNote,
    listNotes: listNotes
};