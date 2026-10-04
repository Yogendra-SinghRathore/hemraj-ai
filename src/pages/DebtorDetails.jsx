import { Link, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react";
import formatCurrency from "../utils/formatCurrency";
import { useEffect, useState } from "react";
import { getDebtorById } from "../api/financeApi";

const DebtorDetails = () => {

    const { id } = useParams();

    const [debtor, setDebtor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [notFound, setNotFound] = useState(false);

    const loadDebtor = async () => {

        setLoading(true);
        setError("");
        setNotFound(false);

        try {
            const data = await getDebtorById(id)
            setDebtor(data);
        } catch (error) {
            if (error.response?.status === 404) {
                setNotFound(true);
            } else {
                setError("Unable to retrieve Finance Agent data. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadDebtor();
    }, [id]);


    if (loading) return <p role="status">Loading debtor details...</p>;

    if (error) {
        return (
            <div className="api-error">
                <p>{error}</p>
                <button onClick={loadDebtor}>Try Again</button>
            </div>
        );
    }

    if (notFound) {
        return (
            <div className="debtor-details">
                <h2>Debtor not found</h2>
                <Link to="/debtors">Back to Debtors</Link>
            </div>
        );
    }

    const lastPayment = new Date(`${debtor.lastPayment}T00:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    return (
        <div className="debtor-details">
            <Link to="/debtors" className="details-back"><ArrowLeft size={17} />Back to Debtors</Link>

            <div className="details-card">
                <div className="details-heading">
                    <h2>{debtor.name}</h2>
                    <span className={`status-badge status-${debtor.risk.toLowerCase()}`}>{debtor.risk} Risk</span>
                </div>

                <div className="details-grid">
                    <div className="details-field">
                        <span>Outstanding Amount</span>
                        <strong>{formatCurrency(debtor.outstanding)}</strong>
                    </div>

                    <div className="details-field">
                        <span>Ageing</span>
                        <strong>{debtor.ageing} Days</strong>
                    </div>

                    <div className="details-field">
                        <span>Last Payment</span>
                        <strong>{lastPayment}</strong>
                    </div>

                    <div className="details-field">
                        <span>Collection Priority</span>
                        <span className={`status-badge status-${debtor.priority.toLowerCase()}`}>{debtor.priority}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DebtorDetails
