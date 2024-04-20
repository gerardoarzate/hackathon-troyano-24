import { useState } from 'react';
import './Message.css';


const Message = () => {
    const [ content, setContent ] = useState(null);

    window.showMessage = (message) => {
        setContent(message);
    }

    if (content) {
        setTimeout(()=>{setContent(null)}, 2000 + content.length*100);
        return <div className="Message">{content}</div>;
    }

    return null;
}

export default Message;