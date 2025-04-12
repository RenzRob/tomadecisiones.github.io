// src/components/Grid.jsx
import React from 'react';

const CriterioSavage = ({ data, rows, cols, decisionNames, columnNames}) => {
    const calculateRegretsMatrix = () => {
        let stringMatrixToPrint = data.map(row => [...row]);
        let regretsMatrix = data.map(row => [...row]);

        for (let i = 0; i < cols - 1; i++) {
            const maxCol = Math.max(...data.map(row => row[i]));

            for (let j = 0; j < rows; j++) {
                let res = maxCol - data[j][i];

                stringMatrixToPrint[j][i] = `${maxCol} - ${data[j][i]} = ${res}`;
                regretsMatrix[j][i] = res;
            }
        }

        const maxRegrets = regretsMatrix.map(row => Math.max(...row));
        
        return {stringMatrixToPrint, maxRegrets};
    };

    const mapColor = (indexRow, indexCol, totalCols, data , evalValue) => {
        return ((indexCol == (totalCols - 1)) && (data[indexRow][indexCol] == evalValue))? {"color": "white", "backgroundColor": "green"} : {"color": "black", "backgroundColor": "white"};
    }        
    
    const {stringMatrixToPrint, maxRegrets} = calculateRegretsMatrix();
    
    const newData = data.map((row, rowIdx) => {
        return [...row, maxRegrets[rowIdx]];
    });

    const newColumnNames = [...columnNames, 'Min Regret'];

    const minOfMaxRegrets = Math.min(...maxRegrets);

    return (
        <div>
            <h2>Criterio de decision de Savage</h2>
            
            <p>Elijo el que menos me hace arrepentirme</p>
            <p>Define una matriz de arrepentimientos, donde cada posicion ahora se calcula como: </p>
            <math xmlns="http://www.w3.org/1998/Math/MathML">
                <mrow>
                    <mi>nuevo_valor[i][j]</mi> <mo>=</mo> <mi>MAX(j)</mi> <mo>-</mo> <mi>beneficios[i][j]</mi>
                </mrow>
            </math>
            <p>Luego para cada fila se elije el maximo y con el vector resultante, elejimos el minimo valor</p>

            <table border="1" class="styled-table">
                <thead>
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
                                <td key={colIdx} style={{...mapColor(rowIdx, colIdx, cols, newData, minOfMaxRegrets)}}>
                                    {colIdx == (cols - 1) ? maxRegrets[rowIdx] : stringMatrixToPrint[rowIdx][colIdx]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CriterioSavage;
