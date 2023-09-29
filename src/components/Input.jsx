import React from 'react'

const Input = ({ label, type, name, onChange }) => {
    return (
        <div className='filter-input-section my-2 w-100 d-flex justify-content-between align-items-between'>
            <label className='title'>{label}</label>
            <input type={type} name={name} onChange={onChange} />
        </div>
    )
}

export default Input
