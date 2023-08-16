import { json } from "react-router-dom"

export const base_url = JSON.stringify(import.meta.env_VITE_REACT_APP_URL)

console.log(base_url)