// src/components/Grid.jsx
import React, { useState } from 'react';

const CriterioHurwicz = ({ data, rows, cols, decisionNames, columnNames}) => {
    const calculateHurwicz = (w) => {
        return data.map(row => {
          const max = Math.max(...row);
          const min = Math.min(...row);
          return w * max + (1-w) * min; 
        });
    };

    const mapColor = (indexRow, indexCol, totalCols, data , maxValue) => {
        return ((indexCol == (totalCols - 1)) && (data[indexRow][indexCol] == maxValue))? {"color": "white", "backgroundColor": "green"} : {"color": "black", "backgroundColor": "white"};
    }

    const onChangeInputW = (e) => setW(parseFloat(e.target.value));
        
    const [w, setW] = useState(0.5); // Coeficiente de optimismo

    const hurwiczResults = calculateHurwicz(w);
    
    const newData = data.map((row, rowIdx) => {
        return [...row, hurwiczResults[rowIdx]];
    });

    const newColumnNames = [...columnNames, 'H'];

    // Obtener el maximo de la columna de Hurwicz
    const maxHurwicz = Math.max(...hurwiczResults);

    return (
        <div>
            <h2>Criterio de decision de Hurwicz</h2>
            
            <p>Se calcula el valor H para cada fila de la matriz y luego se elige el maximo</p>

            <h3>
            <math xmlns="http://www.w3.org/1998/Math/MathML">
                <mrow>
                    <mi>H</mi>
                    <mo>=</mo>
                    <mi>&#945;</mi>
                    <mo>&#183;</mo>
                    <mi>max</mi>
                    <mo>(</mo>
                    <mi>S</mi>
                    <mo>)</mo>
                    <mo>+</mo>
                    <mrow>
                    <mo>(</mo>
                    <mn>1</mn>
                    <mo>-</mo>
                    <mi>&#945;</mi>
                    <mo>)</mo>
                    </mrow>
                    <mo>&#183;</mo>
                    <mi>min</mi>
                    <mo>(</mo>
                    <mi>S</mi>
                    <mo>)</mo>
                </mrow>
            </math>
            </h3>

            <p>Coeficiente de optimismo (W): <input type='number' value={w} defaultChecked onChange={onChangeInputW} step={0.1} min={0} max={1}></input></p>
            
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
                                <td key={colIdx} style={{...mapColor(rowIdx, colIdx, cols, newData, maxHurwicz)}}>
                                    {newData[rowIdx][colIdx]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CriterioHurwicz;
