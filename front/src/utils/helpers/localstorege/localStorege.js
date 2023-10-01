export const saveToLocalStorage = (key, value) => {
   return localStorage.setItem(key, JSON.stringify(value))
}

export const getFromLocalStorage = (key) => {
   const json = localStorage.getItem(key)
   return JSON.parse(json)
}

export const deleteFromLocalStorage = (key) => {
   return localStorage.removeItem(key)
}
