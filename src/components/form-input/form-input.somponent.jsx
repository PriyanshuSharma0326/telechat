import React from 'react';
import './form-input.style.scss';

import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';

function FormInput({ labelText, inputType, inputOptions, errorText, mode }) {
    return (
        <div className='form-group'>
            <label htmlFor={inputOptions.id} className={`form-input-label ${mode === 'dark' && 'dark'}`}>
                {labelText}
            </label>

            {inputType === 'text' && <input className={`form-input${mode === 'dark' ? ' dark' : ''}${(errorText && !inputOptions.value) ? ' error' : ''}`} {...inputOptions} />}

            {inputType === 'image' && 
                <div className="image-input-group">
                    <label htmlFor={inputOptions.id}>
                        <AddPhotoAlternateTwoToneIcon /> <span>Add an image</span>
                    </label>
                    <input 
                        className='image-input' 
                        {...inputOptions} 
                    />
                    <span>*Max size: 1MB</span>
                </div>
            }

            {errorText && <p className='error-text'>{errorText}</p>}
        </div>
    );
}

export default FormInput;
