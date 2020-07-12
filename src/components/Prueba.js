import React from 'react';
import './styles/main.css'
import api from '../api';

class Prueba extends React.Component {


  async componentDidMount(){
    console.log('Vamos a probar la request');
    const respuesta = await api.comentarios.list();
    const comentarios = await JSON.stringify(respuesta);
    console.log(comentarios);
  }

  render() {
    return (
        <div id="educacion">
            <div className="educacion-item">
                <img src={`../img/universitario.svg`} alt="Universidad"/> br
                <h1>Ingeniería en Sistemas de Información</h1>
                <h3>En curso</h3>
                <h3>Finalizando 3er y 4to año</h3>
                <h2>UTN FRBA</h2> 
            </div>

            <div className="educacion-item">
            <img src={`../img/secundario.svg`} alt=""/> br
                <h1>Tecnicatura en Computación</h1>
                <h3>Finalizado</h3>
                <h2>E.T. N°26</h2> 
            </div>

        </div>
    );
  }
}

export default Prueba;
