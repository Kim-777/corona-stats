import React from 'react';
import './Table.css'

const Table = ({ countries }) => {
    return (
        <div className="table">
            <table>
                <tbody>
                    {countries.map(({country, cases}, index) => (
                        <tr key={country}>
                            <td>{index + 1}</td>
                            <td>{country}</td>
                            <td>
                                <strong>{cases}</strong>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default Table;
