import React, {useState} from 'react';
import api from '../services/Api';

import '../assets/css/Login.css';

import logo from '../assets/images/logo.svg';

export default function Login(props){
    const [ usuario , setUsuario ]= useState('');

    async function handlerSubmit(e){
        // IMPEDE A PAGINA DE SER RECARREGADA PELO SUBMIT DO FORM
        e.preventDefault();

        const response = await api.post('/devs', {
            usuariogit: usuario,
        });

        const { _id } = response.data;

        props.history.push(`/dev/${_id}`);
    }

    return (
        <div className="login-container">
            <form onSubmit = {handlerSubmit}>
                <img src={logo} alt="Tindev" />
                <input  
                    placeholder="Digite seu usuario do GitHub"
                    value={usuario}
                    onChange={e => setUsuario(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
