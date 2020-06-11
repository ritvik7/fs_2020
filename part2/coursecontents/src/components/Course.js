import React from 'react'

const Header = ({name}) => <h1>{name}</h1>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) =>
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </div>

const Total = ({parts}) => 
  <b>
    total of {parts.reduce((sum, part) => sum+= part.exercises, 0)} exercises
  </b>

const Course = ({course}) =>
  <div>
    <Header key={course.id} name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>

export default Course