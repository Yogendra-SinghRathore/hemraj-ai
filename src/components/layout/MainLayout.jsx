import { useState } from "react"
import Header from "./Header";
import Sidebar from "./Sidebar";

import { Outlet } from "react-router-dom";

const MainLayout = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="app-layout">

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="app-main">
                <Header onMenuClick={() => setSidebarOpen(true)} />

                <main className="page-content">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default MainLayout
