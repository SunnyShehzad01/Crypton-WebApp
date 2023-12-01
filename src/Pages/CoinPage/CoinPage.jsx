import React, { useEffect, useState } from 'react'
import CoinInfo from '../../Components/CoinInfo'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../../Context'
import { SingleCoin } from '../../Config/api'
import axios from 'axios'
import { Typography, styled } from '@mui/material'
import styles from './coinPage.module.css'
import {numberWithCommas} from '../../Components/Carousel'
const CoinPage = () => {

  const { id } = useParams()
  const [coin, setCoin] = useState()
  const { currency, symbol } = CryptoState()

  useEffect(()=>{
    const fetchCoin = async() => {
      const { data } = await axios.get(SingleCoin(id))
      console.log(data);
      setCoin(data)
    }

    fetchCoin()
  }, [id])

  const ResponsiveContainer = styled('div')(({theme})=>({
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  }))

  const ResponsiveSideBar = styled('div')(({theme})=>({
    width: '30%',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    borderRight: '2px solid grey'
  }))

  return (
    <ResponsiveContainer>
      <ResponsiveSideBar>
        Sidebar
        <img 
          src={coin?.image.large}
          alt={coin?.name}
          height= '200'
          style={{marginBottom: 20}}
        />
        <Typography variant='h3' className={styles.coinHeading}>
          {coin?.name}
        </Typography>
        <Typography variant='subtitle1' className={styles.coinDescription}>
          {coin?.description.en.split(".")[0]}
        </Typography>
        <div className={styles.coinMarketData}>
          <span style={{display: 'flex'}}>
            <Typography variant='h5' className={styles.coinHeading}>
              Rank: 
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5'>
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{display: 'flex'}}>
            <Typography variant='h5' className={styles.coinHeading}>
              Current Price: 
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5'>
              {symbol}{' '}
              {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>

          <span style={{display: 'flex'}}>
            <Typography variant='h5' className={styles.coinHeading}>
              Rank: 
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5'>
              {coin?.market_cap_rank}
            </Typography>
          </span>
        </div>
        
      </ResponsiveSideBar>

      {/* {Chart} */}

      <CoinInfo coin={coin} />
    </ResponsiveContainer>
  )
}

export default CoinPage