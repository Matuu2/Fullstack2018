import React from 'react'
import ReactDOM from 'react-dom'

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
        const positiivisia = () => (this.state.hyva/this.state.kaikki)*100
        return(
            <div>
                <div>
                <p>Anna palautetta</p>
                <button onClick={this.klikHyva}>Hyvä</button>
                <button onClick={this.klikNeutraali}>Neutraali</button>
                <button onClick={this.klikHuono}>Huono</button>
                <p>Statistiikka</p>
                <p>Hyvä {this.state.hyva}<br />
                Neutraali {this.state.neutraali}<br />
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