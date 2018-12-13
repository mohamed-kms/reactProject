import React, { } from 'react';

function SettingPlugin(props) {
    return (
        <tr>
            <td>{props.control}</td>
            <td>{props.default}</td>
            <td>{props.min}</td>
            <td>{props.max}</td>
            <td>
                <button className="btn btn-danger" onClick={() => props.removeConfig(props.id)}>
                    <i className="icon ion-md-close"/>
                </button>
            </td>
        </tr>
    )
}

export default SettingPlugin;