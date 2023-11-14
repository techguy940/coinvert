import Select from "react-select";
import { useState, useEffect } from "react";
import '../styles/convert.css';
import exchange from '../assets/transfer-1.png';
import ReactCountryFlag from "react-country-flag";
import Navbar from "./Navbar";
import { sub, add } from "date-fns";
import axios from "axios";
import CanvasJSReact from '@canvasjs/react-charts';
import recent from '../assets/recent.png';
import heart from '../assets/heart.png';
import heartFilled from '../assets/heart-filled.png';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const currencies = [{"text": "USD", "value": "USD", "currencyName": "US Dollar", "icon": <ReactCountryFlag svg countryCode="US" />}, {"text": "INR", "value": "INR", "currencyName": "Indian Rupee", "icon": <ReactCountryFlag svg countryCode="IN" />}]

const history = [{"text": "USD/INR", "value": "USD/INR", "from": "USD", "to": "INR", "currencyName": "USD/INR"}]

const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  };

  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  
  const formatGroupLabel = (data) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={data.label === "History" || data.label === "Favourites" ? {} : groupBadgeStyles}>{data.label === "History" ? <img src={recent} width="15" height="15" /> : data.label === "Favourites" ? <img src={heartFilled} width="15" height="15" /> :data.options.length}</span>
    </div>
  );

function Convert(){
    const API_KEY = "";
    const BASE = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair`;
    const HISTORIC_API_KEY = "";
    const HISTORIC_BASE = "https://api.forexrateapi.com/v1/timeframe";
    const [currency1, setCurrency1] = useState(null)
    const [currency2, setCurrency2] = useState(null)
    const [fromCurrency, setFromCurrency] = useState("")
    const [toCurrency, setToCurrency] = useState("")
    const [dataPoints, setDataPoints] = useState([])
    const [graphReady, setGraphReady] = useState(false)
    const [favouriteStatus, setFavouriteStatus] = useState(false)
    const [historyData, setHistoryData] = useState(null)
    const [favouriteData, setFavouriteData] = useState(null)
    const [exchangeClass, setExchangeClass] = useState("convert-exchange")

    const getFavouriteStatus = (cur1, cur2) => {
        if (localStorage.getItem("favourites") === null){
            return false
        }
        const favourites = JSON.parse(localStorage.getItem("favourites"))
        const isFav = favourites.filter(cur => cur.from === cur1 && cur.to === cur2).length;
        return isFav === 1
    }

    const addFavourite = () => {
        if (favouriteStatus === true){
            const favourites = JSON.parse(localStorage.getItem("favourites"))
            favourites.forEach(cur => {
                if (cur.from === currency1.value && cur.to === currency2.value){
                    favourites.splice(favourites.indexOf(cur), 1)
                    console.log(favourites)
                    localStorage.setItem("favourites", JSON.stringify(favourites))
                    setFavouriteStatus(false)
                    return
                }
            })
        } else {
            if (localStorage.getItem("favourites") === null){
                localStorage.setItem("favourites", JSON.stringify([]))
            }

            const favourites = JSON.parse(localStorage.getItem("favourites"))
            favourites.push({"from": currency1.value, "to": currency2.value, "value": `${currency1.value}/${currency2.value}`, "text": `${currency1.value}/${currency2.value}`, "currencyName": `${currency1.value}/${currency2.value}`})
            localStorage.setItem("favourites", JSON.stringify(favourites))
            setFavouriteStatus(true)
        }
    }
    
    const handleChange1 = (e) => {
        if ("from" in e){
            setCurrency1(currencies.filter(curr => curr.value === e.from)[0])
            setCurrency2(currencies.filter(curr => curr.value === e.to)[0])
            setFavouriteStatus(getFavouriteStatus(e.from, e.to))
            return
        }
        setCurrency1(e)
    }

    const handleChange2 = (e) => {
        if ("from" in e){
            setCurrency1(currencies.filter(curr => curr.value === e.from)[0])
            setCurrency2(currencies.filter(curr => curr.value === e.to)[0])
            setFavouriteStatus(getFavouriteStatus(e.from, e.to))
            return
        }
        setCurrency2(e)
    }

    const animateAndExchangeCurrencies = () => {
        setExchangeClass("convert-exchange rotate")

        setTimeout(() => {
            setExchangeClass("convert-exchange")
            exchangeCurrencies()
        }, 200)
    }

    const exchangeCurrencies = () => {
        const temp = currency1;
        setCurrency2(currency1);
        setCurrency1(currency2);
        setFavouriteStatus(getFavouriteStatus(currency1.value, currency2.value))

        const temp2 = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(temp2);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (fromCurrency === "") {
                setToCurrency("")
                return
            }
            axios.get(`${BASE}/${currency1.value}/${currency2.value}`)
            .then(res => setToCurrency(fromCurrency * res.data.conversion_rate))
            .catch(err => console.log(err))
        }, 500)
        return () => clearTimeout(timeout)
    }, [fromCurrency])

    useEffect(() => {
        if (currency1 === null || currency2 === null){
            return
        }

        if (localStorage.getItem("history") === null){
            localStorage.setItem("history", JSON.stringify([]))
        }

        const currData = {"from": currency1.value, "to": currency2.value, "text": `${currency1.value}/${currency2.value}`, "value": `${currency1.value}/${currency2.value}`, "currencyName": `${currency1.value}/${currency2.value}`}
        
        var historyData = JSON.parse(localStorage.getItem("history"))
        historyData.forEach(data => {
            if (data.from === currData.from && data.to === currData.to){
                historyData.splice(historyData.indexOf(data), 1)
                return
            }
        })
        historyData = historyData.slice(0, 5)
        historyData.splice(0, 0, currData)
        setHistoryData(historyData)
        localStorage.setItem("history", JSON.stringify(historyData))
    }, [currency1, currency2])

    useEffect(() => {
        if (currency1 === null || currency2 === null){
            return
        }

        if (localStorage.getItem("favourites") === null){
            localStorage.setItem("favourites", JSON.stringify([]))
        }

        setFavouriteStatus(getFavouriteStatus(currency1.value, currency2.value))
    }, [currency1, currency2])

    useEffect(() => {
        if (localStorage.getItem("favourites") === null){
            localStorage.setItem("favourites", JSON.stringify([]))
        }
        setFavouriteData(JSON.parse(localStorage.getItem("favourites")))
    }, [favouriteStatus])

    useEffect(() => {
        if (currency1 === null || currency2 === null){
            return
        }
        // get daily historic data (1 month)
        const now = new Date()
        var past = sub(now, {months: 1})
        const dataPoints_ = []
        axios.get(HISTORIC_BASE, {
            params: {
                api_key: HISTORIC_API_KEY,
                start_date: past.toISOString().substring(0, 10),
                end_date: now.toISOString().substring(0, 10),
                base: currency1.value,
                currencies: currency2.value
            }
        }).then(res => {
            var count = 0;
            const keys = Object.keys(res.data.rates)
            keys.forEach(key => {
                dataPoints_.push({x: new Date(key), y: res.data.rates[key][currency2.value]})
                count = count + 1;
                if (count === keys.length) {
                    setDataPoints(dataPoints_)
                    console.log(dataPoints_)
                    setGraphReady(true)
                }
            })
        }).catch(err => console.log(err))
    }, [currency1, currency2])

    useEffect(() => {
        if (localStorage.getItem("history") === null){
            localStorage.setItem("history", JSON.stringify([]))
        }
        if (localStorage.getItem("favourites") === null){
            localStorage.setItem("favourites", JSON.stringify([]))
        }
        setHistoryData(JSON.parse(localStorage.getItem("history")))
        setFavouriteData(JSON.parse(localStorage.getItem("favourites")))
    }, [])

    return (
        <div>
            <Navbar />
            <div className="convert-main">
                <div className="convert-title">
                    <h1>Currency Converter</h1>
                    <p>Convert currencies on-the-go with accurate rates</p>
                </div>
                <div className="convert-inputs">
                    <div className="convert-input">
                        <span className="convert-origin">From</span>
                        <Select 
                            options={[{label: "History", options: historyData}, {label: "Favourites", options: favouriteData}, {label: "Currencies", options: currencies}]}
                            formatGroupLabel={formatGroupLabel}
                            value={currency1}
                            onChange={handleChange1}
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    boxShadow: "none",
                                    border: state.isFocused ? "1px solid var(--primary-color)" : "1px solid hsl(0, 0, 80%)"
                                })
                            }}
                            getOptionLabel={ e => (
                                <div style={{display: "flex", gap: "16px", color: "black", alignItems: "center"}}>
                                    {e.icon}
                                    <span>{e.text} - <span style={{color: "gray"}}>{e.currencyName}</span></span>
                                </div>
                            )}
                        />
                    </div>
                    <div className="convert-mobile">
                        <div className={exchangeClass} onClick={animateAndExchangeCurrencies}>
                            <img src={exchange} />
                        </div>
                        <div className="convert-favourite" onClick={addFavourite}>
                            <img src={favouriteStatus ? heartFilled : heart} width="40" height="40"/>
                        </div>
                    </div>
                    <div className="convert-input">
                        <span className="convert-origin">To</span>
                        <Select 
                            options={[{label: "History", options: historyData}, {label: "Favourites", options: favouriteData}, {label: "Currencies", options: currencies}]}
                            value={currency2}
                            onChange={handleChange2}
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    boxShadow: "none",
                                    border: state.isFocused ? "1px solid var(--primary-color)" : "1px solid hsl(0, 0, 80%)"
                                })
                            }}
                            getOptionLabel={ e => (
                                <div style={{display: "flex", gap: "16px", color: "black", alignItems: "center"}}>
                                    {e.icon}
                                    <span>{e.text} - <span style={{color: "gray"}}>{e.currencyName}</span></span>
                                </div>
                            )}
                        />
                    </div>
                    <div className="convert-favourite main" onClick={addFavourite}>
                        <img src={favouriteStatus ? heartFilled : heart} width="30" height="30"/>
                    </div>
                </div>
                <div className="convert-currency-inputs">
                    <div className="convert-currency-input">
                        <input type="number" min="0" placeholder={currency1?.value} value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} disabled={currency1 === null || currency2 === null}/>
                    </div>
                    <div></div>
                    <div className="convert-currency-input">
                        <input type="number" min="0" placeholder={currency2?.value} value={toCurrency} disabled />
                    </div>
                    <div></div>
                </div>
                { graphReady && <div className="convert-graph">
                    <CanvasJSChart options={{
                        width: 700,
                        animationEnabled: true,
                        title: {
                            text: `${currency1.value} v/s ${currency2.value}`
                        },
                        axisX: {
                            valueFormatString: "DD/MM/YYYY",
                            lineColor: "rgb(36, 96, 155)",
                            gridThickness: 0,

                        },
                        axisY: {
                            gridThickness: 0
                        },
                        data: [{
                            xValueFormatString: "DD/MM/YYYY",
                            type: "spline",
                            dataPoints: dataPoints
                        }]
                    }} />
                </div> }
            </div>
        </div>
    )
}

export default Convert;