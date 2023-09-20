import React, { useState } from 'react';
import './register-page.style.scss';
import FormInput from '../../components/form-input/form-input.somponent';
import { useNavigate } from 'react-router-dom';
import { addImageToStorage, createUserEmailPasswordMethod } from '../../lib/utils/firebase.utils';

function RegisterPage() {
    const navigate = useNavigate();

    const defaultFormFields = {
        email: '',
        name: '',
        password: '',
        gender: '',
    };

    const defaultFormErrors = {
        emailError: '',
        nameError: '',
        passwordError: '',
        genderError: '',
    };

    const [formInputs, setFormInputs] = useState(defaultFormFields);

    const [formErrors, setFormErrors] = useState(defaultFormErrors);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormInputs({ ...formInputs, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const image = e.target.form[8].files[0];

        try {
            const { user } = await createUserEmailPasswordMethod(formInputs.email, formInputs.password);

            await addImageToStorage(image, formInputs.name, user);
            navigate('/');
        }
        catch(err) {}
    }

    const goToLogin = () => {
        navigate('/login');
    }

    return (
        <div className='register-page'>
            <div className="register-page-main">
                <div className="signup-options">
                    <div className="logo-container">
                        <img src="https://cdn-icons-png.flaticon.com/512/2885/2885504.png" alt="logo" />
                    </div>

                    <h1>Sign up for free to start chatting.</h1>

                    <button type='button' className='signup-button google'>
                        <div className="button-icon">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png" alt="logo" />
                        </div>
                        <p>Sign up with Google</p>
                    </button>

                    <div className='divider'>
                        <hr />
                        <span>or</span>
                        <hr />
                    </div>
                </div>

                <form action="" className="signup-form">
                    <FormInput 
                        labelText="What's your email?" 
                        inputType='text' 
                        errorText={formErrors.emailError} 
                        inputOptions={{
                            placeholder: 'Enter your email.',
                            type: 'email',
                            id: 'email',
                            name: 'email',
                            onChange: changeHandler,
                            value: formInputs.email,
                        }}
                    />

                    <FormInput 
                        labelText='Create a password' 
                        inputType='text' 
                        errorText={formErrors.passwordError} 
                        inputOptions={{
                            placeholder: 'Create a password.',
                            type: 'password',
                            id: 'password',
                            name: 'password',
                            onChange: changeHandler,
                            value: formInputs.password
                        }}
                    />

                    <FormInput 
                        labelText='What should we call you?' 
                        inputType='text' 
                        errorText={formErrors.nameError} 
                        inputOptions={{
                            placeholder: 'Enter a profile name.',
                            type: 'text',
                            id: 'name',
                            name: 'name',
                            onChange: changeHandler,
                            value: formInputs.name
                        }}
                    />

                    <FormInput 
                        labelText="What's your gender?" 
                        inputType='radio' 
                        errorText={formErrors.genderError} 
                        inputOptions={{
                            required: true,
                            type: 'radio',
                            name: 'gender',
                            value1: 'Male',
                            value2: 'Female',
                            value3: 'Non-binary',
                            value4: 'Other',
                            value5: 'Prefer not to say',
                            onChange: changeHandler,
                            checked: formInputs.gender
                        }}
                    />

                    <FormInput 
                        labelText='Add a profile photo' 
                        inputType='image' 
                        errorText={formErrors.imageURLError} 
                        inputOptions={{
                            type: 'file',
                            id: 'image',
                            name: 'image',
                            // onChange: imageChangeHandler,
                            // value: image
                        }}
                    />

                    <button className='submit-button' type='submit' onClick={submitHandler}>
                        Sign up
                    </button>

                    <div className="go-to-login">
                        <h1>Have an account? <span onClick={goToLogin}>Log in</span>.</h1>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;
