// src/components/App.jsx
import React, { useState } from 'react';
import MatrizBeneficios from './MatrizBeneficios';
import CriterioHurwicz from './CriterioHurwicz';
import CriterioWald from './CriterioWald';
import CriterioMaxiMax from './CriterioMaxiMax';
import CriterioSavage from './CriterioSavage';
import BeneficioEsperadoMatriz from './BeneficioEsperadoMatriz';

const App = () => { 
    const [data, setData] = useState(Array(2).fill(Array(2).fill(0)));

    const [columnNames, setColumnNames] = useState(Array(data[0].length).fill('x'));
    const [decisionNames, setDecisionNames] = useState(Array(data.length).fill('').map((_, i) => `Decision ${i + 1}`));
    
    const [probabilities, setProbabilities] = useState(Array(data[0].length).fill(0.5));

    const handleGridChange = (rowIdx, colIdx, value) => {
        const newData = data.map((row) => [...row]);
        
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
        if (e.target.value === '') return;

        const number = parseInt(e.target.value);
                
        const newData = data.map((row) => {
            const newRow = [...row];
            
            while (newRow.length < number) {
                newRow.push(0);
            }
            return newRow.slice(0, number);
        });

        const newColumnNames = Array(number).fill('x');

        setData(newData);
        setColumnNames(newColumnNames);
    }

    const setRowNumber = (e) => {
        if (e.target.value === '') return;

        const number = parseInt(e.target.value);
        
        const newDecisionNames = Array(number).fill('').map((_, i) => `Decision ${i + 1}`);
        
        const newData = Array(number).fill(Array(data[0].length).fill(0));
        
        setData(newData);
        setDecisionNames(newDecisionNames);
    }

    return (
        <div>
            <h1>Calculadora de Criterios de Decisión</h1>
            
            <div className='inputs-container'>
                <label htmlFor="estados">Estados de la naturaleza</label>
                <input 
                    className='input-estilos'
                    key="estados" 
                    type="number" 
                    value={data[0].length} 
                    onChange={setColumnNumber}
                    placeholder='Estados de la naturaleza'
                    min={2}
                    max={10}
                    step={1}
                />
                
                <label htmlFor="decisiones" id='label-decisiones'>Decisiones</label>
                <input 
                    className='input-estilos'
                    key="estados" 
                    type="number" 
                    value={data.length} 
                    onChange={setRowNumber} 
                    placeholder='Decisiones'
                    min={2}
                    max={10}
                    step={1}
                />
            </div>

            <MatrizBeneficios 
                rows={data.length} 
                cols={data[0].length} 
                onChange={handleGridChange} 
                onColumnNameChange={handleColumnNameChange} 
                decisionNames={decisionNames}
                onDecisionNameChange={handleDecisionNameChange} 
            />

            <CriterioHurwicz 
                data={data}
                rows={data.length} 
                cols={data[0].length + 1} 
                decisionNames={decisionNames} 
                columnNames={columnNames}
            />

            <CriterioWald
                data={data} 
                rows={data.length} 
                cols={data[0].length + 1} 
                decisionNames={decisionNames} 
                columnNames={columnNames}
            />

            <CriterioMaxiMax 
                data={data} 
                rows={data.length} 
                cols={data[0].length + 1} 
                decisionNames={decisionNames} 
                columnNames={columnNames}
            />

            <CriterioSavage 
                data={data} 
                rows={data.length} 
                cols={data[0].length + 1} 
                decisionNames={decisionNames} 
                columnNames={columnNames}
            />

            <h1>Decisiones bajo condiciones de riesgo</h1>
            <BeneficioEsperadoMatriz 
                data={data} 
                rows={data.length} 
                cols={data[0].length + 1} 
                decisionNames={decisionNames} 
                columnNames={columnNames}
            />
        </div>
    );
};

export default App;
