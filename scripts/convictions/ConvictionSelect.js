/*
 *   ConvictionSelect component that renders a select HTML element
 *   which lists all convictions in the Glassdale PD API
 */
import { useConvictions, getConvictions } from "./ConvictionProvider.js"


// Get a reference to the DOM element where the <select> will be rendered
const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".filters__crime")

eventHub.addEventListener("change", event => {
  if (event.target.id === "crimeSelect") {
  // Only do this if the `crimeSelect` element was changed
  
  const customEvent = new CustomEvent("crimeSelected", {
    detail: {
      crimeId: event.target.value
    }
  })
  eventHub.dispatchEvent(customEvent)
  }
})


    const render = convictionsCollection => {
        /*
            Use interpolation here to invoke the map() method on
            the convictionsCollection to generate the option elements.
            Look back at the example provided above.
        */
        contentTarget.innerHTML = `
            <h2>Filter criminals by crime committed</h2>
            <select class="dropdown" id="crimeSelect">
                <option value="0">Please select a crime...</option>
                ${
                    convictionsCollection.map(
                      convictionObject => {
                        return `<option value="${  convictionObject.id  }">${convictionObject.name}</option>`
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