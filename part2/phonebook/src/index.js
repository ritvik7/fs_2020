import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {Persons} from './components/Persons'
import {Filter} from './components/Filter'
import {PersonForm} from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ filterPersons, setFilterPersons ] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilterPersons(response.data)
      })
  }, [])
  
  const handleName = (event) => setNewName(event.target.value)
  const handleNumber = (event) => setNewNumber(event.target.value)

  const handlePerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName) !== undefined) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      let obj = {name: newName, number: newNumber}
      setPersons(persons.concat(obj))
      let re = new RegExp(newFilter, 'i')
      if(newName.match(re)) setFilterPersons(filterPersons.concat(obj))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
    let re = new RegExp(event.target.value, 'i')
    setFilterPersons(persons.filter(person => person.name.match(re)))
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm name={newName} number={newNumber} handlers={{handlePerson, handleName, handleNumber}}/>
      <h2>Numbers</h2>
      <Persons persons={filterPersons} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))