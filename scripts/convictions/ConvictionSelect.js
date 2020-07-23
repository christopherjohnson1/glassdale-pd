import { useConvictions, getConvictions } from "./ConvictionProvider.js"

// Get a reference to the DOM element where the <select> will be rendered
const contentTarget = document.querySelector(".filters__crime")

const render = convictionsCollection => {
  contentTarget.innerHTML = `
      <select class="dropdown" id="crimeSelect">
          <option value="0">Please select a crime...</option>
          ${
            convictionsCollection.map(
              convictionObject => {
                return `<option>${convictionObject.name}</option>`
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