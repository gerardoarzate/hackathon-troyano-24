import './SidebarOption.css';

const SidebarOption = ({ tag, action }) => {
    return (
        <div className="SidebarOption" onClick={action}>{tag}</div>
    )
};

export default SidebarOption;