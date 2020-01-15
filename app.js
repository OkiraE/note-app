const validator = require('validator');
const chalk     = require('chalk');
const yargs     = require('yargs');
const notes     = require('./note.js');

// HI AM OMAR


// Functionality: add, remove, read, list

// node app.js add --title="Your Title"
// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'The body of the Note',
            demandOption: false,
            type: 'string'
        }
    },
    handler (argv) {
        return notes.addNote(argv.title, argv.body);
    }
});

/// Create a remove command
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
      title: {
          describe: 'Note\'s title',
          demandOption: true,
          type: 'string'
      }
    },
    handler (argv) {
        return notes.rmNote(argv.title);
    }
});

// Create a list command that gives back existing notes
yargs.command({
    command: 'list',
    describe: 'list existing notes',
    handler() {
        console.log("Fetching Notes...");
        notes.listNotes();
    }
});

// Create a read command to read an existing note via title
yargs.command({
    command: 'read',
    describe: 'read a note',
    builder: {
        title: {
            describe: 'Note\'s title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.getNote(argv.title);
    }
});

// console.log(yargs.argv) === yargs.parse()

yargs.parse();