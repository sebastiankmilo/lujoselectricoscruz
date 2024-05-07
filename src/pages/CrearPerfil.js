import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Avatar, Button, TextField, Select, MenuItem, InputLabel, Snackbar, makeStyles } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { SearchOutlined, VisibilityOffRounded, VisibilityRounded } from '@material-ui/icons';
import variables from '../environment'


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class CrearPerfil extends React.Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        // Initial state is defined
        console.log('props', props.location.aboutProps);
        this.dataProp = props.location.aboutProps ? props.location.aboutProps.data : null



        this.state = {
            id: '',
            cedula: '',
            nombre: '',
            edad: '',
            cargo: '',
            password: '',

            open: false,
            message: '',
            severity: '',
            props: this.dataProp,
            showPassword: false,

        };
        this._isMounted = false;

        this.createUsers = this.createUsers.bind(this)
        this.updateUser = this.updateUser.bind(this)

        this.handleCedula = this.handleCedula.bind(this)
        this.handleNombre = this.handleNombre.bind(this)
        this.handleEdad = this.handleEdad.bind(this)
        this.handleCargo = this.handleCargo.bind(this)
        this.handlePassword = this.handlePassword.bind(this)

    }


    handleCedula = (e) => {
        this.setState({ cedula: e.target.value });
    }
    handleNombre = (e) => {
        this.setState({ nombre: e.target.value });
    }
    handleEdad = (e) => {
        this.setState({ edad: e.target.value });
    }
    handleCargo = (e) => {
        this.setState({ cargo: e.target.value });
    }
    handlePassword = (e) => {
        this.setState({ password: e.target.value });
    }


    createUsers = () => {
        console.log(this.state.nombre);
        if (!this.state.cedula) {
            this.setState({ open: true, message: 'Ingresar cedula', severity: 'warning' })
            setTimeout(() => {
                this.setState({ open: false, message: '', severity: '' })
            }, 1000);
            return
        }
        if (!this.state.nombre) {
            this.setState({ open: true, message: 'Ingresa un nombre', severity: 'warning' })
            setTimeout(() => {
                this.setState({ open: false, message: '', severity: '' })
            }, 1000);
            return
        }

        if (!this.state.edad) {
            this.setState({ open: true, message: 'Ingresa una edad válida', severity: 'warning' })
            setTimeout(() => {
                this.setState({ open: false, message: '', severity: '' })
            }, 1000);
            return
        }
        if (!this.state.cargo) {
            this.setState({ open: true, message: 'Selecciona un cargo', severity: 'warning' })
            setTimeout(() => {
                this.setState({ open: false, message: '', severity: '' })
            }, 1000);
            return
        }

        if (!this.state.password) {
            this.setState({ open: true, message: 'Ingresa una contraseña', severity: 'warning' })
            setTimeout(() => {
                this.setState({ open: false, message: '', severity: '' })
            }, 1000);
            return
        }


        // console.log(data);
        fetch(variables.urlApi, {
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
                    "username": "admin",
                    "password": "1234567",
                    "model": "res.users",
                    "method": "create",
                    "options":
                    {
                        "login": this.state.nombre.slice(0, 5).toLocaleLowerCase() + '@lujos.com',
                        "name": this.state.nombre,
                        "cargo": this.state.cargo,
                        "edad": this.state.edad,
                        "cedula": this.state.cedula,
                        "password": this.state.password

                    }
                }
            ),
        })
            .then(response => response.json())
            .then(responseJson => {

                this.setState({
                    isLoaded: true,
                });

                window.location.href = '/perfiles'


            })
            .catch(error => {
                console.log(error);
            });
    }


    updateUser = () => {

        let data = {
            "id": this.state.id ? this.state.id : (this.dataProp != null ? this.dataProp.id : ''),
            "name": this.state.nombre ? this.state.nombre : (this.dataProp != null ? this.dataProp.name : ''),
            "cargo": this.state.cargo ? this.state.cargo : (this.dataProp != null ? this.dataProp.cargo : ''),
            "edad": this.state.edad ? this.state.edad : (this.dataProp != null ? this.dataProp.edad : ''),
            "cedula": this.state.cedula ? this.state.cedula : (this.dataProp != null ? this.dataProp.cedula : ''),
            "password": this.state.password ? this.state.password : (this.dataProp != null ? this.dataProp.password : '')
        }
        if (data.cargo.includes('admin')) {
            delete data.password
        }

        fetch(variables.urlApi, {
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
                    "username": "admin",
                    "password": "1234567",
                    "model": "res.users",
                    "method": "write",
                    "options":
                    {
                        "fields": data,
                        "ids": [data.id]
                    }
                }
            ),
        })
            .then(response => response.json())
            .then(responseJson => {

                this.setState({
                    isLoaded: true,
                });

                window.location.href = '/perfiles'

            })
            .catch(error => {
                console.log(error);
            });
    }


    render() {

        const style = {
            width: '70px',
            height: '70px'
        };
        const { id, image_small, login, name } = this.dataProp || ''

        const handleClickShowPassword = () => {
            console.log(this.state.showPassword);
            this.setState({ showPassword: !this.state.showPassword ? true : false });
        };

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };

        return (

            <div className="container-fluid mt-5">
                <br></br>


                {/* EDITAR PERFIL */}

                <div className='row mt-5'>

                    <div className='col-* mx-auto'>
                        <Avatar src={`data:image/jpg;base64,${this.dataProp ? this.dataProp.image_small : ''}  `} style={style} />
                    </div>

                    <div className='col-12 d-flex mt-4'>
                        <TextField id="outlined-basic" type="number" className='m-1 col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' label="Cédula" onChange={this.handleCedula}
                            defaultValue={this.dataProp != null ? this.dataProp.cedula : ''} variant="filled" />
                    </div>
                    <div className='col-12 d-flex'>
                        <TextField id="outlined-basic" className='m-1 col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' label="Nombre" onChange={this.handleNombre} defaultValue={this.dataProp != null ? this.dataProp.name : ''} variant="filled" />
                    </div>
                    <div className='col-12 d-flex'>
                        <TextField id="outlined-basic" type="number" className='m-1 col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' label="Edad" onChange={this.handleEdad}
                            defaultValue={this.dataProp != null ? this.dataProp.edad : ''}
                            variant="filled" />
                    </div>


                    <div className='col-12 mt-2 '>
                        <InputLabel className='col-11 col-sm-10 col-md-6 col-lg-6 mx-auto' id="demo-controlled-open-select-label">Cargo</InputLabel>

                        <Select placeholder="Seleccionar" onChange={this.handleCargo} disabled={this.dataProp != null ? this.dataProp.cargo.includes('admin') : false} className='col-12 col-sm-10 col-md-6 col-lg-6 mx-auto d-block'
                            defaultValue={this.dataProp != null ? this.dataProp.cargo : ''}
                        >
                            <MenuItem >Seleccionar</MenuItem>
                            <MenuItem selected value="admin">Administrador</MenuItem>
                            <MenuItem value="vendedor">Vendedor</MenuItem>
                        </Select>
                    </div>


                    <div className='col-12 d-flex'>
                        <TextField id="outlined-basic"
                            type={this.state.showPassword ? "text" : 'password'}
                            className='m-1 col-auto col-sm-10 col-md-6 col-lg-6 mx-auto'
                            label="Contraseña" onChange={this.handlePassword}
                            defaultValue={this.dataProp != null ? this.dataProp.password : ''}
                            InputProps={{
                                endAdornment: (
                                    <IconButton onClick={handleClickShowPassword}>
                                        {!this.state.showPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}

                                    </IconButton>
                                ),
                            }}
                            variant="filled" />
                    </div>



                </div>





                <div className='row'>
                    <div className='col-* mx-auto'>

                        {this.state.props != null ?
                            <div>
                                <Button variant="contained" className='mt-2  mr-1' color="secondary" component={Link} to="/perfiles">
                                    volver
                                </Button>
                                <Button variant="contained" className='mt-2 ' onClick={this.updateUser} color="secondary" component={Link} >
                                    Actualizar
                                </Button>

                            </div>
                            :

                            <Button variant="contained" className='mt-2' onClick={this.createUsers} color="secondary" >
                                Crear
                            </Button>
                        }
                    </div>

                </div>

                <Snackbar
                    severity="success"
                    open={this.state.open}
                    message={this.state.message}
                >
                    <Alert severity={this.state.severity}>
                        {this.state.message}
                    </Alert>
                </Snackbar>

            </div >
        );
    }

}


export default CrearPerfil;