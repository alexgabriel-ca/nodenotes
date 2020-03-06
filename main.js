//Node modules
const fs = require("fs");
const _ = require("lodash");
//Yargs constants
const yargs = require("yargs");
const titleOptions = {
	describe: 'Title of note',
	demand: true,
	alias: 't'
};
const bodyOptions = {
	describe: 'Body of note',
	demand: true,
	alias: 'b'
};

const argv = yargs
	   .command("add", "Add a new note.", {
		   title: titleOptions,
		   body: bodyOptions
	   })
	   .command("list", "Display all notes.")
	   .command("read", "Read the specified note.", {
		   title: titleOptions
	   })
	   .command("remove", "Remove the specified note.", {
		   title: titleOptions
	   })
	   .help()
	   .argv;

//Custom module
const notes = require("./notes.js");

//Parse for first argument, and feed it to the switch statement.
var command = argv._[0];

switch (command) {
	case "add":
		//Add a new note
		var note = notes.addNote(argv.title, argv.body);
		var message = note ? "Note saved." : "Duplicate detected, note not saved.";
		console.log(message);
		break;
	case "list":
		//Display all the notes that have been stored.
		var allNotes = notes.getAll();
		console.log(`Printing ${allNotes.length} note(s).`)
		allNotes.forEach((note) => {
			notes.logNote(note);
		});
		break;
	case "read":
		//Find the note and display it.
		var note = notes.getNote(argv.title);
		if (note) {
			notes.logNote(note);
		} else {
			console.log("Note not found");
		}
		break;
	case "remove":
		//Remove the specified note.
		notes.removeNote(argv.title);
		var noteRemoved = notes.removeNote(argv.title);
		var message = "";
		if (noteRemoved) {
			message = "Note removed";
		} else {
			message = "Note not found";
		}
		console.log(message);
		break;
	default:
		console.log("Required options are 'add', 'list', 'read', or 'remove'.");
}