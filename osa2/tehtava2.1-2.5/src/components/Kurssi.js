import React from 'react'

const Sisalto = ({ osat }) => {
    return (
        osat.map(osa =>
            <li key={osa.id}>{osa.nimi} {osa.tehtavia}</li>)    
    )
}

const Kurssi = ({ kurssi }) => {

    const yhteensa = () => kurssi.osat.reduce((tehtavat,osa) => {
        tehtavat += osa.tehtavia
        return tehtavat
    },0)
    
    return (
        <div>
            <p><b>{kurssi.nimi}</b></p>
            <ul>
                {<Sisalto osat={kurssi.osat}/>}
                <ul style={{ listStyleType: "none" }}>
                    <li> <u>Yhteensä {yhteensa()} tehtävää</u></li> 
                </ul>
            </ul>
        </div>
    )
}

export default Kurssi