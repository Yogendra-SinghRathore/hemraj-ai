import { Wheat } from "lucide-react"
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {

    const navigation = [
        { label: "Overview", path: "/" },
        { label: "Debtors", path: "/debtors"},
        { label: "Finance Agent", path: "/agent" },
    ];  

    return (
        <aside className={` sidebar ${isOpen ? "sidebar-open" : ""} `}>
            <div className="sidebar-brand">
                <div className="brand-icon">
                    <Wheat size={22} />
                </div>
                <span>Hemraj AI</span>
            </div>

            <nav className="sidebar-nav">
                {navigation.map((navigate) => (
                    <NavLink key={navigate.path} to={navigate.path} className={({ isActive }) => `nav-item ${isActive ? "nav-item-active" : ""}`} onClick={onClose}>
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
    )
}

export default Sidebar
