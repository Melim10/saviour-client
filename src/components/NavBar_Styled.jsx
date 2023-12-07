import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/auth.context';

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const { isLoggedIn, user, logOut} = useContext(AuthContext);
  const navigate = useNavigate();

  const goTo = (x) => {
    navigate(x)
}

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };


  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className='nav'  style={{display: "flex", flexDirection: "row", justifyContent:"space-between" , alignItems: "center"}} >
          <Typography component="h1" variant="h4" className='nav-title'>Saviour!</Typography>
          <Toolbar >
          
            <div style={{display: "flex",}}>
            {isLoggedIn && (
              <div>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleMenu2}
              >
                <MenuIcon />
              </IconButton>
              
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl2}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
              >
                <MenuItem onClick={() => { handleClose2(); goTo('/homepage'); }}>
                  All Questions
                </MenuItem>
                <MenuItem onClick={() => { handleClose2(); goTo('/my-questions'); }}>
                  My Questions
                </MenuItem>
                <MenuItem onClick={() => { handleClose2(); goTo('/rankings'); }}>
                  Members
                </MenuItem>
              </Menu>
              </div>)}

              {isLoggedIn && (
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => { handleClose(); goTo(`/users/${user._id}`); }}>Profile</MenuItem>
                    <MenuItem onClick={() => { handleClose(); logOut(); }}>Logout</MenuItem>
                  </Menu>
                </div>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </Box>
  );
}