//Node module to write to the file system.
const fs = require("fs");

var fetchNotes = () => {
	//Get all notes from the file system.
	try {
		var noteString = fs.readFileSync("notes-data.json");
		return JSON.parse(noteString);
	} catch (e) {
		return [];
	}
};

var saveNotes = (notes) => {
	//Save a note direct to the file system
	fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};

var addNote = (title, body) => {
	//Save the note and pass it to the saveNotes function above.
	var notes = fetchNotes();
	var note = {
		title,
		body
	};
	var duplicateNotes = notes.filter((note) => note.title === title);

	if (duplicateNotes.length === 0) {
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};

var getAll = () => {
	//Display all notes.
	return fetchNotes();
};

var getNote = (title) => {
	//Retrieve a specific note.
	var notes = fetchNotes();
	var filteredNotes = notes.filter((note) => note.title === title);
	return filteredNotes[0];
};

var logNote = (note) => {
	//Display note content.
	console.log("---");
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
};

var removeNote = (title) => {
	//Remove a specific note.
	var notes = fetchNotes();
	var filteredNotes = notes.filter((note) => note.title !== title);
	saveNotes(filteredNotes);

	return notes.length != filteredNotes.length;
};

module.exports = {
	//Make commands available as command line arguments.
	addNote,
	getAll,
	getNote,
	logNote,
	removeNote
};