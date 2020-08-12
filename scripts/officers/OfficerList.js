import { getOfficers, useOfficers } from "./OfficerProvider.js";
import { officerHTMLRep } from "./Officers.js";

const contentTarget = document.querySelector(".officersContainer")

export const OfficerList = () => {
  getOfficers().then(() => {
    const officerArr = useOfficers()
    let officerHTMLRepresentations = ""

    for (const officer of officerArr) {
      officerHTMLRepresentations += officerHTMLRep(officer)
    }

    contentTarget.innerHTML = `
    <h2>Officers</h2>
    <div class="officersList"> 
    ${officerHTMLRepresentations}
    </div>
    `

  })

}