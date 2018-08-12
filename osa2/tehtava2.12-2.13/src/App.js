import React from 'react';
import axios from 'axios'

const SearchInput = ({value,onChange}) =>{
  return(
    <div>
      Find countries:
      <input
        value={value}
        onChange={onChange}
      />  
    </div>
  )
}

const ShowResult = ({countriesToShow,handleClickingCountry}) =>{
  if ( countriesToShow.length > 10 ){
    return <tbody><tr><td>Too many matches, specify another filter</td></tr></tbody>
  }else if( countriesToShow.length > 1 && countriesToShow.length < 11){
    return (
      <tbody>
        {countriesToShow.map(country=><tr key={country.name}>
        <td onClick={handleClickingCountry(country.name)}>{country.name}</td></tr>)}
      </tbody>
    )
  }else if ( countriesToShow.length === 1){
    return (
      <tbody>
        <tr><td>{countriesToShow[0].name}</td></tr>
        <tr><td>Capital: {countriesToShow[0].capital}</td></tr>
        <tr><td>Population: {countriesToShow[0].population}</td></tr>
        <tr><td><img src={countriesToShow[0].flag} alt="Flag" height="240" width="360"/></td></tr>
      </tbody>
    )
  }else{
    return <tbody><tr><td>No matches</td></tr></tbody>
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      search: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }
  
  handleClickingCountry = (country) => {
    return () => {
      this.setState({ search: country })    
    }
  }

  handleSearchChange = (event) => {
    if (event.target.value === ''){
      this.setState({ search: event.target.value })  
    }else{
      this.setState({ search: event.target.value })  
    }
  }

  render() {
    const countriesToShow =
      this.state.countries.filter(country => country.name.toLocaleLowerCase().includes(this.state.search.toLowerCase()))

    return (
      <div>
      <SearchInput value={this.state.search} onChange={this.handleSearchChange}/>
        <table>
          <ShowResult countriesToShow={countriesToShow} handleClickingCountry={this.handleClickingCountry}/>
        </table>
      </div>
    )
  }
}

export default App