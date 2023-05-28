import * as React from 'react';
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {Container} from 'react-bootstrap';
import {Header} from './components/header';
import {Footer} from './components/footer';
import {HomeScreen} from "./screens/HomeScreen";
import {ProductScreen} from "./screens/ProductScreen";
import {NotFoundScreen} from "./screens/NotFoundScreen";
import {LoginScreen} from "./screens/LoginScreen";
import {RegisterScreen} from "./screens/RegisterScreen";
import {CartScreen} from "./screens/CartScreen";

import { Provider } from 'react-redux'
import { store } from './store'


interface Props {

}

interface State {

}

const App: React.FC = () => {
    return (
        <Router>
            <Header/>
            <main className="py-5 px-5" id="bootstrap-overrides" style={{backgroundColor: "#f8f9fa"}}>
                <Routes>
                    <Route path='/' element={<HomeScreen/>}/>
                    <Route path='/product/:name/:_id' element={<ProductScreen/>}/>
                    <Route path='*' element={<NotFoundScreen/>}/>
                    <Route path='/login' element={<LoginScreen/>}/>
                    <Route path='/register' element={<RegisterScreen/>}/>
                    <Route path='/cart/:_id?' element={<CartScreen/>}/>
                </Routes>
            </main>
            <Footer/>
        </Router>
    );
};


const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);

root.render(<Provider store={store}><App/></Provider>);