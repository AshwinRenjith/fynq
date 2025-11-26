import React, { useState, useEffect } from 'react';
import './Button.css';

const Button = ({ children, variant = 'primary', className = '', onClick, ...props }) => {
    const [coords, setCoords] = useState({ x: -1, y: -1 });
    const [isRippling, setIsRippling] = useState(false);

    useEffect(() => {
        if (coords.x !== -1 && coords.y !== -1) {
            setIsRippling(true);
            const timer = setTimeout(() => setIsRippling(false), 500);
            return () => clearTimeout(timer);
        } else {
            setIsRippling(false);
        }
    }, [coords]);

    useEffect(() => {
        if (!isRippling) setCoords({ x: -1, y: -1 });
    }, [isRippling]);

    const handleClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        if (onClick) onClick(e);
    };

    return (
        <button
            className={`btn btn-${variant} ${className}`}
            onClick={handleClick}
            {...props}
        >
            {isRippling && (
                <span
                    className="ripple"
                    style={{
                        left: coords.x,
                        top: coords.y,
                    }}
                />
            )}
            <span className="btn-content">{children}</span>
        </button>
    );
};

export default Button;
