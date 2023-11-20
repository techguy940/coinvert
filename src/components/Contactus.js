import github from '../assets/github.png';
import discord from '../assets/discord.png';
import gmail from '../assets/gmail.png';
import '../styles/contactus.css';
import Contact from './Contact.js';

// Collection of <Contact /> components
function Contactus(){
    return (
        <div className="contact-main" id="contact-us">
            <div className="contact-title">
                <p>Got some questions? <span className="blue">Contact</span> us</p>
            </div>
            <div className="contact-details">
                { /* GitHub contact */ }
                <Contact url="https://www.github.com/techguy940/coinvert" image={github} alt="GitHub" title="GitHub" />
                { /* Discord contact */ }
                <Contact url="https://discord.com/users/506752683869208577" image={discord} alt="Discord" title="Discord" />
                { /* Email contact */ }
                <Contact url="mailto:kothari.20233166@mnnit.ac.in" image={gmail} alt="Email" title="Email" />
            </div>
        </div>
    )
}

export default Contactus;