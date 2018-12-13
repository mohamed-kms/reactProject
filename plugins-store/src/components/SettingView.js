import React, { } from 'react';

function SettinView(props) {
    return (
        <tr>
            <td>{props.control}</td>
            <td>{props.default}</td>
            <td>{props.min}</td>
            <td>{props.max}</td>
        </tr>
    )
}

export default SettinView;