import ReactCountryFlag from "react-country-flag";
import '../styles/country-marquee.css';

// Component to show current exchange rates between two currencies (ex. USD/INR) along with their flags overlapped
function CountryMarquee(props){
    return (
        <div className="country-marquee">
            <div className="country-title">
            <div>
                <ReactCountryFlag svg style={{height: "20px", width: "20px"}} countryCode={props.country1} />
                <ReactCountryFlag svg style={{height: "20px", width: "20px"}} countryCode={props.country2} />
            </div>
            <div>
                <p>{props.text}</p>
            </div>
            </div>
            <div className="country-rate">
            <p>{props.rate}</p>
            </div>
        </div>
    )
}

export default CountryMarquee;