import '../styles/homepage.css';
import homepage from '../assets/homepage.jpg';

// First part of the homepage/index containing name of the website, its use and relevant image
function Homepage(){
    return (
        <div className="home-details-wrapper">
            <div className="home-details">
                <h1>Coinvert</h1>
                <p>Convert currencies on the go</p>
                <div className="home-btns">
                <button id="features-btn" onClick={() => document.getElementById("features").scrollIntoView()}>Explore Features</button>
                <button id="convert-btn" onClick={() => window.location.href = window.location.href + "convert"}>Convert Currency</button>
                </div>
            </div>
            <img src={homepage} />
        </div>
    );
}

export default Homepage;