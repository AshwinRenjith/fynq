import React from 'react';
import './Input.css';

const Input = ({ label, error, type = 'text', className = '', ...props }) => {
    return (
        <div className={`input-group ${className}`}>
            {label && <label className="input-label">{label}</label>}
            <input
                className={`glass-input ${error ? 'has-error' : ''}`}
                type={type}
                {...props}
            />
            {error && <span className="input-error">{error}</span>}
        </div>
    );
};

export default Input;
