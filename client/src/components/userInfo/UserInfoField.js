import React from 'react';

export default ({ input, label, meta: { error, touched } }) =>
    (
        <div>
            <label>{label}</label>
            <input {...input} />
            <div className="red-text">
                {touched && error}
            </div>
        </div>
    )


