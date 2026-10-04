import { Bell, ChevronDown, Menu } from "lucide-react"
import { useLocation } from "react-router-dom"

const Header = ({ onMenuClick }) => {

    const { pathname } = useLocation();

    const pageTitles = {
        "/": "Finance Overview",
        "/debtors": "Debtors",
        "/agent": "Finance Agent",
        "/activity": "Agent Activity",
    }


    return (
        <header className="app-header">
            <div className="header-left">
                <button className="menu-toggle" onClick={onMenuClick}> <Menu size={22} /> </button>

                <div>
                    <h1>{pageTitles[pathname] || "Hemraj AI"}</h1>
                    <p>Finance intelligence and collection management</p>
                </div>
            </div>

            <div className="header-right">
                <div className="header-avatar">Y</div>
            </div>

        </header>
    )
}

export default Header
