import React from 'react'

import './section.styles.css'

export default function SectionComponent({ name, options, selectCategory}) {
    return (
        <div className="select-input-wrapper">
            <select className="joinus-select" name={name} onChange={selectCategory} >
                <option value="notselected"></option>
                {
                    options.map( (option, index) => 
                        <option key={index} value={option.id} >{option.name.charAt(0).toUpperCase() + option.name.toLowerCase().slice(1)}</option>
                    )
                }
            </select>
        </div>
    )
}