import React from 'react';
import { render } from 'react-dom';
import './index.css'

import  App  from './App/App';

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

render(
    <App />,
    document.getElementById('app')
);