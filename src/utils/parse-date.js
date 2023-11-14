function parseDateAndFormat(string){
    const date = new Date(Date.parse(string));
    const hours = date.getHours();
    const ampm = hours < 12 ? "AM" : "PM";
    const minutes = date.getMinutes();
    const mins = minutes >= 10 ? minutes : "0" + minutes;
    const formatted = date.toLocaleDateString(undefined, {day: "numeric", month: "short", year: "numeric"}) + " at " + hours + ":" + mins + " " + ampm;
    return formatted;
}

export default parseDateAndFormat;