import React from 'react'

const storeSession = (key, value) => {
  return (
        sessionStorage.setItem(key, value)
  )
}

const getSession = (key) => {
    return (
        sessionStorage.getItem(key)
    )
}

const removeSession = (key) => {
    return (
        sessionStorage.removeItem(key)
    )
}

// const clearSession = () => {
//     return (
        // sessionStorage.clear()
//     )
// }

export { storeSession, getSession, removeSession }