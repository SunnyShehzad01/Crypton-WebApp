import { AppBar, Avatar, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, Box, Select, createTheme } from '@mui/material'
import AdbIcon from '@mui/icons-material/Adb';
import React from 'react'
import { ThemeProvider } from 'styled-components';
import { CryptoState } from '../Context'

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const {currency, setCurrency} = CryptoState()
    console.log(currency);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff"
            },
            type: "dark"
        }
    })

  return (
    <div>
    <ThemeProvider theme={darkTheme}> 
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, cursor:'pointer' }} />
                    <Typography 
                        variant='h6' 
                        noWrap
                        flex={1}
                        href='/'
                        sx={{
                            fontWeight: '700',
                            letterSpacing: '0.2rem',
                            textDecoration: 'none',
                            color: 'inherit',
                            fontFamily: 'monospace',
                            display: { xs: 'none', md: 'flex' },
                            cursor: 'pointer'
                        }}
                    >
                        CRYPTON
                    </Typography>

                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        CRYPTON
                    </Typography>
                    
                    
                    <Select 
                        variant='outlined'
                            sx={{
                                width: 100,
                                marginRight: 5,
                                color: 'white'
                            }}
                            value={currency}
                            onChange={(e)=> setCurrency(e.target.value)}
                    >
                        <MenuItem value={'USD'}>USD</MenuItem>
                        <MenuItem value={'INR'}>INR</MenuItem>
                    </Select>
                    

                    {/* <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                        </Tooltip>
                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box> */}
                </Toolbar>
            </Container>
        </AppBar>
    </ThemeProvider>   
    </div>
  )
}

export default Navbar