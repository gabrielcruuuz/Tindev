import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';

export default function Rotas(){
     return (
         <BrowserRouter>
            <Route path="/" exact component={Login}/>
            <Route path="/dev/:id" component={Home}/>
         </BrowserRouter>
     );
}