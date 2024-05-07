import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SlideMenu from '../ui/slideMenu';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import carImg from '../img/car.png'
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

Inicio.propTypes = {

};


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));


function Inicio(props) {
    const classes = useStyles();
    const history = useHistory();


    useEffect(() => {

        if (localStorage.getItem('user')) {
            console.log('user logged inicio');
            history.push({
                pathname: "/perfiles"
            });
        } else {
            console.log('user dont exist inicio');
            history.push({
                pathname: "/"
            });
        }

    }, []);

    return (
        <div className="container-fluid">

            <div className='row mt-5'>
                <div className='col-12  d-flex mb-4 mt-5'>
                    <img src={carImg} className='mx-auto' height='200' width='200' alt='' />

                </div>
                <div className='col-12 text-center mb-3' >
                    <h3 color="secondary">Lujos Eléctricos Cruz</h3>
                </div>
                <div className='col-12  d-flex'>
                    <Button variant="contained" className='mx-auto' color="secondary" component={Link} to="/login">
                        Iniciar Sesión
                    </Button>
                </div>
            </div>
        </div >
    );
}

export default Inicio;