import React, { useState } from 'react';
import './login-page.style.scss';
import FormInput from '../../components/form-input/form-input.somponent';
import { useNavigate } from 'react-router-dom';
import { createUserDoc, googlePopupSignIn, signInUserEmailPasswordMethod } from '../../lib/utils/firebase.utils';
import { validateEmail } from '../../lib/utils/utils';

function LoginPage() {
    const navigate = useNavigate();

    const defaultFormFields = {
        email: '',
        password: '',
    };

    const defaultFormErrors = {
        email: '',
        password: '',
        image: ''
    };

    const [formInputs, setFormInputs] = useState(defaultFormFields);

    const [formErrors, setFormErrors] = useState(defaultFormErrors);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormInputs({...formInputs, [name]: value});
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if(!formInputs.email.trim()) {
            validationErrors.email = 'Email is required';
        }
        else if(!validateEmail(formInputs.email.trim())) {
            validationErrors.email = 'Email is badly formatted';
        }

        if(!formInputs.password.trim()) {
            validationErrors.password = 'Password is required';
        }

        if(Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        if(Object.keys(validationErrors).length === 0) {
            try {
                await signInUserEmailPasswordMethod(formInputs.email, formInputs.password);
            }
            catch(err) {
                if(err.code === 'auth/user-not-found') {
                    validationErrors.email = 'No user found with this email';
                    setFormErrors(validationErrors);
                    return;
                }
                if(err.code === 'auth/invalid-login-credentials') {
                    validationErrors.email = 'Invalid Login Credentials';
                    validationErrors.password = 'Invalid Login Credentials';
                    setFormErrors(validationErrors);
                    return;
                }
                else if(err.code === 'auth/wrong-password') {
                    validationErrors.password = 'Incorrect password';
                    setFormErrors(validationErrors);
                    return;
                }
            }
        }
    }

    const googleSignInHandler = async () => {
        const { user } = await googlePopupSignIn()
        .catch((error) => {
            alert(error.message);
        });

        await createUserDoc(user, user.displayName, user.photoURL);
    }

    const goToLogin = () => {
        navigate('/register');
    }

    const fillWithSampleCredentials = () => {
        setFormInputs({
            email: 'user@telechat.vercel.app',
            password: 'User1234',
        })
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
                        <button type='button' className='login-button' onClick={googleSignInHandler}>
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
                        errorText={formErrors.email} 
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
                        errorText={formErrors.password} 
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

                <div className="sample-id-container">
                    <p onClick={fillWithSampleCredentials}>Sample credentials</p>
                    <h1>Email<span>user@telechat.vercel.app</span></h1>
                    <h1>Password<span>User1234</span></h1>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
