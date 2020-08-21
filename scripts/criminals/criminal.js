
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id.startsWith("associates--")) {
  
    const [prefix,criminalId] = clickEvent.target.id.split("--")
    const customEvent = new CustomEvent("alibiClicked", {
      detail: {
        criminalAlibiId: criminalId
      }
    })
    eventHub.dispatchEvent(customEvent)
  }
})


export const crimHTMLRep = (crimObj, facilities) => {
  return `
    <div class="criminal" >
    <button id="associates--${crimObj.id}">Associate Alibis</button>
    <h4>${crimObj.name}</h4>
        <div class="criminal__details">
        <p>
            Age: ${crimObj.age}<br>
            Crime: ${crimObj.conviction}<br>
            Term Start: ${new Date(crimObj.incarceration.start).toLocaleDateString('en-US')}<br>
            Term End: ${new Date(crimObj.incarceration.end).toLocaleDateString('en-US')}
        </p>
        <div>
            <h2>Facilities</h2>
            <ul>
                ${ facilities.map(f => `<li>${ f.facilityName }</li>`).join("") }
            </ul>
        </div>
        </div>
    </div>
  `
}