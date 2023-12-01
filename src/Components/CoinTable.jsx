import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { CoinList } from '../Config/api'
import { CryptoState } from '../Context'
// import { makeStyles } from '@mui/styles'
import { Container, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
const CoinTable = () => {

    const navigate = useNavigate()
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const { currency, symbol } = CryptoState()
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

 
    // const fetchCoins = async () => {
    //     setLoading(true)
    //     // const { data } = await axios.get(CoinList(currency))
    //     // setCoins(data)
    //     axios.get(CoinList(currency)).then((res)=> {
    //         setCoins(res.data)
    //     })
    //     setLoading(false)
    // }
    console.log(coins);

    useEffect(()=>{
        setLoading(true)
        // const { data } = await axios.get(CoinList(currency))
        // setCoins(data)
        axios.get(CoinList(currency)).then((res)=> {
            setCoins(res.data)
        })
        setLoading(false)
    }, [currency])

    const handleSearch = () => {
        return coins.filter((coin)=>{
            return (
                coin.name.toLowerCase().includes(search) ||
                coin.sybmol.toLowerCase().includes(search)
            )
        })
    }
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // const useStyles = makeStyles(()=> ({
    //     pagination: {
            
    //     }
    // }))

  return (
    <Container style={{textAlign: 'center'}}>
        <Typography variant='h5' style={{ margin: 20}}> 
            Cryptocoin Prices By Market Caps
        </Typography>
        <TextField 
            label="Search for a Coin" 
            variant='outlined' 
            style={{marginBottom: 20, width: '75%'}}
            onChange={(e)=> setSearch(e.target.value)}
        />
        <TableContainer >
            {loading ? (
                <LinearProgress />
            ): (
                <Table>
                    <TableHead>
                        <TableRow style={{backgroundColor: '#61b0b7', borderRadius: '10px'}}>
                            {['Coin', 'Price', '24h Change', 'Market Cap'].map((head)=>(
                            <TableCell style={{fontWeight: 700}} key={head} align={head === 'Coin' ? "" : 'right' }>
                                {head}
                            </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {handleSearch()
                        .slice((page-1) * 10, (page-1) * 10 + 10)
                        .map((row)=>{
                            const profit = row.price_change_percentage_24h > 0
                            return (
                                <TableRow
                                    onClick= {()=> navigate(`/coins/${row.id}`)}
                                    className='row'
                                    key={row.name}
                                    sx={[
                                        {
                                            '&:hover': {
                                                backgroundColor: 'whitesmoke'
                                            },
                                            cursor: 'pointer'
                                        }
                                    ]}
                                >
                                    <TableCell
                                        component='th'
                                        scope='row'
                                        style={{display: 'flex', gap: 15}}

                                    >
                                        <img 
                                            src={row?.image}
                                            alt={row.name}
                                            height='50'
                                            style={{marginBottom: 10}}
                                        />
                                        <div
                                            style={{display: 'flex', flexDirection: 'column'}}
                                        >
                                            <span
                                                style={{textTransform: 'uppercase', fontSize: '32'}}
                                            >
                                                {row.symbol}
                                            </span>
                                            <span
                                                style={{color: 'darkgrey'}}
                                            >
                                                {row.name}
                                            </span>

                                        </div>

                                    </TableCell>
                                    <TableCell align='right'>
                                        {symbol}{" "}
                                        {numberWithCommas(row.current_price.toFixed(2))}
                                    </TableCell>
                                    <TableCell
                                        align='right'
                                        style={{
                                            color: profit > 0 ? "rgb(14, 203, 129)" : "red"
                                        }}
                                    >
                                        {profit && "+"}
                                        {row.price_change_percentage_24h.toFixed(2)}%
                                    </TableCell>
                                    
                                    
                                    <TableCell align='right'>
                                        {symbol}{" "}
                                        {numberWithCommas(row.market_cap.toString().slice(0, -6))}
                                        M
                                    </TableCell>

                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            )}
        </TableContainer>

        <Pagination 
            color='primary'
            style={{
                padding: '20px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}
            count={(handleSearch().length / 10 .toFixed(0))}
            onChange={(_, value)=> {
                setPage(value)
                window.scroll(0, 450)
            }}
        />
    </Container>
  )
}

export default CoinTable