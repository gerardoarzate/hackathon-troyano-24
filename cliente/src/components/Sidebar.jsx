import { useState } from "react";
import SidebarIndex from "./SidebarIndex";
import './Sidebar.css';

const Sidebar = ({ logoutHandler }) => {
    const [view, setView ] = useState('index');
    let content;

    switch (view) {
        default:
            content = <SidebarIndex setView={setView} logoutHandler={logoutHandler}/>;
    }

    return (
        <div className="Sidebar">
            {content}
        </div>
    );
}

export default Sidebar;