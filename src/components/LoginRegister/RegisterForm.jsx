import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from './FormInput';


const RegisterForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                await updateProfile(auth.currentUser, {
                    displayName: fullName,
                });
                navigate("/Home")
            })
            .catch((err) => {
                setError(err.message);
                const errCode = err.errCode

                const errMessage = err.errMessage
                console.log("errCode:", errCode)
                console.log("errMessage:", errMessage)
            });
    }
    return (
        <div className=' '>
            <FormInput id={"fullName"} type={"text"} value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={"Tunahan Yılmaz"} label={"Full Name"} />

            <FormInput id={"email"} label={"Email"} value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={"example@mail.com"} type={"email"} />
            <FormInput id={"password"} type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={"*******"} label={"Password"} />
            <div className='py-2'></div>
            <button onClick={handleSubmit} className='font-semibold text-xl text-notWhite w-full h-12 rounded-md bg-notBlue'>
                Register
            </button>
        </div>
    )
}

export default RegisterForm