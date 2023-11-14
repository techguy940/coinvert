import Select from "react-select";
import { useState, useEffect, useRef } from "react";
import '../styles/convert.css';
import exchange from '../assets/transfer-1.png';
import ReactCountryFlag from "react-country-flag";
import Navbar from "./Navbar";

const currencies = [{"text": "USD", "value": "USD", "currencyName": "US Dollar", "icon": <ReactCountryFlag svg countryCode="US" />}, {"text": "INR", "value": "INR", "currencyName": "Indian Rupee", "icon": <ReactCountryFlag svg countryCode="IN" />}]

function Convert(){
    const [currency1, setCurrency1] = useState(null)
    const [currency2, setCurrency2] = useState(null)
    const [exchangeClass, setExchangeClass] = useState("convert-exchange")
    const exchangeImg = useRef(null)
    
    const handleChange1 = (e) => {
        setCurrency1(e)
    }

    const handleChange2 = (e) => {
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
    }

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
                            options={currencies}
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
                    <div className={exchangeClass} onClick={animateAndExchangeCurrencies}>
                        <img src={exchange} />
                    </div>
                    <div className="convert-input">
                        <span className="convert-origin">To</span>
                        <Select 
                            options={currencies}
                            value={currency2}
                            onChange={handleChange2}
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    boxShadow: "none",
                                    border: state.isFocused ? "1px solid var(--primary-color)" : "1px solid hsl(0, 0, 80%)"
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isSelected ? "var(--primary-color)" : "white",
                                    ':active': {
                                        color: "white"
                                    }
                                }),
                                singleValue: (base) => ({
                                    ...base,
                                    color: "white"
                                }),
                                valueContainer: (base) => ({
                                    ...base,
                                    color: "white !important"
                                })
                                
                            }}
                            classNames={{
                                option: (state) => state.isFocused ? "selected" : ""
                            }}
                            getOptionLabel={ e => (
                                <div style={{display: "flex", gap: "16px", color: "black", alignItems: "center"}}>
                                    {e.icon}
                                    <span>{e.text} - <span style={{color: "gray"}}>{e.currencyName}</span></span>
                                </div>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Convert;