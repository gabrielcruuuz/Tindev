import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

import api from '../../services/Api';
import './Login.css';
import logo from '../../assets/images/logo.svg';

export default function Login(props){

    const [ email , setEmail ]= useState('');
    const [ senha , setSenha ]= useState('');
    const [ errorLogin , setErrorLogin ]= useState('');

    async function handlerSubmit(e){
        e.preventDefault();

        try{
            const response = await api.post('/login', {
                emailUsuario: email,
                senhaUsuario: senha,
            });

            console.log(response.data);

            const { _id } = response.data;
    
            props.history.push(`/dev/${_id}`);
        }
        catch (error){
            const {mensagem} = error.response.data;
            setErrorLogin(mensagem);
        }        
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
                <TextField
                    required  
                    placeholder="Digite seu email"
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    required  
                    placeholder="senha"
                    type="password"
                    name="senha"
                    required
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />
                <span>{errorLogin}</span>
                <button type="submit">Entrar</button>
            </form>

            <span>Ainda não tem conta?
                <Link to="/register"> Cadastre-se</Link>
            </span>
        </div>
    );
}
