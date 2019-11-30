import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Login from './views/Login/Login';
import Home from './views/Home/Home';
import Register from './views/Register/Register';

export default function Rotas(){
     return (
         <BrowserRouter>
            <Route path="/" exact component={Login}/>
            <Route path="/dev/:id" component={Home}/>
            <Route path="/register" component={Register}/>
         </BrowserRouter>
     );
}