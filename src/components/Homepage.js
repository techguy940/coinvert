import '../styles/homepage.css';
import homepage from '../assets/homepage.jpg';

function Homepage(){
    return (
        <div className="home-details-wrapper">
            <div className="home-details">
                <h1>Coinvert</h1>
                <p>Convert currencies on the go</p>
                <div className="home-btns">
                <button id="features-btn" onClick={() => document.getElementById("features").scrollIntoView()}>Explore Features</button>
                <button id="convert-btn">Convert Currency</button>
                </div>
            </div>
            <img src={homepage} />
        </div>
    );
}

export default Homepage;