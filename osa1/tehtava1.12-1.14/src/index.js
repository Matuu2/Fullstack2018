import React from 'react'
import ReactDOM from 'react-dom'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 0,
      points: [0,0,0,0,0,0]
    }
  }
  drawNumber = () => {
    return() =>{
      this.setState({
        selected:Math.floor(Math.random() * 6)
      }) 
    }
  }
  vote = () => {
    return() =>{
      const kopio = [...this.state.points]
      kopio[this.state.selected] += 1 
      this.setState({
        points: kopio
      }) 
    }  
  }

  render () {
    const indexOfMostVoted = this.state.points.indexOf(Math.max(...this.state.points))
    return (
      <div>
        <p>{this.props.anecdotes[this.state.selected]} <br/>
         has {this.state.points[this.state.selected]} votes </p>
        <Button handleClick={this.vote()} text="Vote"/>
        <Button handleClick={this.drawNumber()} text="Next anekdote"/>
        <p> <b> Anecdote with most votes </b> </p>
        <p> {this.props.anecdotes[indexOfMostVoted]} <br/>
        has {this.state.points[indexOfMostVoted]} votes </p>
      </div>
    )
  }
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