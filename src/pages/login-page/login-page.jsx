import React, { useState } from 'react';
import './login-page.style.scss';
import FormInput from '../../components/form-input/form-input.somponent';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();

    const defaultFormFields = {
        email: '',
        password: '',
    };

    const [formInputs, setFormInputs] = useState(defaultFormFields);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormInputs({...formInputs, [name]: value});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(formInputs);
    }

    const goToLogin = () => {
        navigate('/register');
    }

    return (
        <div className='login-page'>
            <div className="header">
                <div className="logo-container">
                    <img src="https://cdn-icons-png.flaticon.com/512/2885/2885504.png" alt="logo" />
                </div>
            </div>

            <div className="login-page-main">
                <div className="login-options">
                    <h1>Log in to Telechat</h1>

                    <div className="buttons-container">
                        <button type='button' className='login-button'>
                            <div className="button-icon">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png" alt="logo" />
                            </div>
                            <p>Continue with Google</p>
                        </button>
                    </div>
                </div>

                <div className='divider'>
                </div>

                <form action="" className="login-form">
                    <FormInput 
                        labelText="Email" 
                        inputType='text' 
                        mode='dark' 
                        // errorText={formErrors.emailError} 
                        inputOptions={{
                            placeholder: 'Email',
                            type: 'email',
                            id: 'email',
                            name: 'email',
                            onChange: changeHandler,
                            value: formInputs.email,
                        }}
                    />

                    <FormInput 
                        labelText='Password' 
                        inputType='text' 
                        mode='dark' 
                        // errorText={formErrors.passwordError} 
                        inputOptions={{
                            placeholder: 'Password',
                            type: 'password',
                            id: 'password',
                            name: 'password',
                            onChange: changeHandler,
                            value: formInputs.password
                        }}
                    />

                    <button className='submit-button' type='submit' onClick={submitHandler}>
                        Log In
                    </button>
                </form>

                <div className='divider'>
                </div>

                <div className="go-to-login">
                    <h1>Don't have an account? <span onClick={goToLogin}>Sign up for Telechat</span></h1>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
