import React from 'react';
import numeral from "numeral";

import "../stylesheets/Table.css";

function Table({ data }) {
    return (
        <div className="table">
            {data.map(({name, area_score}) => (
                <tr>
                    <td>{name}</td>
                    <td><strong>{numeral(area_score).format(0,0)}</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default Table
