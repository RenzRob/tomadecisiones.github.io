// src/components/Grid.jsx
import React from 'react';

const Grid = ({ rows, cols, onChange, onColumnNameChange, decisionNames, onDecisionNameChange }) => {
    const handleCellChange = (rowIdx, colIdx, value) => {
        onChange(rowIdx, colIdx, parseFloat(value));
    };

    const handleColumnNameChange = (index, name) => {
        onColumnNameChange(index, name);
    };

    const handleDecisionNameChange = (index, name) => {
        onDecisionNameChange(index, name);
    };

    return (
        <div>
            <table border="1" class="styled-table">
                <thead>
                    <tr>
                        <th>Decisiones</th>

                        {Array.from({ length: cols }, (_, colIdx) => (
                            <th key={colIdx}>
                                <input
                                    type="text"
                                    defaultValue={`x${colIdx + 1}`}
                                    onBlur={(e) => handleColumnNameChange(colIdx, e.target.value)}
                                />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, rowIdx) => (
                        <tr key={rowIdx}>
                            <td>
                                <input
                                    type="text"
                                    value={decisionNames[rowIdx]}
                                    onChange={(e) => handleDecisionNameChange(rowIdx, e.target.value)}
                                />
                            </td>
                            {Array.from({ length: cols }).map((_, colIdx) => (
                                <td key={colIdx}>
                                    <input
                                        type="number"
                                        step="0.01"
                                        onChange={(e) => handleCellChange(rowIdx, colIdx, e.target.value)}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Grid;
