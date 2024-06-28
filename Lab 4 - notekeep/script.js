const addNoteBtn = document.querySelector(".add-btn");
const noteContentInput = document.querySelector(".note-content-input");
const noteTitleInput = document.querySelector(".note-title-input");
const noteList = document.querySelector(".note-list");
const clearAllBtn = document.querySelector(".clearAll-btn");
const notePinInput = document.querySelector(".note-pin-input");

const currentDate = new Date();

const changeNoteBackgroundColor = (note, color) => {
  note.style.backgroundColor = color;
};

const addNote = () => {
  const newNote = document.createElement("div");
  newNote.classList.add("note-item");

  newNote.innerHTML = `
  
    <div class="test">
      <h1 class="note-title">${noteTitleInput.value}</h1>
      <a class="note-content">${noteContentInput.value}</a>
      
      <div class="note-footer">
      <div class="note-buttons">
      <button class="blue"></button>
      <button class="red"></button>
      <button class="green"></button>
      </div>
      <div class="time">${currentDate.toLocaleDateString()}</div>
      </div>
    </div>
  
  `;

  if (noteContentInput.value === "" || noteTitleInput.value === "") {
    alert("Uzupełnij wszystkie pola");
  } else {
    if (notePinInput.checked) {
      noteList.insertBefore(newNote, noteList.firstChild); //Dodaje jako pierwszy element listy
    } else {
      noteList.appendChild(newNote); //Dodaje na koniec listy
    }
  }

  const blueButton = newNote.querySelector(".blue");
  const redButton = newNote.querySelector(".red");
  const greenButton = newNote.querySelector(".green");

  blueButton.addEventListener("click", () =>
    changeNoteBackgroundColor(newNote, "lightblue")
  );
  redButton.addEventListener("click", () =>
    changeNoteBackgroundColor(newNote, "#ff7070")
  );
  greenButton.addEventListener("click", () =>
    changeNoteBackgroundColor(newNote, "lightgreen")
  );
};

const deleteNotes = () => {
  const notes = document.querySelectorAll(".note-item");
  notes.forEach((note) => {
    note.style.display = "none";
  });
};

addNoteBtn.addEventListener("click", addNote);
clearAllBtn.addEventListener("click", deleteNotes);
