// src/components/DecisionCriteria.jsx
import React from 'react';

const DecisionCriteria = ({ data, criteria, probabilities, decisionNames }) => {
  const calculateHurwicz = () => {
    return data.map(row => {
      const max = Math.max(...row);
      const min = Math.min(...row);
      return 0.7 * max + 0.3 * min; // ejemplo de coeficiente de Hurwicz
    });
  };

  const calculateWald = () => {
    return data.map(row => Math.min(...row)); // Criterio pesimista
  };

  const calculateMaximax = () => {
    return data.map(row => Math.max(...row)); // Criterio optimista
  };

  const calculateSavage = () => {
    const maxForColumns = data[0].map((_, colIdx) => Math.max(...data.map(row => row[colIdx])));
    return data.map(row => row.map((value, colIdx) => maxForColumns[colIdx] - value));
  };

  const calculateRisk = () => {
    return data.map((row, rowIdx) => {
      return row.reduce((acc, value, colIdx) => acc + value * probabilities[colIdx], 0); // Máximo beneficio esperado
    });
  };

  const getResult = () => {
    switch (criteria) {
      case 'hurwicz':
        return calculateHurwicz();
      case 'wald':
        return calculateWald();
      case 'maximax':
        return calculateMaximax();
      case 'savage':
        return calculateSavage();
      case 'risk':
        return calculateRisk();
      default:
        return [];
    }
  };

  const results = getResult();
  
  return (
    <div>
      <h3>Resultados del Criterio: {criteria}</h3>
      <ul>
        {results.map((result, idx) => (
          <li key={idx}>
            {decisionNames[idx] || `Decisión ${idx + 1}`}: {JSON.stringify(result)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DecisionCriteria;
