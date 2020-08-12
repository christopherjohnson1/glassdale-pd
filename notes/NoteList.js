import { getNotes, useNotes } from "./NoteDataProvider.js";
import { NoteHTMLConverter } from "./NoteHTMLConverter.js";

const contentTarget = document.querySelector(".noteList")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("showNotesClicked", customEvent => {
  NoteList()
})


export const NoteList = () => {
  getNotes()
  .then(() => {
    const allNotes = useNotes()
    render(allNotes)
  })
}
eventHub.addEventListener("noteStateChanged", customEvent => {
  const allNotes = useNotes()
  render(allNotes)
})

const render = (noteArray) => {
  const allNotesConvertedToStrings = noteArray.map(
    (currentNote) => {
      return NoteHTMLConverter(currentNote)
    }
  ).join("")
  contentTarget.innerHTML = allNotesConvertedToStrings
}