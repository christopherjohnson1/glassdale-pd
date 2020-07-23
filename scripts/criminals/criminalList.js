import { useCriminals, getCriminals } from './criminalsDataProvider.js'
import { criminalHTML } from './criminalHTML.js'

const contentTarget = document.querySelector(".criminalsContainer")

export const criminalList = () => {

  getCriminals()
      .then(() => {
        const criminalArray = useCriminals()
        let criminalHTMLRep = ''
        criminalArray.forEach(criminal => {
          criminalHTMLRep += criminalHTML(criminal)
        })

        contentTarget.innerHTML = `
          <div class="container">
            ${criminalHTMLRep}
          </div>
        `
      })
}