import { getNotes, useNotes } from "./NoteDataProvider.js"
import { NoteHTMLConverter } from "./NoteHTMLConverter.js"
import { useCriminals } from "../scripts/criminals/criminalDataProvider.js"

const contentTarget = document.querySelector(".noteList")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("showNotesClicked", customEvent => {
  NoteList()
})


export const NoteList = () => {
  getNotes()
    .then(useNotes)
    .then(render)
}
eventHub.addEventListener("noteStateChanged", customEvent => {
  const allNotes = useNotes()
  render(allNotes)
})

const render = (noteArray) => {
    const criminals = useCriminals()
    contentTarget.innerHTML = noteArray.reverse().map(
    (currentNote) => {
        // Find the criminal that the note is about
        const foundCriminal = criminals.find(
            (criminalObject) => {
                return criminalObject.id === currentNote.criminalId
            }
            )
      return NoteHTMLConverter(currentNote, foundCriminal)
    }
  ).join("")
}