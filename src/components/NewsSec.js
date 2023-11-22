import time from '../assets/clock.png';
import parseDateAndFormat from '../utils/parse-date';
import { useState } from 'react';
import fallback from '../assets/fallback.jpg';

// A single news component containing relevant image, title and the time of publishing, along with sentiments redirects to the website where it was posted when clicked
function NewsSec(props){
    const [imgSrc, setImgSrc] = useState(props.imgUrl)
    const onError = () => setImgSrc(fallback)
    return (
        <div className="news-sec" onClick={() => window.location.href = props.url}>
            <img src={props.imgUrl ? props.imgUrl : fallback} onError={onError} />
            <div className="news-text-wrapper">
                <div className="news-details">
                    <p>{props.title}</p>
                </div>
                <p className="news-sentiment">Sentiment: <span style={{color: props.sentiment > 0 ? "green" : "red" }}>{props.sentiment}</span></p>
                <div className="news-published">
                    <img src={time} />
                    <p>{parseDateAndFormat(props.published)}</p>
                </div>
            </div>
        </div>
    )
}

export default NewsSec;