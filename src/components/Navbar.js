import '../styles/navbar.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

// Navigation/Header bar to let users access parts of website easily
function Navbar(){
    // ulClass -> shows if the navigation bar is active (shown) or inactive (hidden) for mobile users
    const [ulClass, setUlClass] = useState("");
    // menuIcon -> if navigation bar is active then it should display close icon else menu icon
    const [menuIcon, setMenuIcon] = useState(faBars);
  
    function handleMenuClick(){
    // if ulClass is "" then it means user has clicked to open the navbar else to close
    // update the icons accordingly
        if (ulClass === ""){
            setUlClass("active");
            setMenuIcon(faXmark)
            const marquee = Array.from(document.getElementsByClassName("rfm-marquee-container"));
            if (marquee.length > 0){
                marquee[0].style.display = "none"
            }
            const convertInputs = Array.from(document.getElementsByClassName("convert-input"))
            if (convertInputs.length > 0){
                convertInputs.forEach(inp => inp.style.display = "none")
            }
            
        } else {
            setUlClass("");
            setMenuIcon(faBars);
            const marquee = Array.from(document.getElementsByClassName("rfm-marquee-container"));
            if (marquee.length > 0){
                marquee[0].style.display = "flex"
            }
            const convertInputs = Array.from(document.getElementsByClassName("convert-input"))
            if (convertInputs.length > 0){
                convertInputs.forEach(inp => inp.style.display = "flex")
            }
        }
    }
    return (
        <header>
            <h1>Coinvert</h1>
            <ul className={ulClass}>
                { /* Different sections of website */ }
                <li><a href="/">Home</a></li>
                <li><a href="/#features">Features</a></li>
                <li><a href="/convert">Convert</a></li>
                <li><a href="/news">News</a></li>
                <li><a href="/#contact-us">Contact Us</a></li>
            </ul>
            <div className="nav-menu-wrapper" onClick={handleMenuClick}>
                <FontAwesomeIcon icon={menuIcon} className="nav-menu-icon" />
            </div>
        </header>
    );
}

export default Navbar;