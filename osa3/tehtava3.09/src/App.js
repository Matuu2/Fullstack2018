import React from 'react';
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const SearchInput = ({value,onChange}) =>{
  return(
    <div>
      Rajaa näytettäviä:
      <input
        value={value}
        onChange={onChange}
      />  
    </div>
  )
}

const AddNewPerson = ({onSubmit,name,onNameChange,number,onNumberChange}) => {
  return(
    <form onSubmit={onSubmit}>
      <div>
        Nimi:
        <input
          value={name}
          onChange={onNameChange}
        />
        <br/>
        Numero:
        <input
          value={number}
          onChange={onNumberChange}
        />
        <br/>
        <button type="submit">Lisää</button>
      </div>
    </form>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNro: '',
      search: '',
      showAll: true,
      error: null
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState(
          {persons: response.sort((person1,person2)=>person1.name>person2.name)}
        )
      })
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNroChange = (event) => {
    this.setState({ newNro: event.target.value })
  }

  handleSearchChange = (event) => {
    if (event.target.value === ''){
      this.setState({ search: event.target.value,
                      showAll: true })  
    }else{
      this.setState({ search: event.target.value,
                      showAll: false })  
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const isPersonInDB = this.state.persons.findIndex(
      person => person.name.toLowerCase() === this.state.newName.toLowerCase())
    const isNumberInDB = this.state.persons.findIndex(
      person => person.numero === this.state.newNro)
      
    if (isPersonInDB === -1 && isNumberInDB === -1){
      const personObject = {
        name: this.state.newName,
        number: this.state.newNro
      }
      personService
        .create(personObject)
        .then(response => {
          personObject.id = response.id
          this.setState({
            persons : this.state.persons
              .concat(personObject)
              .sort((person1,person2)=>person1.name>person2.name),
            newName: '',
            newNro: '',
            error: 'Lisätty '+personObject.name
          })
        })
      setTimeout(() => {
        this.setState({error: null})
      }, 5000)

    }else if(isPersonInDB !== -1){
      const person = this.state.persons[isPersonInDB]
      person.number = this.state.newNro
      if (window.confirm(person.name+' on jo luettelossa, korvataanko vanha numero uudella?')){
        const id = person.id
        personService
          .update(id,person)
          .then(response => {
            const updatedPersons = this.state.persons
              .filter(p => p.id !== id)
              .concat(person)
              .sort((person1,person2)=>person1.name>person2.name)
            this.setState({
              persons: updatedPersons,
              newName: '',
              newNro: '',
              error: 'Muokattu henkilön '+person.name+' numero'
            })
          })
        setTimeout(() => {
          this.setState({error: null})
        }, 5000)      
      } 
    }
  }
  deletePerson = (id) => {
    const person = this.state.persons.find(p => p.id === id)
    if (window.confirm('Poistetaanko '+person.name+ '?')){
      personService
        .remove(id)
        .then(response => {
          const updatedPersons = this.state.persons
            .filter(person => person.id !== id)
          this.setState({
            persons : updatedPersons,
            error: 'Poistettu henkilö '+person.name
          })  
        })
      setTimeout(() => {
        this.setState({error: null})
      }, 5000)   
    }
  }

  render() {
    const personsToShow =
    this.state.showAll ?
      this.state.persons :
      this.state.persons.filter(person => person.name.toLocaleLowerCase().includes(this.state.search.toLowerCase()))

    const henkilot = () => {
      return(personsToShow
        .map(person=><tr key={person.name}><td>{person.name}</td><td>{person.number}</td><td><button onClick={()=>this.deletePerson(person._id)}>Poista</button></td></tr>)
    )}
    return (
      <div>
        <Notification message={this.state.error}/>
        <h2>Puhelinluettelo</h2>
        <SearchInput value={this.state.search} onChange={this.handleSearchChange}/>
        <h2>Lisää uusi</h2>
        <AddNewPerson onSubmit={this.addPerson} name={this.state.newName} onNameChange={this.handleNameChange}
          number={this.state.newNro} onNumberChange={this.handleNroChange}/> 
        <h2>Numerot</h2>
        <table>
          <tbody>{henkilot()}</tbody>
        </table>
      </div>
    )
  }
}

export default App