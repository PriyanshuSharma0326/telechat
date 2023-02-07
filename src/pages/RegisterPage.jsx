import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SocialLinks from '../components/SocialLinks';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import { auth, db, storage } from '../lib/config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function RegisterPage() {
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
    
            const storageRef = ref(storage, `${displayName}`);
    
            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL
                        });

                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid, 
                            displayName, 
                            email, 
                            photoURL: downloadURL,
                        });
                        
                        await setDoc(doc(db, "userChats", res.user.uid), {
                            // uid: res.user.uid, 
                            // displayName, 
                            // email, 
                            // photoURL: downloadURL,
                        });

                        navigate('/');
                    }
                    catch (error) {
                        setError(true);
                    }
                });
            });
        }
        catch (error) {
            setError(true);
        }
    }

    return (
        <RegisterPageContainer>
            <RegisterFormWrapper>
                <RegisterForm onSubmit={handleSubmit}>
                    {/* <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png' alt='logo' /> */}
                    <h1>Telechat</h1>

                    <h2>Sign up. Its FREE!</h2>

                    <input placeholder='Full Name' type='text' />

                    <input placeholder='Email' type='email' />

                    <input placeholder='Password' type='password' />

                    <input type='file' id='fileUpload' />

                    <label htmlFor='fileUpload'>
                        <AddPhotoAlternateIcon />
                        <h4>Add an avatar</h4>
                    </label>

                    <button>Sign up</button>

                    {error && <span>Something went wrong!</span>}
                </RegisterForm>

                <LoginBox>
                    <h4>Have an account? <span onClick={() => {navigate('/');}}>Log in</span></h4>
                </LoginBox>

                <SocialLinks />
            </RegisterFormWrapper>
        </RegisterPageContainer>
    );
}

const RegisterPageContainer = styled.div`
    display: flex;
    height: 100vh;
    background-color: #128C7E;
`;

const RegisterFormWrapper = styled.div`
    margin: auto;
`;

const RegisterForm = styled.form`
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
        padding: 25px 0 20px 0;
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

    > label {
        cursor: pointer;
        display: flex;
        align-items: center;
        width: fit-content;
        margin-left: 40px;
        padding: 8px 0 5px 0;

        > .MuiSvgIcon-root {
            color: #128C7E;
        }

        > h4 {
            font-size: 12px;
            font-weight: 500;
            color: #128C7E;
            margin-left: 5px;
        }

        :hover {
           opacity: 0.8;
        }
    }

    #fileUpload {
        display: none;
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

    > h2 {
        display: block;
        text-align: center;
        color: rgb(142, 142, 142);
        font-size: 17px;
        font-weight: 600;
        font-family: var(--profile-font);
        line-height: 20px;
        margin: 0 40px 10px;
        padding: 5px 0;
    }
`;

const LoginBox = styled.div`
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

        > span {
            color: #128C7E;
            cursor: pointer;
            text-decoration: none;
        }
    }
`;
