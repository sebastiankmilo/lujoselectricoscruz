import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Link } from "react-router-dom";
import { Avatar, Button, TextField, Select, MenuItem, InputLabel } from '@material-ui/core';
import variables from '../environment'

class Inventario extends React.Component {



    constructor(props) {
        super(props);
        // Initial state is defined
        this.state = {
            isLoaded: false,
            buscando: false,
            error: false,
            allProductos: [],
            productos: [],
        };

    }


    getInventario() {

        fetch(variables.urlApi, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "host": "127.0.0.1",
                "port": 9000,
                "database": "lujosec",
                "username": "admin",
                "password": "1234567",
                "model": "product.product",
                "method": "search_read",
                "options": {
                    "fields": ["id", "default_code", "name", "standard_price", "qty_available", "image_small", "write_date"],
                    "domain": []
                }
            }),
        })
            .then(response => response.json())
            .then(responseJson => {


                this.setState({
                    isLoaded: true,
                    allProductos: responseJson.response,
                    productos: responseJson.response
                });



            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: true,
                    isLoaded: true,

                });
            });


    }

    componentDidMount() {
        localStorage.title = 'Inventario'

        setTimeout(() => {
            this.getInventario()
        }, 500);
    }

    render() {

        const { productos } = this.state;
        const { buscando } = this.state;


        const handleBuscar = (e) => {

            let filterby = document.getElementById("selectBuscar").innerText
            let query = document.getElementById("query").value
            console.log(filterby.length);

            if (filterby.length < 2 ) {
                console.log("filtro vacio");
                document.getElementById("query").value = ""
            }

            if (query.length > 2) {
                console.log('filtrando ');
                console.log(filterby);
                console.log(query);



                var lowSearch = query.toLowerCase();

                if (filterby === "Nombre") {
                    console.log(query.length, 'filtrando por nombre');

                    let filtered = this.state.allProductos.filter(function (currentElement) {
                        if (currentElement.name.toLowerCase().includes(lowSearch)) {
                            return currentElement
                        }
                    });
                    // console.log(filtered);
                    setTimeout(() => {
                        this.setState({
                            productos: filtered
                        });

                    }, 100);
                }

                if (filterby === "Codigo") {
                    console.log(query.length, 'filtrando por codigo');

                    let filtered = this.state.allProductos.filter(function (currentElement) {
                        if (currentElement.default_code.includes(lowSearch)) {
                            return currentElement
                        }
                    });
                    // console.log(filtered);
                    setTimeout(() => {
                        this.setState({
                            productos: filtered
                        });

                    }, 100);
                }



            } else {
                console.log('reseteando');

                this.setState({
                    productos: this.state.allProductos
                });
            }

        }

        if (!this.state.isLoaded) {
            return (<div className="container-fluid mt-5">
                <br></br>
                <br></br>
                <br></br>
                <div className='text-center' >Loading ... </div>
            </div>

            )

        } else {
            if (this.state.error) {
                return (<div className="container-fluid mt-5">
                    <br></br>
                    <br></br>
                    <div className='text-center' >Error de conexion ... </div>
                </div>
                )
            }

            return (

                <div className="container-fluid mt-5">
                    <br></br>

                    <div className='col-12 mt-2 '>
                        <InputLabel className='col-11 col-sm-10 col-md-6 col-lg-6 mx-auto' id="demo-controlled-open-select-label">Buscar por:</InputLabel>

                        <Select placeholder="Seleccionar" id="selectBuscar" className='col-12 col-sm-10 col-md-6 col-lg-6 mx-auto d-block'>
                            <MenuItem >Seleccionar</MenuItem>
                            <MenuItem selected value="codigo">Codigo</MenuItem>
                            <MenuItem value="nombre">Nombre</MenuItem>
                        </Select>
                    </div>

                    <div className='col-12 d-flex mt-4'>
                        <TextField id="query" autoComplete="off" className='m-1 col-9 mr-1 mx-auto' label="Buscar" variant="filled" />
                        <Button variant="contained" onClick={handleBuscar} className='mt-2 ' color="secondary"  >
                            Buscar
                        </Button>

                    </div>


                    <br></br>
                    <div>
                        {productos.map(item =>

                            <List >
                                <ListItem button>
                                    <ListItemAvatar>
                                        <Avatar alt={item.name} loading="lazy" src={`data:image/jpg;base64,${item ? item.image_small : ''} `} />
                                    </ListItemAvatar>
                                    {/*  <ListItemText primary={item.default_code} secondary={item.name} /> */}
                                    <ul>
                                        <li> <h5> Código: {item.default_code}</h5>  </li>
                                        <li> <strong>Nombre: </strong> {item.name} </li>
                                        <li> <strong>Stock: </strong> {item.qty_available} </li>
                                        <li> <strong>Fecha Compra: </strong>{item.write_date} </li>
                                        <li> <strong> Precio: </strong>$ {item.standard_price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} </li>
                                    </ul>
                                </ListItem>
                            </List>

                        )}
                    </div>

                </div>

            )
        }

    }
}

export default Inventario