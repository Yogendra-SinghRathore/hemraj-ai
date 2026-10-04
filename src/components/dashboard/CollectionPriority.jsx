import { Link } from "react-router-dom"
import formatCurrency from "../../utils/formatCurrency"

const CollectionPriority = ({ debtors }) => {
    return (
        <section className="dashboard-panel">
            <div className="panel-header">
                <div>
                    <h3>Collection Priority</h3>
                    <p>Accounts requiring attention</p>
                </div>
                <Link to="/debtors" className="panel-link">View All</Link>
            </div>

            <div className="priority-list">
                {debtors.length === 0 ? (<p className="empty-message">No priority accounts found.</p>) : (
                    debtors.map((debtor) => (
                        <div className="priority-item" key={debtor.id}>
                            <div className="priority-account">
                                <span className="priority-name">{debtor.name}</span>
                                <span className="priority-amount">{formatCurrency(debtor.outstanding)}</span>
                            </div>

                            <span className={`status-badge status-${debtor.priority.toLowerCase()}`}>{debtor.priority}</span>
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}

export default CollectionPriority
