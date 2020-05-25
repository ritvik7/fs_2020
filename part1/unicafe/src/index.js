import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handler, text}) => <button onClick={handler(text)}>{text}</button>

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, all}) => {
  const average = (good-bad)/(good+neutral+bad)
  const positive = good*100/(good+neutral+bad) + " %"
  
  if (all>0) {
    return (
      <table>
        <tbody>
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <Statistic text='all' value={all} />
          <Statistic text='average' value={average} />
          <Statistic text='positive' value={positive} />
        </tbody>
      </table>
    )
  } else {
    return (
      <div>No feedback given</div>
      )
    }
  }
  
const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  
  const handleFeedback = (rating) => () => {
    setAll(good + neutral + bad + 1)
    if(rating === 'good'){
      return setGood(good + 1)
    } else if(rating === 'neutral'){
      return setNeutral(neutral + 1)
    } else if(rating === 'bad'){
      return setBad(bad + 1)
    }
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={handleFeedback} text='good' />
      <Button handler={handleFeedback} text='neutral' />
      <Button handler={handleFeedback} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))