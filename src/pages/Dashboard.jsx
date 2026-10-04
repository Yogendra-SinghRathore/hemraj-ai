import { AlertTriangle, Clock3, Users, Wallet } from "lucide-react";
import formatCurrency from "../utils/formatCurrency";
import StatCard from "../components/dashboard/StatCard";
import CollectionPriority from "../components/dashboard/CollectionPriority";
import RecentActivity from "../components/dashboard/RecentActivity";
import { useEffect, useState } from "react";
import { getDashboard } from "../api/financeApi";

const Dashboard = () => {


    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const loadDashboard = async () => {
        setLoading(true);
        setError("");

        try {
            const result = await getDashboard();
            setData(result);
        } catch {
            setError("Unable to retrieve finance agent data. Please try again");
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadDashboard();
    }, [])


    if (loading) {
        return <p>Loading finance dashboard...</p>
    }

    if (error) {
        return (
            <div className="api-error">
                <p>{error}</p>
                <button onClick={loadDashboard}>Try Again</button>
            </div>
        );
    }

    const stats = [{
        title: "Total Outstanding",
        value: formatCurrency(data.totalOutStanding),
        icon: Wallet,
        variant: "blue",
    },
    {
        title: "Overdue Amount",
        value: formatCurrency(data.overdueAmount),
        icon: Clock3,
        variant: "orange",
    },
    {
        title: "Number of Debtors",
        value: data.totalDebtors,
        icon: Users,
        variant: "green",
    },
    {
        title: "High-Risk Debtors",
        value: data.highRiskDebtors,
        icon: AlertTriangle,
        variant: "red",
    },
    ]


    return (
        <div className="dashboard-page">
            <div className="dashboard-stats">
                {stats.map((state) => (
                    <StatCard key={state.title} state={state} />
                ))}
            </div>

            <div className="dashboard-sections">
                <CollectionPriority debtors={data.collectionPriority} />
                <RecentActivity activities={data.recentActivity} />
            </div>
        </div>
    )
}

export default Dashboard
