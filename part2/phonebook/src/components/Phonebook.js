import React from 'react'

const Person = ({person}) => 
  <li>
    {person.name} {person.number}
  </li>

const Persons = ({persons}) =>
  <div>                                   
    {persons.map(person => <Person key={person.name} person={person}/>)}
  </div>

const Filter = ({newFilter, handleFilter}) => 
  <div>
    filter shown with<input value={newFilter} onChange={handleFilter}/>
  </div>

const Field = (props) => 
  <div>
      {props.name} :<input value={props.value} onChange={props.handleValue}/>
  </div>

export {Persons, Field, Filter}