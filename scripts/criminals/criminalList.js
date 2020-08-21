import { getCriminals, useCriminals } from './criminalDataProvider.js'
import { crimHTMLRep } from "./criminal.js"
import { useConvictions } from '../convictions/ConvictionProvider.js'
import { renderAlibiBox } from "../Alibi/AlibiList.js"
import { getCriminalFacilities, useCriminalFacilities } from '../facility/CriminalFacilityProvider.js'
import { useFacilities, getFacilities } from '../facility/FacilityProvider.js'

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


const render = (criminalsToRender, allFacilities, allRelationships) => {
    // Iterate all criminals
    contentTarget.innerHTML = criminalsToRender.map(
        (criminalObject) => {
            // Filter all relationships to get only ones for this criminal
            const facilityRelationshipsForThisCriminal = allRelationships.filter(cf => cf.criminalId === criminalObject.id)

            // Convert the relationships to facilities with .map()
            const facilities = facilityRelationshipsForThisCriminal.map(cf => {
                const matchingFacilityObject = allFacilities.find(facility => facility.id === cf.facilityId)
                return matchingFacilityObject
            })

            // Must pass the matching facilities to the Criminal component
            return crimHTMLRep(criminalObject, facilities)
        }
    ).join("")
}


export const CriminalList = () => {
    getCriminals()
        .then(getCriminalFacilities)
        .then(getFacilities)
        .then(() => {
            const facilities = useFacilities()
            const crimFac = useCriminalFacilities()
            const criminals = useCriminals()
            render(criminals, facilities, crimFac)
    
      

      
  })
}