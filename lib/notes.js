const fs = require("fs");
const path = require("path");


function createNote(body, notesArray) {
  const note = body;

  notesArray.push(note);
  
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(
      {
        notes: notesArray,
      },
      null,
      2
    )
  );
  return note;
}

const findById = (id, notesArray) => {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
};

const editNote = (editedNote, notesArray) => {

  const index = notesArray.findIndex(note => note.id === editedNote.id);

  notesArray.splice(index, 1);
  notesArray.splice(index, 0, editedNote);

  fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
  )
};

function deleteNote(notesArray, id) {

  let deletedId = parseInt(id);
  notesArray.splice(deletedId, 1);


  for (let i = deletedId; i < notesArray.length; i++) {
    notesArray[i].id = i.toString();
  }

  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(
      {
        notes: notesArray,
      },
      null,
      2
    )
  );
}

module.exports = { createNote, findById, editNote, deleteNote };