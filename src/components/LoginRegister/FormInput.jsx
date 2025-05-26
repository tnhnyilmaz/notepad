import React from 'react';

const FormInput = ({ id, type, placeholder, label, value, onChange }) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-notWhite">{label}</label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="border p-2 border-notBlue rounded-md h-8 placeholder:px-2 bg-transparent focus:outline-none focus:ring-1 focus:ring-notBlue"
            />
        </div>
    );
};
export default FormInput