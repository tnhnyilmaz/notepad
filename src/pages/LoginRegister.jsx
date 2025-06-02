import React, { useState } from 'react';
import FormInput from '../components/LoginRegister/FormInput';
import LoginForm from '../components/LoginRegister/LoginForm';
import RegisterForm from '../components/LoginRegister/RegisterForm';

const LoginRegister = () => {
    console.log("render login")
    const [keyword, setKeyword] = useState(false);
    return (
        <div className='w-full h-screen bg-notGrey5 flex items-center justify-center'>
            <div className='w-1/3 h-1/2 border border-notBlue rounded-md p-4 '>
                <div className='w-full h-1/6    flex font-semibold text-notWhite text-xl'>
                    <button
                        onClick={() => setKeyword(false)}
                        className={`w-1/2 h-full rounded-md transition-all duration-200 ${!keyword ? 'bg-notBlue' : 'bg-transparent'
                            } `}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setKeyword(true)}
                        className={`w-1/2 h-full rounded-md transition-all duration-200 ${keyword ? 'bg-notBlue' : 'bg-transparent'
                            }`}
                    >
                        Register
                    </button>
                </div>
                {
                    keyword ? <RegisterForm /> : <LoginForm />
                }

            </div>
        </div>
    )
}

export default LoginRegister