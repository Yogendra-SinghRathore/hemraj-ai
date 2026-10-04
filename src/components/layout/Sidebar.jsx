import { Activity, Bot, BrainCircuit, Icon, LayoutDashboard, Users } from "lucide-react"
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {

    const navigation = [
        { label: "Overview", path: "/", icon: LayoutDashboard },
        { label: "Debtors", path: "/debtors", icon: Users },
        { label: "Finance Agent", path: "/agent", icon: Bot },
    ];


    return (
        <>
            {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

            <aside className={` sidebar ${isOpen ? "sidebar-open" : ""} `}>
                <div className="sidebar-brand">
                    <div className="brand-icon">
                        <BrainCircuit size={22} />
                    </div>
                    <span>HEMRAJ AI</span>
                </div>

                <nav className="sidebar-nav">
                    {navigation.map((navigate) => (
                        <NavLink key={navigate.path} to={navigate.path} className={({ isActive }) => `nav-item ${isActive ? "nav-item-active" : ""}`} onClick={onClose}>
                            <Icon size={19} />
                            <span>{navigate.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="sidebar-profile">
                        <div className="profile-avatar">Y</div>
                        <div className="profile-info">
                            <strong>Yogendra Singh</strong>
                            <span>Finance Team</span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar
