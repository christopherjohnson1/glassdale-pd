import { saveNote } from "./NoteDataProvider.js"
import { getCriminals, useCriminals } from "../scripts/criminals/criminalDataProvider.js"

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")

// Handle browser-generated click event in component
eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id === "saveNote") {

    const noteTitle = document.querySelector("#note--title")
    const noteAuthor = document.querySelector("#note--author")
    const noteContent = document.querySelector("#note--content")
    const noteCriminal = document.querySelector("#note--criminal")
    console.log("noteCriminal", noteCriminal)
    
    const criminalId = noteCriminal.value
    console.log("criminalId", criminalId)
    // Make a new object representation of a note

    if (criminalId !== 0) {
        const newNote = {
          title: noteTitle.value,
          author: noteAuthor.value,
          content: noteContent.value,
          criminalId: parseInt(noteCriminal.value),
          timestamp: Date.now()
        }
        // Change API state and application state
        saveNote(newNote)
        }
        else {
            window.alert("Please choose a criminal!")
        }
    }
})
        
        




const render = (criminals) => {
  contentTarget.innerHTML = `
    <div class="noteFormContainer">
      <h3>Enter a note below</h3>
      <input type="text" class="fields" id="note--title" placeholder="Title" />
      <input type="text" class="fields" id="note--author" placeholder="Author" />
      <select id="note--criminal">
        <option value="0">Select a criminal...</option>
        ${
            criminals.map(
                (criminalObject) => {
                    return `<option value="${ criminalObject.id }">
                        ${ criminalObject.name }
                    </option>`
                }
            )
        }
      </select>
      <textarea class="fields" id="note--content" placeholder="Note text here" /></textarea>
    
      <button class="fields" id="saveNote">Save Note</button>
    </div>
  `
}

export const NoteForm = () => {
  getCriminals()
    .then(() => {
        const criminals = useCriminals()
        render(criminals)
    })
}