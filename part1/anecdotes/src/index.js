import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handler, text}) => <button onClick={handler()}>{text}</button>
  
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0))
 
  const handleSelected = () => () => {
    const x = Math.floor(Math.random()*props.anecdotes.length)
    setSelected(x)
    console.log(votes)
  }

  const handleVotes = () => () => {
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)
  }

  let maxVotes = votes.reduce((max, x, i, v) => v[max] > x ? max : i, 0)
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button handler={handleVotes} text='vote' />
      <Button handler={handleSelected} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <div>{props.anecdotes[maxVotes]}</div>
      <div>has {votes[maxVotes]} votes</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />, 
  document.getElementById('root') 
)