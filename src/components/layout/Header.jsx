import { Menu } from "lucide-react"

const Header = ({ onMenuClick }) => {

    return (
        <header className="app-header">
            <div className="header-left">
                <button className="menu-toggle" onClick={onMenuClick}> <Menu size={22} /> </button>

                <div>
                    <h1>Hemraj AI</h1>
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
