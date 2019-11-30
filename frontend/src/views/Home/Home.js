import React, {useEffect , useState} from 'react';
import io from 'socket.io-client';
import api from '../../services/Api';
import {Link} from 'react-router-dom';

import './Index.css';
import logo from '../../assets/images/logo.svg';
import like from '../../assets/images/like.svg';
import dislike from '../../assets/images/dislike.svg';
import itsamatch from '../../assets/images/itsamatch.png';

export default function Index(props){ 
    const _id = props.match.params.id
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [matchDev, setmatchDev] = useState(null);

    // TODA VEZ QUE A VARIAVEL DENTRO DO ARRAY NO 2 PARAMETRO FOR ALTERADA, 
    // EXECUTA A ARROW FUNCTION
    useEffect(() => {
        async function carregarLista(){
            const response = await api.get('/devs', {
                headers: {
                    idusuariologado: _id,
                }
            })
            setListaUsuarios(response.data);
        }
        carregarLista();
    }, [_id])

    useEffect(() => {
        const socket = io(process.env.REACT_APP_API_URL, {
            query: {idusuario : _id}
        });

        socket.on('match', dev => {
            setmatchDev(dev);
        });
      
    }, [_id])

    async function handleLike(idTargetLike){
        await api.post(`/devs/${idTargetLike}/likes`, null, {
            headers: {idusuariologado: _id},
        })

        // ATUALIZANDO A LISTA LOGO APOS A ACAO DE DISLIKE/LIKE
        setListaUsuarios(listaUsuarios.filter(usuario => usuario._id != idTargetLike));
    }

    async function handleDislike(idTargetDislike){
        await api.post(`/devs/${idTargetDislike}/dislikes`, null, {
            headers: {idusuariologado: _id},
        });
        // ATUALIZANDO A LISTA LOGO APOS A ACAO DE DISLIKE/LIKE
        setListaUsuarios(listaUsuarios.filter(usuario => usuario._id != idTargetDislike));
    }

    return (
        <div className="index-container">
            <Link to="/">
                <img src={logo} alt="Tindev" />
            </Link>
                {listaUsuarios.length > 0 ? (
                <ul>
                    {listaUsuarios.map(usuario => (
                        <li key={usuario._id}>
                            <img src={usuario.avatar} alt=""></img>
                            <footer>
                                <strong>{usuario.nome}</strong>
                                <p>{usuario.bio}</p>
                            </footer>
    
                            <div className="buttons">
                                <button type="button" onClick={() => handleDislike(usuario._id)}>
                                    <img src={dislike} />
                                </button>
                                <button type="button" onClick={() => handleLike(usuario._id)}>
                                    <img src={like} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                ) : (
                    <div className="empty">Você zerou o tinder xD</div>
                )}

                {matchDev && (
                    <div className="match-container">
                        <img src={itsamatch} />
                        <img className="avatar-match" src={matchDev.avatar} alt=""></img>
                        <strong>{matchDev.nome}</strong>
                        <p>{matchDev.bio}</p>
                        <button type="button" onClick={() => setmatchDev(null)}>Fechar</button>
                    </div>
                )}
        </div>
    );
}