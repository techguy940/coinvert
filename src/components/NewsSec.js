import time from '../assets/clock.png';
import parseDateAndFormat from '../utils/parse-date';

function NewsSec(props){
    return (
        <div className="news-sec" onClick={() => window.location.href = props.url}>
            <img src={props.imgUrl} />
            <div className="news-text-wrapper">
                <div className="news-details">
                    <p>{props.title}</p>
                </div>
                <div className="news-published">
                    <img src={time} />
                    <p>{parseDateAndFormat(props.published)}</p>
                </div>
            </div>
        </div>
    )
}

export default NewsSec;