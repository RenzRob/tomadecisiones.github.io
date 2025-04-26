// src/components/Grid.jsx
import React, { useEffect } from 'react';

const BeneficioEsperadoMatriz = ({ data, rows, cols, decisionNames, columnNames}) => {
    const [probabilities, setProbabilities] = React.useState(Array(data[0].length).fill(0.5));
    
    useEffect(() => {
        setProbabilities(Array(data[0].length).fill(0.5));
    }, [data]);

    const mapColor = (indexRow, indexCol, totalCols, data , maxValue) => {
        return ((indexCol == (totalCols - 1)) && (data[indexRow][indexCol] == maxValue))? {"color": "white", "backgroundColor": "green"} : {"color": "black", "backgroundColor": "white"};
    }     

    const mapColorTotalP = (totalProb) => {
        return totalProb != 1? {"color": "white", "backgroundColor": "red"} : {"color": "white", "backgroundColor": "#009879"};
    } 
    
    const editProbabilities = (colIdx, e) => {
        const newProbabilities = [...probabilities];
        
        newProbabilities[colIdx] = parseFloat(e.target.value);
        
        setProbabilities(newProbabilities);
    }

    const calculateBeneficioEsperado = () => {
        let nuevaColumna = Array(data.length).fill(0);
        
        for (let row = 0; row < data.length; row++) {
            let beneficioEsperadoFila = 0;

            for (let col = 0; col < data[row].length; col++) {
                beneficioEsperadoFila += (data[row][col] * probabilities[col]);
            }

            nuevaColumna[row] = beneficioEsperadoFila;
        }

        return nuevaColumna;
    };

    const calculateBEIP = () => {
        let nuevaColumna = Array(data[0].length).fill(0);

        // Encontrar el maximo de cada columna y multiplicarlo por la probabilidad
        for (let j = 0; j < data[0].length; j++) {
            let maximo = -Infinity;
            for (let i = 0; i < data.length; i++) {
                if (data[i][j] > maximo) {
                    maximo = data[i][j];
                }
            }
            nuevaColumna[j] = maximo * probabilities[j];
        }

        // Sumar los maximos de cada columna
        return nuevaColumna.reduce((a, b) => a + b, 0);
    }
    
    const columnaBeneficioEsperado = calculateBeneficioEsperado();
    
    const newData = data.map((row, rowIdx) => {
        return [...row, columnaBeneficioEsperado[rowIdx]];
    });

    const newColumnNames = [...columnNames, 'E(B) --> Beneficio esperado'];

    const DECIMALES = 2;

    const maxBeneficioEsperado = Math.max(...columnaBeneficioEsperado).toFixed(DECIMALES);
    
    const BEIP = calculateBEIP().toFixed(DECIMALES);

    const VEIP = (BEIP - maxBeneficioEsperado).toFixed(DECIMALES);

    const TOTAL_P = probabilities.reduce((a, b) => a + b, 0);



    return (
        <div>
            <h2>Maxima esperanza del beneficio</h2>
            
            <table border="1" class="styled-table">
                <thead>
                    <tr>
                        <th>Probabilidades</th>
                        {probabilities.map((prob, colIdx) => (
                            <td key={colIdx}>
                                <input
                                    type="number"
                                    value={prob}
                                    onChange={(e => editProbabilities(colIdx, e))}
                                    placeholder="Probabilidad"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                />
                            </td>
                        ))}
                        <th style={{...mapColorTotalP(TOTAL_P)}}>P={TOTAL_P}</th>
                    </tr>
                    <tr>
                        <th>Decisiones</th>

                        {newColumnNames.map((name, colIdx) => (
                            <th key={colIdx}>{name}</th>
                        ))}
                    </tr>
                </thead>
                
                <tbody>
                    {Array.from({ length: rows }).map((_, rowIdx) => (
                        <tr key={rowIdx}>
                            <td>
                                {decisionNames[rowIdx]}
                            </td>
                            
                            {Array.from({ length: cols }).map((_, colIdx) => (
                                <td key={colIdx} style={{...mapColor(rowIdx, colIdx, cols, newData, maxBeneficioEsperado)}}>
                                    {newData[rowIdx][colIdx]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>BEIP (Beneficio esperado con informacion perfecta)</h2>
            <p>Representa el maximo beneficio esperado que puedo obtener si tuviera la informacion perfecta sobre que estado ocurrira</p>
            <p>Es decir, si supiera con certeza si va allover o no antes de tomar la decision</p>
            <p>En este caso, el maximo beneficio esperado es el maximo de cada columna multiplicado por la probabilidad de que ocurra</p>

            <p className='formula'>
                <math xmlns="http://www.w3.org/1998/Math/MathML">
                    <mrow>
                        <mi>BEIP</mi>
                        <mo>=</mo>
                        <munderover>
                        <mo>&#x2211;</mo> {/* Suma */}
                        <mrow>
                            <mi>j</mi>
                            <mo>=</mo>
                            <mn>1</mn>
                        </mrow>
                        <mi>n</mi>
                        </munderover>
                        <mrow>
                        <msub>
                            <mi>P(Col)</mi>
                            <mi>j</mi>
                        </msub>
                        <mo>&#x22C5;</mo>
                        <mo>max</mo>
                        <mo>(</mo>
                        <mrow>
                            <msub>
                            <mi>Col</mi>
                            <mrow><mn>j</mn></mrow>
                            </msub>
                        </mrow>
                        <mo>)</mo>
                        <mo>=</mo>
                        <mi>{BEIP}</mi>
                        </mrow>
                    </mrow>
                </math>
            </p>
            
            <h2>VEIP (Valor esperado con informacion perfecta)</h2>
            <p>Hasta cuanto estoy dispuesto a pagar por tener la informacion perfecta</p>
            <p>Por encima de este valor, no vale la pena pagar por la informacion perfecta</p>
            <p>Mientras mas cercano a 0, mas perfecta es mi informacion</p>
            <p className='formula'>
                <math xmlns="http://www.w3.org/1998/Math/MathML">
                    <mrow>
                        <mi>VEIP</mi>
                        <mo>=</mo>
                        <mi>BEIP</mi>
                        <mo>&#x2212;</mo> {/* Signo menos */}
                        <mo>max</mo>
                        <mo>&#x2061;</mo> {/* Espaciado funcional */}
                        <mrow>
                        <mo>(</mo>
                        <msub>
                            <mi>E</mi>
                            <mrow>
                            <mo>(</mo>
                            <mi>B</mi>
                            <mo>)</mo>
                            <mi>i</mi>
                            </mrow>
                        </msub>
                        <mo>)</mo>
                        <mo>=</mo>
                        <mi>{BEIP}</mi>
                        <mo>-</mo>
                        <mi>{maxBeneficioEsperado}</mi>
                        <mo>=</mo>
                        <mi>{VEIP}</mi>
                        </mrow>
                    </mrow>
                </math>
            </p>
            
        </div>
    );
};

export default BeneficioEsperadoMatriz;
