import React from 'react'

import './input.styles.css'

export default function InputComponent({label, type, name, required, handleChange}) {

    return (
        <div className="joinus-input-wrapper">
        <label className="joinus-label">{label}</label>
        <input className="joinus-input" type={type} name={name} required={required} onChange={handleChange} />
    </div>
    )
}