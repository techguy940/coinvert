import '../styles/navbar.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

function Navbar(){
    const [ulClass, setUlClass] = useState("");
    const [menuIcon, setMenuIcon] = useState(faBars);
  
    function handleMenuClick(){
    if (ulClass === ""){
        setUlClass("active");
        setMenuIcon(faXmark)
    } else {
        setUlClass("");
        setMenuIcon(faBars);
    }
    }
    return (
        <header>
            <h1>Coinvert</h1>
            <ul className={ulClass}>
                <li><a href="#">Home</a></li>
                <li><a href="#">Features</a></li>
                <li><a href="#">Convert</a></li>
                <li><a href="#">News</a></li>
                <li><a href="#">Contact Us</a></li>
            </ul>
            <div className="nav-menu-wrapper" onClick={handleMenuClick}>
                <FontAwesomeIcon icon={menuIcon} className="nav-menu-icon" />
            </div>
        </header>
    );
}

export default Navbar;