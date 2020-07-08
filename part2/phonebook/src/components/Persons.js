import React from 'react'

const Person = ({person}) => 
  <li>
    {person.name} {person.number}
  </li>

const Persons = ({persons}) =>
  <div>                                   
    {persons.map(person => <Person key={person.name} person={person}/>)}
  </div>

export {Persons}