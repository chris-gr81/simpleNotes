const LOCAL_STORAGE_KEY = "noteList";

function saveNote(title, text, id) {
  const notes = getNotes();
  if (id === 0) {
    notes.push({
      id: getNextId(),
      title,
      text,
      lastUpdated: Date.now(),
    });
  } else {
    const selectedNote = notes.find((note) => {
      return note.id == id;
    });
    selectedNote.id = Number(id);
    selectedNote.title = title;
    selectedNote.text = text;
    selectedNote.lastUpdated = Date.now();
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}

function getNotes() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

function getNextId() {
  const notes = getNotes();
  const sortedNotes = notes.sort((a, b) => Number(a.id) - Number(b.id));

  let nextId = 1;

  for (let note of sortedNotes) {
    if (nextId < note.id) break;

    nextId = note.id + 1;
  }

  return nextId;
}

function deleteNote(id) {
  if (id) {
    notes = getNotes();
    notes = notes.filter((note) => {
      return Number(note.id) !== Number(id);
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  }
}
