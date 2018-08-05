import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const Statistic = ({teksti,maara}) =>{
    return(
        <p>{teksti}{maara}</p>
    )
}

const Statistics = ({maarat}) =>{
    return(
        <div>
            <p>Statistiikka</p>
            <Statistic teksti="Hyvä" maara={maarat[1]}/>    
        </div>
    )
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

    klikHyva = () => {
        this.setState({
        hyva: this.state.hyva + 1,
        kaikki: this.state.kaikki + 1
        })
    }

    klikNeutraali = () => {
        this.setState({
        neutraali: this.state.neutraali + 1,
        kaikki: this.state.kaikki + 1
        })
    }

    klikHuono = () => {
        this.setState({
            huono: this.state.huono + 1,
            kaikki: this.state.kaikki + 1
        })
    }

    render() {
        const keskiarvo = () => {
            const hyvat = this.state.hyva
            const huonot = this.state.huono
            return (hyvat-1*huonot)/this.state.kaikki
        }
        const lukumaarat = [this.state.hyva]
        const positiivisia = () => (this.state.hyva/this.state.kaikki)*100
        return(
            <div>
                <div>
                <p>Anna palautetta</p>
                <Button handleClick={this.klikHyva}
                        text="Hyva"/>
                <Button handleClick={this.klikNeutraali}
                        text="Neutraali"/>
                <Button handleClick={this.klikHuono}
                        text="Huono"/>
                <Statistics maarat={lukumaarat} />
                <p>Neyhthdtutraali {this.state.neutraali}<br />
                Huono {this.state.huono}<br />
                Keskiarvo {keskiarvo()}<br />
                Positiivisia {positiivisia()}%</p>
                </div>
            </div>
        )
    }
  }

ReactDOM.render(
    <App />,
    document.getElementById('root')
)