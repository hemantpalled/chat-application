import React, { useState } from 'react';

const Dropdown = ({ options, onSelect, name, selectedOption , customStyle}) => {
    const handleSelect = (option) => {
        console.log(option);
        onSelect(option);
    };

    return (
        <select className={customStyle} name={name} value={JSON.stringify(selectedOption)} onChange={(e) => handleSelect(JSON.parse(e.target.value))}>
            {options.map((option, index) => {
                return (<option key={index} value={JSON.stringify(option)}>
                    {option.name}
                </option>)
            }

            )}
        </select>
    );
};

export default Dropdown;
