import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const addPerson = (personObj) => {
  const request = axios.post(baseUrl, personObj)
  return request.then(response => response.data)
}

const getPersons = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(() => console.log("Person Deleted"))
}

const changeNumber = (personObj) => {
  const request = axios.put(`${baseUrl}/${personObj.id}`, personObj)
  return request.then(response => response.data)
}

export default {addPerson, getPersons, deletePerson, changeNumber}