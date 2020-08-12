import { saveNote } from "./NoteDataProvider.js"

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")

// Handle browser-generated click event in component
eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id === "saveNote") {

    const noteTitle = document.querySelector("#note--title")
    const noteAuthor = document.querySelector("#note--author")
    const noteContent = document.querySelector("#note--content")
    
    // Make a new object representation of a note

    const newNote = {
      title: noteTitle.value,
      author: noteAuthor.value,
      content: noteContent.value,
      timestamp: Date.now()
    }

    // Change API state and application state

    saveNote(newNote)

  }
})

const render = () => {
  contentTarget.innerHTML = `
    <div class="noteFormContainer">
      <h3>Enter a note below</h3>
      <input type="text" class="fields" id="note--title" placeholder="Enter note title" />
      <input type="text" class="fields" id="note--author" placeholder="Your name here" />
      <textarea class="fields" id="note--content" placeholder="Note text here" /></textarea>

      <button class="fields" id="saveNote">Save Note</button>
    </div>
  `
}

export const NoteForm = () => {
  render()
}