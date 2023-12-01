import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import './headings.css'
import Carousel from './Carousel'

const Headings = () => {

  return (
    <div className='heading'>
        <Container classes='headerContent' maxWidth='0'>
            <div className='tagline'>
            <Typography
                variant='h2'
                style={{
                    fontWeight: 'bold',
                    marginBottom: 15,
                    color: 'steelblue'
                }}  
            >
                Hello, CRYPTONIAN
            </Typography>

            <Typography
                variant='subtitle2'
                style={{
                   color: 'darkgray',
                   textTransform: 'capitalize'
                }}
            >
                Unleash the Crypto Hero Within: Join CryptonianCoin's Powerful Revolution!
            </Typography>
            </div>
            <Carousel />
        </Container>
    </div>
  )
}

export default Headings