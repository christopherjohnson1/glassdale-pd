export const criminalHTML = (criminalObj) => {
  return `
    <article class="indv-criminal">
      <h3>${criminalObj.name}</h3>

      <p>Age: ${criminalObj.age}<br>
        Crime: ${criminalObj.conviction}<br>
        Term Start: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}<br>
        Term End: ${new Date(criminalObj.incarceration.end).toLocaleDateString('en-US')}</p>
    </article>
  `
}