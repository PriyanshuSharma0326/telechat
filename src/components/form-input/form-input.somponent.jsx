import React from 'react';
import './form-input.style.scss';

function FormInput({ labelText, inputType, inputOptions, errorText, mode }) {
    return (
        <div className='form-group'>
            <label htmlFor={inputOptions.id} className={`form-input-label ${mode === 'dark' && 'dark'}`}>
                {labelText}
            </label>

            {inputType === 'text' && <input className={`form-input ${mode === 'dark' && 'dark'}`} {...inputOptions} />}

            {inputType === 'radio' && 
                <div className='radio-input-group'>
                    <label className='radio-label'>
                        <input 
                            className='radio-input'
                            {...inputOptions} 
                            value={inputOptions.value1} 
                            checked={inputOptions.checked === inputOptions.value1} 
                        />
                        <span className="checkmark"></span>
                        {inputOptions.value1}
                    </label>
                    <label className='radio-label'>
                        <input 
                            className='radio-input'
                            {...inputOptions} 
                            value={inputOptions.value2} 
                            checked={inputOptions.checked === inputOptions.value2} 
                        />
                        <span className="checkmark"></span>
                        {inputOptions.value2}
                    </label>
                    <label className='radio-label'>
                        <input 
                            className='radio-input'
                            {...inputOptions} 
                            value={inputOptions.value3} 
                            checked={inputOptions.checked === inputOptions.value3} 
                        />
                        <span className="checkmark"></span>
                        {inputOptions.value3}
                    </label>
                    <label className='radio-label'>
                        <input 
                            className='radio-input'
                            {...inputOptions} 
                            value={inputOptions.value4} 
                            checked={inputOptions.checked === inputOptions.value4} 
                        />
                        <span className="checkmark"></span>
                        {inputOptions.value4}
                    </label>
                    <label className='radio-label'>
                        <input 
                            className='radio-input'
                            {...inputOptions} 
                            value={inputOptions.value5} 
                            checked={inputOptions.checked === inputOptions.value5} 
                        />
                        <span className="checkmark"></span>
                        {inputOptions.value5}
                    </label>
                </div>
            }

            {errorText && <p className='error-text'>{errorText}</p>}
        </div>
    );
}

export default FormInput;
