import React from 'react';

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
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNro: '',
      search: '',
      showAll: true
    }
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
    const onkoHenkiloTietokannassa = this.state.persons.findIndex(
      person => person.name.toLowerCase() === this.state.newName.toLowerCase())
    const onkoNumeroTietokannassa = this.state.persons.findIndex(
      person => person.numero === this.state.newNro)
      
    if (onkoHenkiloTietokannassa === -1 && onkoNumeroTietokannassa === -1){
      const personObject = {
        name: this.state.newName,
        number: this.state.newNro
      }
    
      const persons = this.state.persons
        .concat(personObject)
        .sort((person1,person2)=>person1.name>person2.name)
    
      this.setState({
        persons: persons,
        newName: '',
        newNro: ''
      })
    }
  }
  render() {
    const personsToShow =
    this.state.showAll ?
      this.state.persons :
      this.state.persons.filter(person => person.name.toLocaleLowerCase().includes(this.state.search.toLowerCase()))

    const henkilot = () => {
      return(personsToShow.map(person=><tr key={person.name}><td>{person.name}</td><td>{person.number}</td></tr>)
    )}
    return (
      <div>
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