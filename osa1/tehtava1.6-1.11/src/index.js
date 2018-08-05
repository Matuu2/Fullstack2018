import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const Statistic = ({teksti,maara}) =>{
    return(
      <tr>
        <td> {teksti}</td>
        <td> {maara}</td>
      </tr> 
    )
}

const Statistics = ({maarat}) =>{
    if(maarat[5] === 0){
      return(
        <div>
          <p>Statistiikka</p>
          <p>Ei yhtään annettua palautetta</p>  
        </div>
      )
    }else{
      return(
          <div>
              <p>Statistiikka</p>
              <table>
                <tbody>
                  <Statistic teksti="Hyvä" maara={maarat[0]}/>
                  <Statistic teksti="Neutraali" maara={maarat[1]}/>  
                  <Statistic teksti="Huono" maara={maarat[2]}/>  
                  <Statistic teksti="Keskiarvo" maara={maarat[3]}/>  
                  <Statistic teksti="Positiivisia" maara={maarat[4]}/>
                </tbody> 
              </table>      
          </div>
      )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        hyva: 0,
        neutraali: 0,
        huono: 0,
        kaikki: 0
        }
    }
    
    klikLisaaPalaute = (palaute) =>{
      if (palaute === "hyva"){
        return () => {
          this.setState({
            hyva:this.state.hyva + 1,
            kaikki: this.state.kaikki + 1
          })
        }
      }else if ( palaute === "neutraali" ){
        return () => {
          this.setState({
            neutraali:this.state.neutraali + 1,
            kaikki: this.state.kaikki + 1
          })
        }    
      }else{
        return () => {
          this.setState({
            huono:this.state.huono + 1,
            kaikki: this.state.kaikki + 1
          })
        }
      }
    }

    render() {
        const keskiarvo = () => {
            const hyvat = this.state.hyva
            const huonot = this.state.huono
            return (hyvat-1*huonot)/this.state.kaikki
        }
        const positiivisia = () => (this.state.hyva/this.state.kaikki)*100
        const lukumaarat = [this.state.hyva,this.state.neutraali,
            this.state.huono,keskiarvo(),positiivisia()+" %",this.state.kaikki]
        return(
            <div>
                <div>
                <p>Anna palautetta</p>
                <Button handleClick={this.klikLisaaPalaute("hyva")}
                        text="Hyva"/>
                <Button handleClick={this.klikLisaaPalaute("neutraali")}
                        text="Neutraali"/>
                <Button handleClick={this.klikLisaaPalaute("huono")}
                        text="Huono"/>
                <Statistics maarat={lukumaarat}/>
                </div>
            </div>
        )
    }
  }

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
