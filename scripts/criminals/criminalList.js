import { getCriminals, useCriminals } from './criminalDataProvider.js'
import { crimHTMLRep } from "./criminal.js";
import { useConvictions } from '../convictions/ConvictionProvider.js';
import { renderAlibiBox } from "../Alibi/AlibiList.js";

const contentTarget = document.querySelector(".criminalsContainer")
const eventHub = document.querySelector(".container")

// Click event to filter list of criminals down to only ones who've commited the selected crime
eventHub.addEventListener("crimeSelected", (crimeSelectedEvent) => {

  const crimeThatWasSelected = crimeSelectedEvent.detail.crimeId

  const arrayOfCrimes = useConvictions()
  const foundCrimeObject = arrayOfCrimes.find(
    (crime) => {
      return parseInt(crimeThatWasSelected) === crime.id
    }
  )

  const allCriminals = useCriminals()

  const filteredCriminals = allCriminals.filter(
    (currentCriminalObj) => {
      return foundCrimeObject.name === currentCriminalObj.conviction
    }
  )

  render(filteredCriminals)

})

// Click event to filter the list of criminals down based on the arresting officer
eventHub.addEventListener("officerSelected", (event) => {
  
  const selectedOfficer = event.detail.officer 
  
  const allCriminals = useCriminals()
  const arrestingOfficerFilter = allCriminals.filter(
    (currentCriminalObject) => {
      if (currentCriminalObject.arrestingOfficer === selectedOfficer) {
        return true
      }
    }
  )
    
    render(arrestingOfficerFilter)
})


const render = (criminalArr) => {
  
  let crimHTMLString = ""

  criminalArr.forEach(criminal => {
    crimHTMLString += crimHTMLRep(criminal)
  })

  contentTarget.innerHTML = `
  <h2>Criminals</h2>
  <div class="criminalList" >
  ${crimHTMLString}
  </div>
  ${renderAlibiBox()}
  `

}


export const CriminalList = () => {
    getCriminals()
      .then(() => {
        const criminals = useCriminals()
        render(criminals)
    
      

      
  })
}