// Component to show individual feature containing a relevant image, title and its description
function Feature(props){
    return (
        <div className="feature">
        <div className="feature-title">
            <img src={props.image} />
            <h2>{props.title}</h2>
        </div>
        <div className="feature-desc">
            <p>{props.description}</p>
        </div>
        </div>
    )
}

export default Feature;