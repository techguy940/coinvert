function Contact(props){
    return (
        <div className="contact-sec" onClick={() => window.location.replace(props.url)}>
            <img src={props.image} alt={props.alt} />
            <p>{props.title}</p>
        </div>
    )

}

export default Contact;