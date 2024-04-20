import Map from './Map';
import Message from './Message';
import './Content.css';

const Content = () => {
    return (
        <div className='Content'>
            <Message/>
            <Map/>
        </div>
    );
};

export default Content;