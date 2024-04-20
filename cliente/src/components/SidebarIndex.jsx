import SidebarOption from "./SidebarOption";
import getMessageForAssistant from "../util/getMessageForAssistant";
import './SidebarIndex.css';

const SidebarIndex = ({ logoutHandler }) => {
    const buttons = [
        {
            tag: 'Preguntar al asistente',
            action: () => { window.assistantHandler.askAssistant(getMessageForAssistant()) }
        },
    ];

    return (
        <>
            <ul className="options-list">
                {buttons.map((value, i) => <SidebarOption tag={value.tag} action={value.action} key={i}/>)}
                <button className="logout-btn" type="button" onClick={logoutHandler}>Cerrar sesión</button>
            </ul>
        </>
    );
};

export default SidebarIndex;