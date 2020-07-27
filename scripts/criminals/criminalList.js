import { useCriminals, getCriminals } from './criminalsDataProvider.js'
import { criminalHTML } from './criminalHTML.js'
import { useConvictions } from "../convictions/ConvictionProvider.js"

const contentTarget = document.querySelector(".criminalsContainer")
const eventHub = document.querySelector(".container")

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

const render = (arrayOfCriminals) => {
  let criminalHTMLRep = ""

  arrayOfCriminals.forEach(criminal => {
    criminalHTMLRep += criminalHTML(criminal)
  })

  contentTarget.innerHTML = `
  <h2>Glassdale Convicted Criminals</h2>
  <article class="criminalList">
      ${ criminalHTMLRep } 
  `
}

export const criminalList = () => {

  getCriminals()
      .then(() => {
        const criminalArray = useCriminals()
        render(criminalArray)
      })
    }