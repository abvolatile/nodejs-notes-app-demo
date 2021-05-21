//const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

// console.log(validator.isEmail('annie@example.com'));
// console.log(validator.isURL('https/example.com'));

//console.log(chalk.bgBlue.bold('WHAT!?'));

//console.log(process.argv);
yargs.version('1.1.0');

//add command:
yargs.command({
    command: 'add', 
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        //console.log(chalk.green('Added a new note!\nTitle: ' + argv.title + "\nBody: ", argv.body));
        notes.addNote(argv.title, argv.body);
    }
});

//remove command:
yargs.command({
    command: 'remove', 
    describe: 'Remove an existing note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        //console.log(chalk.yellow('Removed the note!'));
        notes.removeNote(argv.title);
    }
});

//list command:
yargs.command({
    command: 'list', 
    describe: 'Lists all notes',
    handler: () => {
        notes.getNotes();
    }
});

//read command:
yargs.command({
    command: 'read', 
    describe: 'Reads out a particular note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.readNote(argv.title);
    }
});

//console.log(yargs.argv); //if this isn't here, we won't get any output from the above! annoying to have to have a console log, here's another way:
yargs.parse();