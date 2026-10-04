import { Database, MessageSquare, ShieldCheck } from "lucide-react";
import formatCurrency from "../../utils/formatCurrency";
import { useState } from "react";
import { Link } from "react-router-dom";

const AgentResponse = ({ response, onAskAnother, onFeedBack, onReviewAction }) => {

    const [showSupportingData, setShowSupportingData] = useState(false);

    return (
        <div className="agent-response">
            <div className="agent-response-header">
                <span className="agent-response-label">Finance Agent Response</span>
            </div>

            <p className="agent-response-summary">{response.summary}</p>

            <div className="agent-response-stats">
                <div>
                    <span>Total Outstanding</span>
                    <strong>{formatCurrency(response.totalOutStanding)}</strong>
                </div>

                <div>
                    <span>Critical Accounts</span>
                    <strong>{response.criticalAccounts}</strong>
                </div>
            </div>

            <div className="agent-recommendation">
                <div className="agent-recommendation-title">
                    <ShieldCheck size={18} />
                    <h3>Recommended Action</h3>
                </div>

                <p>{response.recommendedAction}</p>

                <button className="agent-primary-button" onClick={onReviewAction}>Review Action</button>

            </div>

            {showSupportingData && (
                <div className="agent-supporting-data">
                    <h3>Supporting Data</h3>

                    <div className="agent-supporting-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Debtor</th>
                                    <th>Outstanding</th>
                                    <th>Ageing</th>
                                    <th>Priority</th>
                                    <th>View</th>
                                </tr>
                            </thead>

                            <tbody>
                                {response.debtors.map((debtor) => (
                                    <tr key={debtor.id}>
                                        <td>{debtor.name}</td>
                                        <td>{formatCurrency(debtor.outstanding)}</td>
                                        <td>{debtor.ageing} Days</td>
                                        <td>{debtor.priority}</td>
                                        <td>
                                            <Link to={`/debtors/${debtor.id}`}>View debtor</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="agent-response-action">
                <button onClick={onAskAnother}>
                    <MessageSquare size={16} />
                    Ask another question
                </button>

                <button onClick={() => setShowSupportingData((prev) => !prev)}> <Database size={16} /> {showSupportingData ? "Hide supporting data" : "View supporting data"} </button>

                <button><Link to={`/debtors/${response.debtors[0].id}`}>View debtor</Link></button>

                <button onClick={onFeedBack}>Give feedback</button>
            </div>
        </div>
    );
};

export default AgentResponse
