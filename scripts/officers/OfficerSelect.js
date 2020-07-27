import { useArrestingOfficers, getArrestingOfficer } from "./OfficersProvider.js"

// Where the content will be rendered
const contentTarget = document.querySelector(".filters__officer")

// the parent of the elements where the events will live
const eventHub = document.querySelector(".container")

contentTarget.addEventListener("change", (changeEvent) => {
    const customOfficer = new CustomEvent("officerSelected", {
        detail: {
            officerId: changeEvent.target.value
        }
    })
    eventHub.dispatchEvent(customOfficer)
})

const render = officersCollection => {
    contentTarget.innerHTML = `
    <select class="dropdown" id="officerSelect">
        <option value="0">Please select an arresting officer</option>
        ${
            officersCollection.map(
                officerObj => {
                    return `<option value="${officerObj.id}">${officerObj.name}</option>`
                }
            ).join("")
        }
        </select>
    `
}

export const OfficerSelect = () => {
    getArrestingOfficer().then(() => {
        const officers = useArrestingOfficers()

        render(officers)
    })
}