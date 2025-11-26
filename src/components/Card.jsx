import React from 'react';
import './Card.css';

const Card = ({ children, className = '', hoverEffect = true, ...props }) => {
    return (
        <div
            className={`glass-card ${hoverEffect ? 'hover-effect' : ''} ${className}`}
            {...props}
        >
            <div className="card-highlight" />
            {children}
        </div>
    );
};

export default Card;
