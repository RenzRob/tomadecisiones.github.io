// src/components/Grid.jsx
import React from 'react';

const CriterioWald = ({ data, rows, cols, decisionNames, columnNames}) => {
    const calculateWald = () => {
        return data.map(row => Math.min(...row)); 
    };

    const mapColor = (indexRow, indexCol, totalCols, data , maxValue) => {
        return ((indexCol == (totalCols - 1)) && (data[indexRow][indexCol] == maxValue))? {"color": "white", "backgroundColor": "green"} : {"color": "black", "backgroundColor": "white"};
    }        

    const waldResults = calculateWald();
    
    const newData = data.map((row, rowIdx) => {
        return [...row, waldResults[rowIdx]];
    });

    const newColumnNames = [...columnNames, 'Wald'];

    const maxWald = Math.max(...waldResults);

    return (
        <div>
            <h2>Criterio de decision de Wald(MaxMin pesimista)</h2>
            
            <p>Voy a perder lo menos posible</p>
            <p>Para cada accion posible, se busca el beneficio minimo, de ese nuevo vector se elige el indicador maximo</p>

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
                                <td key={colIdx} style={{...mapColor(rowIdx, colIdx, cols, newData, maxWald)}}>
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

export default CriterioWald;
