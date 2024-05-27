import React from 'react';

const Input = ({ label, inputStyle, labelStyle, placeholder, passwordToggle }) => {
    return (
        <div>
            <label>{label}</label>
            <input type={passwordToggle ? 'password' : 'text'} className={inputStyle} placeholder={placeholder} />
        </div>
    );
};

export default Input;