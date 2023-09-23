import React, { useContext, useState } from 'react';
import './register-page.style.scss';
import FormInput from '../../components/form-input/form-input.somponent';
import { useNavigate } from 'react-router-dom';
import { addImageToStorage, createUserDoc, createUserEmailPasswordMethod, googlePopupSignIn } from '../../lib/utils/firebase.utils';
import { validateEmail, validatePassword } from '../../lib/utils/utils';
import { StyleContext } from '../../context/style-context';
import { PropagateLoader } from 'react-spinners';

function RegisterPage() {
    const navigate = useNavigate();

    const { loading } = useContext(StyleContext);

    const defaultFormFields = {
        email: '',
        name: '',
        password: '',
    };

    const defaultFormErrors = {
        email: '',
        name: '',
        password: '',
        image: ''
    };

    const [formInputs, setFormInputs] = useState(defaultFormFields);

    const [formErrors, setFormErrors] = useState(defaultFormErrors);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormInputs({ ...formInputs, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const image = e.target.form[3].files[0];

        const validationErrors = {};

        if(!formInputs.name.trim()) {
            validationErrors.name = 'Name is required';
        }

        if(!formInputs.email.trim()) {
            validationErrors.email = 'Email is required';
        }
        else if(!validateEmail(formInputs.email.trim())) {
            validationErrors.email = 'Email is badly formatted';
        }

        if(!formInputs.password.trim()) {
            validationErrors.password = 'Password is required';
        }
        else if(!validatePassword(formInputs.password.trim())) {
            validationErrors.password = 'Must contain at least one number, one uppercase, lowercase character and at least 8 or more characters';
        }

        if(image === null || image === undefined) {
            console.log(image);
            validationErrors.image = '*No file selected';
        }
        else if(image.size > 1000000) {
            validationErrors.image = '*Please select a file less than 1MB';
        }

        if(Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        if(Object.keys(validationErrors).length === 0) {
            setFormErrors(defaultFormErrors);

            try {
                const { user } = await createUserEmailPasswordMethod(formInputs.email, formInputs.password);

                await addImageToStorage(image, formInputs.name, user);
            }
            catch(err) {
                if(err.code === 'auth/email-already-in-use') {
                    validationErrors.email = 'Email already in use!';
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

                    <button type='button' className='signup-button google' onClick={googleSignInHandler}>
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
                        errorText={formErrors.email} 
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
                        errorText={formErrors.password} 
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
                        errorText={formErrors.name} 
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
                        labelText='Add a profile photo' 
                        inputType='image' 
                        errorText={formErrors.image} 
                        inputOptions={{
                            type: 'file',
                            id: 'image',
                            name: 'image',
                        }}
                    />

                    {!loading ? 
                    <button className='submit-button' type='submit' onClick={submitHandler}>
                        Sign up
                    </button> : 
                    <div className="loader">
                        <PropagateLoader color="#1DB954" />
                    </div>}

                    <div className="go-to-login">
                        <h1>Have an account? <span onClick={goToLogin}>Log in</span>.</h1>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;
