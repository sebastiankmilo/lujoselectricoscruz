import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Person, CameraAlt, ViewList, PlaylistAddCheck, ExitToApp } from '@material-ui/icons';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Link } from "react-router-dom";

import { useHistory } from "react-router";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}));



export default function SlideMenu() {
    const history = useHistory();
    const title = ''

    useEffect(() => {

        if (localStorage.getItem('user')) {

            console.log('user logged');
            history.push({
                pathname: "/perfiles"
            });
        } else {
            console.log('user dont exist');
            history.push({
                pathname: "/"
            });
        }
        /* 
                if (localStorage.title) {
                    title = localStorage.title
                } */

    }, []);

    const classes = useStyles();
    const [state, setState] = React.useState({ left: false });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

 

    const list = (anchor) => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>

                <ListItem button component={Link} to="/perfiles">
                    <ListItemIcon> <Person /> </ListItemIcon>
                    <ListItemText primary='Administrar Perfiles' />
                </ListItem>

                <ListItem button component={Link} to="/taco" >
                    <ListItemIcon><CameraAlt /> </ListItemIcon>
                    <ListItemText primary='Digitalizar Tacos' />
                </ListItem>

                {/*                 <ListItem button component={Link} to="/factura">
                    <ListItemIcon><ViewList /> </ListItemIcon>
                    <ListItemText primary='Subir Factura' />
                </ListItem> */}

                <ListItem button component={Link} to="/inventario">
                    <ListItemIcon><PlaylistAddCheck /> </ListItemIcon>
                    <ListItemText primary='Inventario' />
                </ListItem>


            </List>
            <Divider />
            <ListItem button component={Link}  to="/"   >
                <ListItemIcon><ExitToApp /> </ListItemIcon>
                <ListItemText onClick={localStorage.clear()} primary='Salir' />
            </ListItem>
        </div>
    );


    return (
        
        <div className="fixed-t">

            <AppBar position="static" className="">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <div className='text-center'> {/*  {localStorage.title}   */}</div>
                    </Typography>


                    <IconButton edge="start" onClick={toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>

                    <Drawer anchor='left' open={state['left']} onClose={toggleDrawer('left', false)}>
                        {list('left')}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
