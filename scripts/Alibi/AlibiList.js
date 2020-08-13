import { useCriminals } from "../criminals/criminalDataProvider.js";

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", event => {
  if (event.target.id === "closeButton") {
    const dialog = event.target.parentNode
    dialog.close()
  }
})

eventHub.addEventListener("alibiClicked", event => {
  const selectedCriminal = event.detail.criminalAlibiId
  const contentTarget = document.querySelector(".alibiDialog")

  const targetedCriminal = useCriminals().find(
    (criminal) => criminal.id === parseInt(selectedCriminal))

  contentTarget.innerHTML = `${
    targetedCriminal.known_associates.map(associate => {
      return `
        <div class="alibiContainer">
          <div><strong>Name:</strong> ${associate.name}</div>
          <div><strong>Alibi:</strong> ${associate.alibi}</div>
        </div>
        `
    }).join("")
  }`
  contentTarget.innerHTML += `
    <button id="closeButton">Close</button>
    `
  contentTarget.showModal()
})

export const renderAlibiBox = () => {
  return `
    <dialog class="alibiDialog"></dialog>
  `
}
