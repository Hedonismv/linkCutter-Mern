import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

const AuthPage = () => {
    const auth = useContext(AuthContext)
    const [form, setForm] = useState({email:'', password: ''})
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    },[])

    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const registerHandler = async () => {
        try{
            const data = await request('http://localhost:4000/api/auth/register', 'POST', {...form})
            message(data.message)
            console.log('data', data)
        }catch (e){
            console.log(e)
        }
    }

    const loginHandler = async () => {
        try{
            const data = await request('http://localhost:4000/api/auth/login', 'POST', {...form})
            message(data.message)
            auth.login(data.token, data.userId)
        }catch (e){
            console.log(e)
        }
    }


    return (
        <div className={'row'}>
            <div className={'col s6 offset-s3'}>
                <h1>Cut the Link</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Login</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="Enter Email" id="email" type="text" name={'email'} className="validate" onChange={changeHandler} value={form.email}/>
                                    <label htmlFor="first_name">E-mail</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Enter the password" id="password" name={'password'} type="password" className="validate" onChange={changeHandler} value={form.password}/>
                                    <label htmlFor="first_name">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className={'btn yellow darken-4'} style={{marginRight: 10}} onClick={loginHandler} disabled={loading}>Login</button>
                        <button className={'btn grey white black-text'} onClick={registerHandler} disabled={loading}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;