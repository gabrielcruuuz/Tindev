import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/Api';

import './Login.css';

import logo from '../../assets/images/logo.svg';

export default function Login(props){
    const [ email , setEmail ]= useState('');

    async function handlerSubmit(e){
        // IMPEDE A PAGINA DE SER RECARREGADA PELO SUBMIT DO FORM
        e.preventDefault();

        const response = await api.post('/login', {
            emailUsuario: email,
        });

        const { _id } = response.data;

        props.history.push(`/dev/${_id}`);
    }

    return (
        <div className="login-container">
            <img src={logo} alt="Tindev" />
            <div className="login-terceiros">
                <a className="btn-facebook"> Entrar com Facebook</a>
                <a className="btn-github">Entrar com GitHub</a>
            </div>

            <div className="divider">
                <strong>ou</strong>
            </div>

            <form onSubmit = {handlerSubmit}>
                <input  
                    placeholder="Digite seu email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>

            <span>Ainda não tem conta?
                <Link to="/register"> Registre-se</Link>
            </span>
        </div>
    );
}
