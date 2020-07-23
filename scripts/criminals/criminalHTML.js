export const criminalHTML = (criminalObj) => {
  return `
    <article>
      <h3>${criminalObj.name}</h3>

      <p>Age: ${criminalObj.age}</p>
      <p>Crime: ${criminalObj.conviction}</p>
      <p>Term Start: ${criminalObj["incarceration"].start}</p>
      <p>Term End: ${criminalObj["incarceration"].end}</p>
    </article>
  `
}