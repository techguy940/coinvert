import CountryMarquee from './CountryMarquee.js';
import '../styles/marquee.css';
import { useState, useEffect } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";

function MarqueeCon(){
    const API_KEY = process.env.REACT_APP_CONVERSION_API_KEY;
    const BASE = `https://v6.exchangerate-api.com/v6/${API_KEY}`;
    const [currencyData, setCurrencyData] = useState([])
    useEffect(() => {
        axios.get(`${BASE}/latest/USD`).then(res => {
        setCurrencyData(res.data['conversion_rates'])
        }).catch(err => {
        console.log(err);
        })
    }, [])
    return (
        <Marquee>
            <div className="marquee">
                <CountryMarquee country1="US" country2="IN" text="USD / INR" rate={currencyData['INR']} />
                <CountryMarquee country1="US" country2="CA" text="USD / CAD" rate={currencyData['CAD']} />
                <CountryMarquee country1="US" country2="GB" text="USD / GBP" rate={currencyData['GBP']} />
                <CountryMarquee country1="US" country2="JP" text="USD / JPY" rate={currencyData['JPY']} />
                <CountryMarquee country1="US" country2="AU" text="USD / AUD" rate={currencyData['AUD']} />
                <CountryMarquee country1="US" country2="BR" text="USD / BRL" rate={currencyData['BRL']} />
                <CountryMarquee country1="US" country2="SG" text="USD / SGD" rate={currencyData['SGD']} />
                <CountryMarquee country1="US" country2="EU" text="USD / EUR" rate={currencyData['EUR']} />
            </div>
        </Marquee>
    )
}

export default MarqueeCon;