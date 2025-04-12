// src/components/Grid.jsx
import React from 'react';

const CriterioMaxiMax = ({ data, rows, cols, decisionNames, columnNames}) => {
    const calculateMax = () => {
        return data.map(row => Math.max(...row)); 
    };

    const mapColor = (indexRow, indexCol, totalCols, data , maxValue) => {
        return ((indexCol == (totalCols - 1)) && (data[indexRow][indexCol] == maxValue))? {"color": "white", "backgroundColor": "green"} : {"color": "black", "backgroundColor": "white"};
    }        
    
    const maxResults = calculateMax();
    
    const newData = data.map((row, rowIdx) => {
        return [...row, maxResults[rowIdx]];
    });

    const newColumnNames = [...columnNames, 'Max'];

    const maxMax = Math.max(...maxResults);

    return (
        <div>
            <h2>Criterio de decision de MaxMax(Optimista)</h2>
            
            <p>Voy a ganar lo mayor posible</p>
            <p>Es lo opuesto a wald, se buscan los máximos de cada acción y se elige el mayor</p>

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
                                <td key={colIdx} style={{...mapColor(rowIdx, colIdx, cols, newData, maxMax)}}>
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

export default CriterioMaxiMax;
