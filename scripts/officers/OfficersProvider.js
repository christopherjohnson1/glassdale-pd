let officers = []

export const useArrestingOfficers = () => officers.slice()

export const getArrestingOfficer = () => {
    return fetch("https://criminals.glassdale.us/officers")
        .then(response => response.json())
        .then(officerArray => {
            officers = officerArray
        })
}