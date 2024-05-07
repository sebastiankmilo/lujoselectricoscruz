import React, { Component, useState } from 'react';
import { TextField, Button, Snackbar, makeStyles } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from "react-router-dom";
import axios from 'axios';
import { withRouter } from "react-router";
import PropTypes from "prop-types";
//import { RequestManager, HTTPTransport, Client } from "@open-rpc/client-js";
import variables from '../environment'



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Login extends React.Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        // Initial state is defined
        this.state = {
            cedula: '',
            pass: '',
            open: false,
            message: '',
            severity: ''
        };
        this._isMounted = false;


        this.doAuth = this.doAuth.bind(this)
        this.handleCedulaChange = this.handleCedulaChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    handleCedulaChange(e) {
        this.setState({ cedula: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ pass: e.target.value });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    //metodo anterior ya no funciona
    doAuth() {
        // "login": "admin",
        // "password": "1234567",

        console.log("EMail: " + this.state.cedula);
        console.log("Password: " + this.state.pass);

        let data = {
            "json-rpc": "2.0",
            "method": "call",
            "params":
            {
                "db": "lujosec",
                "login": this.state.cedula,
                "password": this.state.pass,
                "context": {}
            },
            "id": 10
        }

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
            axios.post(`https://lujoselectricoscruz.sticol.com.co:443/web/session/authenticate`, data, { headers })
                .then(res => {
                    console.log(res);
                    localStorage.setItem('user', JSON.stringify(res.data.result))
                    if (!res.data.error) {
                        this.setState({ open: true, message: 'Iniciando Sesión...', severity: 'success' })
                        setTimeout(() => {
                            this.setState({ open: false })
                            this.props.history.push('/perfiles')

                        }, 1500);
                    } else {
                        this.setState({ open: true, message: 'Error,  Revisa tus credenciales!.', severity: 'warning' })

                        setTimeout(() => {
                            this.setState({ open: false })
                        }, 3000);
                    }

                }).catch((e) => {
                    console.log(e);

                })


        } catch (error) {
            console.error(error)

        }

    }

    //Nuevo metodo de login
    doLogin = () => {

        fetch(variables.urlLogin, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    "host": "127.0.0.1",
                    "port": 9000,
                    "database": "lujosec",
                    "username": this.state.cedula,
                    "password": this.state.pass,
                    "model": "res.users",
                    "method": "search_read",
                    "options": {
                        "fields": [],
                        "domain": []
                    }
                }
            ),
        })
            .then(response => response.json())
            .then(responseJson => {

                if (responseJson.message.includes('200')) {

                    localStorage.setItem('user', JSON.stringify(responseJson))

                    this.setState({ open: true, message: 'Iniciando Sesión...', severity: 'success' })
                    setTimeout(() => {
                        this.setState({ open: false })
                        this.props.history.push('/perfiles')
                    }, 1500);
                } else {
                    this.setState({ open: true, message: 'Error,  Revisa tus credenciales!.', severity: 'warning' })

                    setTimeout(() => {
                        this.setState({ open: false })
                    }, 3000);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    // "password": " 1234567   ",

    render() {
        //const { match, location, history } = this.props;

        return (
            <div className="container-fluid mt-5" >
                <form>

                    <div className='row  mt-5'  >
                        <div className='col-12  mx-auto text-center mt-5'>
                            <h2> Iniciar Sesión</h2>

                        </div>
                        <div className='col-12  d-flex'>
                            <TextField id="outlined-basic" className='m-1 mx-auto' label="Usuario" variant="filled" value={this.state.cedula} onChange={this.handleCedulaChange} />
                        </div>
                        <div className='col-12 d-flex'>
                            <TextField id="outlined-basic" className='m-1 mx-auto' label="Contraseña" variant="filled" value={this.state.pass} onChange={this.handlePasswordChange} />
                        </div>

                    </div>

                    <div className='row'>
                        <div className='col-* mx-auto'>
                            <Button variant="contained" className='mt-2 ' color="secondary" onClick={this.doLogin}>
                                Ingresar
                            </Button>
                        </div>

                        <br></br>


                    </div>

                </form>

                <Snackbar
                    severity="success"
                    open={this.state.open}
                    message={this.state.message}
                >
                    <Alert severity={this.state.severity}>
                        {this.state.message}
                    </Alert>
                </Snackbar>

            </div>
        );
    }
}

Login.propTypes = {

};

export default Login;
