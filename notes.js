const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    const notes = loadNotes();
    console.log(chalk.white.inverse("Your Notes:"));
    notes.forEach(note => {
        console.log(note.title);
    });
};

const readNote = (title) => {
    const notes = loadNotes();

    const note = notes.find(note => note.title === title);
    console.log(note ? chalk.bold(note.title) + ":\n" + note.body : chalk.red.inverse("note not found"));
}

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicate = notes.find(note => note.title === title);

    //debugger; //just use this anywhere (must run program w/ "inspect" command) & it will create a dev tools breakpoint!
        //node inspect app.js... then go to chrome://inspect (make sure you have 2 configurations: one localhost:9229 and one 127.0.0.1:9229)
        //click "inspect" under the 127.0.0.1:9229 one, and a chrome dev tools window will open! (once that happens you can create breakpoints too)
        //after you close it, you can immediately call "restart", which will start listening again (or ctrl+c twice to exit)

    if (duplicate) {
        console.log(chalk.red.inverse('"' + title + '" already exists, try again'));
    } else {
        notes.push({ title, body });
        saveNotes(notes);
        console.log(chalk.green('new note "' + title + '" added!'));
    }
    
};

const removeNote = (title) => {
    const notes = loadNotes();

    const updatedNotes = notes.filter(note => note.title !== title);

    if (notes.length > updatedNotes.length) {
        console.log(chalk.green('"' + title + '" removed!'));
        saveNotes(updatedNotes);
    } else {
        console.log(chalk.red.inverse('"' + title + '" does not exist'));
    }
};

const loadNotes = () => {
    try {
        const buffer = fs.readFileSync('notes.json');
        return JSON.parse(buffer.toString());
    } catch (e) {
        return []; //if notes.json doesn't exist, we'll just return an empty array
    }
};

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
};

module.exports = {
    getNotes: getNotes,
    readNote: readNote,
    addNote: addNote,
    removeNote: removeNote
};