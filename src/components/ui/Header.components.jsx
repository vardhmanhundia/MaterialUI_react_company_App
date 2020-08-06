import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
// import MenuIcon from '@material-ui/icons/MenuIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'; 

import  Logo from '../../assets/logo.svg';

const useStyles = makeStyles(theme => ({
    toolbarMargins: {
        ...theme.mixins.toolbar,
        marginBottom: "3em"
    },
    logo: {
        height: "8em"
    },
    logoContainer:{
        padding: 0,
        "$:hover": {
            backgroundColor: "transparent"
        }
    },
    tabContainer: {
        marginLeft: 'auto'
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: "25px"
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: "50px",
        marginLeft: "50px",
        marginRight: "25px",
        height: "45px"
    }
}));

function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}
export default function Header(props){
    const classes = useStyles();

    const [value, setValue] = useState(0);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    // const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    // <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} />

    const handleChange = (e, value) => {
        setValue(value);
    }

    const handleClick = e => {
        setAnchorEl(e.currentTarget);
        setOpen(true);
    }

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    }

    useEffect(() => {
        if(window.location.pathname === '/' && value!== 0){
            setValue(0);
        }else if(window.location.pathname === '/services' && value!==1){
            setValue(1);
        }else if(window.location.pathname === '/revolution' && value!==2){
            setValue(2);
        }else if(window.location.pathname === '/about' && value!==3){
            setValue(3);
        }else if(window.location.pathname === '/contact' && value!==4){
            setValue(4);
        }else if(window.location.pathname === '/estimate' && value!==5){
            setValue(5);
        }
    }, [value]);

    return (
        <>
            <ElevationScroll {...props} >
            <AppBar position='fixed' color="primary" >
                <Toolbar disableGutters>
                    <Button 
                        disableRipple
                        component={Link} 
                        to='/' 
                        className={classes.logoContainer}
                        onClick={() => setValue(0)}
                    >
                        <img src={Logo} className={classes.logo} alt="company logo" />
                    </Button>
                    <Tabs 
                        value={value} 
                        onChange={handleChange} 
                        className={classes.tabContainer}
                        indicatorColor= "primary"
                    >
                        <Tab className={classes.tab} component={Link} to='/' label="Home" />
                        <Tab 
                            aria-owns={anchorEl ? "simple-menu": undefined}
                            aria-haspopup = {anchorEl ? "true": "false"}
                            onClick={event => handleClick(event)}
                            className={classes.tab} 
                            component={Link} 
                            to='/services'  
                            label="Services" 
                        />
                        <Tab className={classes.tab} component={Link} to='/revolution'  label="The Revolution" />
                        <Tab className={classes.tab} component={Link} to='/about' label="About Us" />
                        <Tab className={classes.tab} component={Link} to='/contact' label="Contact Us" />
                    </Tabs>
                    <Button variant="contained" color="secondary" className={classes.button}>
                        Free Estimate
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{ onMouseLeave: handleClose }}
                    >
                        <MenuItem 
                            onClick={() => {handleClose(); setValue(1);} }
                            component={Link} 
                            to="/customsoftware"
                        >
                            Custom Software Development
                        </MenuItem>
                        <MenuItem 
                            onClick={() => {handleClose(); setValue(1);} }
                            component={Link} 
                            to="/mobileapps"
                        >
                            Mobile App Development
                        </MenuItem>
                        <MenuItem 
                            onClick={() => {handleClose(); setValue(1);} } 
                            component={Link} 
                            to="/websites"
                        >
                            Web Development
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargins} />
        </>
    );
}