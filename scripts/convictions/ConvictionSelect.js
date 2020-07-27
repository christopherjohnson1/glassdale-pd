import { useConvictions, getConvictions } from "./ConvictionProvider.js"

// Get a reference to the DOM element where the <select> will be rendered
const contentTarget = document.querySelector(".filters__crime")
const eventHub = document.querySelector(".container")

// Capture that the user generated a change in the browser
contentTarget.addEventListener("change", (changeEvent) => {
    // Construct based on agreement with other Dev's
    const customEvent = new CustomEvent("crimeSelected", {
        detail: {
            crimeId: changeEvent.target.value
        }
    })
    eventHub.dispatchEvent(customEvent)
})

const render = convictionsCollection => {
  contentTarget.innerHTML = `
      <select class="dropdown" id="crimeSelect">
          <option value="0">Please select a crime...</option>
          ${
            convictionsCollection.map(
              convictionObject => {
                return `<option value="${convictionObject.id}">${convictionObject.name}</option>`
              }
            ).join("")
          }
          </select>
  `
}

export const ConvictionSelect = () => {
    getConvictions().then(() => {
      const convictions = useConvictions()

      render(convictions)
    })
}