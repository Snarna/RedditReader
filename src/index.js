import 'babel-polyfill'
import "bootstrap/dist/css/bootstrap.css";

import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'

ReactDOM.render(
    <Root />, 
    document.getElementById('root')
);