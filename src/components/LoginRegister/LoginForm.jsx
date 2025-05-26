import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../redux/firebaseConfig';
import FormInput from './FormInput';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr('');
        try {
            if (isRegister) {
                await createUserWithEmailAndPassword(auth, email, password);
                alert('Kayıt başarılı');
            } else {
                console.log("email", email)
                console.log("password", password)
                await signInWithEmailAndPassword(auth, email, password);
                navigate("/Home")
            }
        } catch (error) {
            console.error("Firebase Error:", error);
            setErr(error.code + ": " + error.message); // .code daha anlamlı olur
        }

    };

    return (
        <div className='pt-10'>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <FormInput
                    id="email"
                    label="Email"
                    placeholder="example@mail.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <FormInput
                    id="password"
                    type="password"
                    placeholder="*******"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {err && <div className='text-red-500 text-sm'>{err}</div>}

                <div className='py-2'></div>
                <div>
                    <button
                        type='submit'
                        className='font-semibold text-xl text-notWhite w-full h-12 rounded-md bg-notBlue'
                    >
                        {isRegister ? 'Kayıt Ol' : 'Giriş Yap'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm