import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {Notification} from './components/Notification'
import {Persons} from './components/Persons'
import {Filter} from './components/Filter'
import {PersonForm} from './components/PersonForm'
import personService from './services/contacts'
import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notification, setNotification ] = useState('')

  const handleName = (event) => setNewName(event.target.value)
  const handleNumber = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setNewFilter(event.target.value)

  let re = new RegExp(newFilter, 'i')
  const filterPersons = persons.filter(person => person.name.match(re)) 

  const handlePerson = (event) => {
    event.preventDefault()
    const foundPerson = persons.find(person => person.name === newName.trim())
    if(!newName || !newNumber) {
      setNotification({message: 'Please enter a name and number', status: 'fail'})
    } else if (foundPerson) {
      const result = window.confirm(`${newName} is already added to the phonebook, replace old number with new one?`)
      if (result){
        personService
          .changeNumber({...foundPerson, number: newNumber})
          .then(changedPerson => {
            setPersons(persons.filter(person => person.id !== foundPerson.id).concat(changedPerson))
            setNotification({message: 'Person Updated', status: 'success'})
          })
          .catch(error => {
            setNotification({message: 'Failed to modify person that was already deleted from the server', status: 'fail'})
            setPersons(persons.filter(person => person!==foundPerson))
            console.log(error)
          })
      }
    } else {
      const personObj = {name: newName.trim(), number: newNumber.trim()}
      personService
        .addPerson(personObj)
        .then((addedPerson) => {
          setPersons(persons.concat(addedPerson))
          setNotification({message: 'Person Added', status: 'success'})
          console.log(notification.message)
        })
        .catch(error => {
          setNotification({message: 'Person already exists on the server', status: 'fail'})
        })
    }
    setTimeout(() => setNotification(''), 2500)
    setNewName('')
    setNewNumber('')
    setNewFilter('')
  }

  const handleDelete = (id) => () => {
    const result = window.confirm("Are you sure you want to delete this contact?")
    if(result)
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification({message: 'Person deleted', status: 'fail'})
          setTimeout(() => setNotification(''), 2500)
        })
        .catch(error => {
          setNotification({message: 'Person was already deleted from the server', status: 'fail'})
          setPersons(persons.filter(person => person.id!==id))
        })
  }
  
  useEffect(() => {
    personService
      .getPersons()
      .then(initialPersons => setPersons(initialPersons))
      .catch(error => console.log("Failed to fetch JSON"))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      { notification && <Notification notification={notification} />}
      <PersonForm name={newName} number={newNumber} handlers={{handlePerson, handleName, handleNumber}}/>
      <h2>Numbers</h2>
      <Persons persons={filterPersons} handleDelete={handleDelete} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))