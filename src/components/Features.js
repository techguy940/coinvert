import currencies from '../assets/currencies.png';
import graph from '../assets/graph.png';
import realtime from '../assets/realtime.png';
import news from '../assets/news.png';
import Feature from './Feature.js';
import '../styles/features.css';

// Collection of <Feature /> components
function Features(){
    return (
      <div className="features-main" id="features">
        <div className="features-title">
          <h1>Features</h1>
        </div>
        <div className="features-sec">
          { /* Multiple currencies */ }
          <Feature image={currencies} title="Currencies" description="Coinvert supports exchange between a wide range of currencies" />
          { /* Realtime data */ }
          <Feature image={realtime} title="Realtime" description="Get up-to-date exchange rates for every currencies, updated every 60 minutes" />
          { /* Daily charts */ }
          <Feature image={graph} title="Charts" description="View historic charts for exchange rates of multiple currencies" />
          { /* Forex news */ }
          <Feature image={news} title="News" description="Stay up-to-date by reading latest and updated news related to exchange market" />          
        </div>
      </div>
    )
}

export default Features;