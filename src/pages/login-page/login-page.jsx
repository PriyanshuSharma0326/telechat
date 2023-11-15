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

    const goToSignup = () => {
        navigate('/register');
    }

    const fillWithSampleCredentials = (email, pass) => {
        setFormInputs({
            email: email,
            password: pass,
        })
    }

    return (
        <div className='login-page'>
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

                <div className="go-to-signup">
                    <h1>Don't have an account? <span onClick={goToSignup}>Sign up for Telechat</span></h1>
                </div>

                <div className="sample-id-container">
                    <p onClick={() => fillWithSampleCredentials('user@telechat.vercel.app', 'User1234')}>User 1 - Harry</p>
                    <h1>Email<span>user@telechat.vercel.app</span></h1>
                    <h1>Password<span>User1234</span></h1>
                </div>

                <div className="sample-id-container">
                    <p onClick={() => fillWithSampleCredentials('viratkohli@bcci.in', 'Virat@18')}>User 2 - Virat</p>
                    <h1>Email<span>viratkohli@bcci.in</span></h1>
                    <h1>Password<span>Virat@18</span></h1>
                </div>

                <div className="sample-id-container">
                    <p onClick={() => fillWithSampleCredentials('msdhoni@bcci.com', 'MSDhoni@7')}>User 3 - Dhoni</p>
                    <h1>Email<span>msdhoni@bcci.com</span></h1>
                    <h1>Password<span>MSDhoni@7</span></h1>
                </div>

                <div className="sample-id-container">
                    <p onClick={() => fillWithSampleCredentials('ankit@muscleblaze.com', 'Ankit@75')}>User 4 - Ankit</p>
                    <h1>Email<span>ankit@muscleblaze.com</span></h1>
                    <h1>Password<span>Ankit@75</span></h1>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
