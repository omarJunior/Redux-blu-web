import React from 'react';
import './index.css';
import App from './App';
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import generateStore from './redux/store';

const rootElement = document.getElementById("root");
const store = generateStore()

const root = ReactDOMClient.createRoot(rootElement);
root.render(
    <Provider store={store}>
        <App callback={() => console.log("Renderizado el app")} />
    </Provider>
);
