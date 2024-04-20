import "./Home.css";
import Sidebar from "./Sidebar";;
import Content from "./Content";
import AsistantHandler from "../js/AssistantHandler.js";

const Home = ({ logoutHandler }) => {
    window.assistantHandler = new AsistantHandler();

    return (
        <div className="Home">
            <Sidebar logoutHandler={logoutHandler}/>
            <Content/>
        </div>
    );
}

export default Home;