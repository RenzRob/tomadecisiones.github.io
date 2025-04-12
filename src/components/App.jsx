// src/components/App.jsx
import React, { useState } from 'react';
import Grid from './Grid';
import CriterioHurwicz from './CriterioHurwicz';
import CriterioWald from './CriterioWald';
import CriterioMaxiMax from './CriterioMaxiMax';
import CriterioSavage from './CriterioSavage';

const App = () => {
    const [rows, setRows] = useState(2); // Decisiones
    const [cols, setCols] = useState(2); // Estados de la naturaleza

    const [data, setData] = useState(Array(rows).fill(Array(cols).fill(0)));
    const [columnNames, setColumnNames] = useState(Array(cols).fill('x'));
    const [decisionNames, setDecisionNames] = useState(Array(rows).fill('').map((_, i) => `Decision ${i + 1}`));
    
    const [probabilities, setProbabilities] = useState(Array(cols).fill(0.5));

    const handleGridChange = (rowIdx, colIdx, value) => {
        const newData = data.map((row) => [...row]); // Clonamos el array de datos
        newData[rowIdx][colIdx] = value;
        setData(newData);
    };

    const handleColumnNameChange = (colIdx, name) => {
        const newColumnNames = [...columnNames];
        newColumnNames[colIdx] = name;
        setColumnNames(newColumnNames);
    };

    const handleDecisionNameChange = (rowIdx, name) => {
        const newDecisionNames = [...decisionNames];
        newDecisionNames[rowIdx] = name;
        setDecisionNames(newDecisionNames);
    };

    const setColumnNumber = (e) => {
        if (e.target.value === '') {
            setCols(2);
            return;
        }
        const number = parseInt(e.target.value);
        
        const newColumnNames = Array(number).fill('x');
        
        const newData = data.map((row) => {
            const newRow = [...row];
            while (newRow.length < number) {
                newRow.push(0);
            }
            return newRow.slice(0, number);
        });

        setData(newData);
        setCols(number);
        setColumnNames(newColumnNames);
    }

    const setRowNumber = (e) => {
        if (e.target.value === '') {
            setRows(2);
            return;
        }

        const number = parseInt(e.target.value);
        
        const newDecisionNames = Array(number).fill('').map((_, i) => `Decision ${i + 1}`);
        
        setRows(number);
        setDecisionNames(newDecisionNames);
    }

    return (
        <div>
            <h1>Calculadora de Criterios de Decisión</h1>

            <label htmlFor="estados">Estados de la naturaleza</label>
            <input key="estados" type="number" value={cols} onChange={setColumnNumber} min={2}/>
            
            <label htmlFor="decisiones">Decisiones</label>
            <input key="estados" type="number" value={rows} onChange={setRowNumber} min={2}/>

            <Grid 
                rows={rows} 
                cols={cols} 
                onChange={handleGridChange} 
                onColumnNameChange={handleColumnNameChange} 
                decisionNames={decisionNames}
                onDecisionNameChange={handleDecisionNameChange} 
            />

            <CriterioHurwicz 
                data={data} 
                rows={rows} 
                cols={cols + 1} 
                decisionNames={decisionNames} 
                columnNames={columnNames}
            />

            <CriterioWald
                data={data} 
                rows={rows} 
                cols={cols + 1} 
                decisionNames={decisionNames} 
                columnNames={columnNames}
            />

            <CriterioMaxiMax 
                data={data} 
                rows={rows} 
                cols={cols + 1} 
                decisionNames={decisionNames} 
                columnNames={columnNames}
            />

            <CriterioSavage 
                data={data} 
                rows={rows} 
                cols={cols + 1} 
                decisionNames={decisionNames} 
                columnNames={columnNames}
            />
        </div>
    );
};

export default App;
