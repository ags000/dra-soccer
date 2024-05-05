import { useEffect, useState } from "react";
import axios from "axios";
import './LaLiga.css';
import Header from "../../components/header/Header";

const calculateClassName = (index) => {
  if (index < 4) return 'champions';
  if (index >= 4 && index < 6) return 'europaleague';
  if (index === 6) return 'conference';
  if (index >= 17) return 'relegation';
  return 'regular';
}


const LaLiga = () => {

  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/laliga`)
    .then((resp) => {
      setTable(resp.data);
    })
    .catch(() => {
      setError(true);
    })
    .finally(() => setLoading(false));
  }, []);

  if (table.length >= 1) {
    return (
      <div style={{height: '100%'}}>
        <Header />
      <div className="table__container">
        <div className="table__container-cont">
          <table>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Pts</th>
                <th>PJ</th>
                <th>PG</th>
                <th>PE</th>
                <th>PP</th>
                <th>GF</th>
                <th>GC</th>
                <th>Pts</th>
                <th>PJ</th>
                <th>PG</th>
                <th>PE</th>
                <th>PP</th>
                <th>GF</th>
                <th>GC</th>
                <th>Pts</th>
                <th>PJ</th>
                <th>PG</th>
                <th>PE</th>
                <th>PP</th>
                <th>GF</th>
                <th>GC</th>
              </tr>
            </thead>
            <tbody>
              {table.map((elementRow, index) => {
                if(index > 19) return null;
                return (
                  <tr key={'team'+index} className={calculateClassName(index)}>
                  {elementRow.map((element, index) => {
                    

                    if (index === 0) {
                      return (
                        <td key={`td-img-${index}`}>
                          <img key={`img-${index}`} src={element} alt="" />
                        </td>
                        
                      )
                    }
      
                    return (
                      <td key={`td-${index}`}>{element}</td>
                    )
                  })}
                  </tr>
                )

                
          })}
            </tbody>
          </table>
          <p style={{marginTop: '1em'}}>Fuente: https://resultados.as.com/resultados/futbol/primera/clasificacion/</p>
        </div>
      </div>
      </div>
    )
  }

  return (
    <>
    
    </>
  )
}

export default LaLiga;