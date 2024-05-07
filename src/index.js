import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

import SlideMenu from './ui/slideMenu';

import Taco from './pages/taco';
import CrearPerfil from './pages/CrearPerfil';
import Factura from './pages/Factura';
import Inicio from './pages/Inicio';
import Inventario from './pages/Inventario';
import Login from './pages/Login';
import Perfiles from './pages/Perfiles';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';


const theme = createTheme({

  palette: {
    primary: {
      light: '#fff',
      main: '#f44336',
      dark: '#000'
    },
    secondary: {
      main: '#560600',
    },

  },
  typography: {
    useNextVariants: true
  }
});



ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>

      <Router>
        <SlideMenu />

        <Switch>
          <Route exact path="/" component={Inicio} />

          <Route exact path="/login" component={Login} />

          <Route exact path="/taco" component={Taco} />

          <Route exact path="/perfiles" component={Perfiles} />

          <Route exact path="/factura" component={Factura} />

          <Route exact path="/inventario" component={Inventario} />

          <Route exact path="/crearPerfil" component={CrearPerfil} />


        </Switch>
      </Router>
    </MuiThemeProvider>

  </React.StrictMode>,
  document.getElementById('root')

);


serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
