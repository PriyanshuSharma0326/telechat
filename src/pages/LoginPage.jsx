import React, { useState } from 'react';
import styled from 'styled-components';
import SocialLinks from '../components/SocialLinks';

import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/config/firebase';

export default function LoginPage() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
           await signInWithEmailAndPassword(auth, email, password);
           navigate("/");
        }
        catch (error) {
            setError(true);
            setLoading(false);
        }
    }

    return (
        <LoginPageContainer>
            <LoginFormWrapper>
                <LoginForm onSubmit={handleSubmit}>
                    <h1>Telechat</h1>

                    <input placeholder='Email' type='email' />

                    <input placeholder='Password' type='password' />

                    <button>Log in</button>

                    {loading && <span className='loading'>Please wait...</span>}
                    {error && <span>Something went wrong!</span>}
                </LoginForm>

                <SignUpBox>
                    <h4>Don't have an account? <Link className='register-link' to='/register'><span>Register</span></Link></h4>
                </SignUpBox>

                <SocialLinks />
            </LoginFormWrapper>
        </LoginPageContainer>
    );
}

const LoginPageContainer = styled.div`
    display: flex;
    height: 100vh;
    background-color: #128C7E;
`;

const LoginFormWrapper = styled.div`
    margin: auto;
`;

const LoginForm = styled.form`
    margin: auto;
    width: 348px;
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 8px;

    > h1 {
        display: block;
        margin: 0 auto;
        text-align: center;
        font-family: var(--var-font);
        font-size: 40px;
        cursor: pointer;
        padding: 25px 0;
        color: #128C7E;
    }

    > input {
        display: block;
        height: 36px;
        outline: none;
        border: 1px solid lightgray;
        background-color: rgb(250, 250, 250);
        border-radius: 3px;
        width: 254px;
        margin: 0 auto;
        margin-bottom: 5px;
        padding-left: 10px;

        ::placeholder {
            font-size: 12px;
            font-family: var(--profile-font);
        }
    }

    > button {
        display: block;
        outline: none;
        border: none;
        width: 268px;
        height: 32px;
        font-size: 14px;
        font-weight: 600;
        border-radius: 8px;
        font-family: var(--profile-font);
        background-color: #128C7E;
        color: white;
        margin: 15px auto;

        :hover {
            background-color: #075E54;
            cursor: pointer;
        }
    }

    > span {
        width: fit-content;
        display: block;
        font-size: 14px;
        font-weight: 600;
        margin: 15px auto;
        color: red;
    }

    .loading {
        color: #128C7E;
    }
`;

const SignUpBox = styled.div`
    display: flex;
    margin-top: 10px;
    width: 348px;
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 8px;
    padding: 20px 0;

    > h4 {
        color: rgb(38, 38, 38);
        font-size: 14px;
        font-weight: 400;
        margin: 0 auto;

        > .register-link {
            text-decoration: none;
            
            > span {
                color: #128C7E;
                font-weight: 600;
                cursor: pointer;
            }
        }
    }
`;
