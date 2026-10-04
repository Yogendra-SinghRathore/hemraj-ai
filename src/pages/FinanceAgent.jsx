import { useState } from "react"
import { Bot, Send } from "lucide-react";
import AgentResponse from "../components/agent/AgentResponse";
import AgentFeedback from "../components/agent/AgentFeedback";
import ActionConfirmation from "../components/agent/ActionConfirmation";
import { askFinanceAgent, submitAgentFeedback } from "../api/financeApi";



const FinanceAgent = () => {

    const [query, setQuery] = useState("");
    const [submittedQuery, setSubmittedQuery] = useState("");
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [error, setError] = useState("");
    const [feedbackLoading, setFeedbackLoading] = useState(false);

    const handleQuery = async (e) => {

        e.preventDefault();

        if (!query.trim() || loading) return;

        setLoading(true);
        setError("");
        setResponse(null);
        setShowFeedback(false);
        setSuccessMessage("");
        setSubmittedQuery(query.trim());

        try {
            const data = await askFinanceAgent(query.trim());
            setResponse(data);
        } catch (error) {
            setError(error.response?.data?.message || "Unable to retrieve Finance Agent data. Please try again.")
        } finally {
            setLoading(false)
            setQuery("");
        }
    };

    const handleFeedback = async (feedback) => {

        setFeedbackLoading(true);
        setError("");

        try {
            await submitAgentFeedback(feedback);
            setShowFeedback(false);
            setSuccessMessage("Feedback submitted successfully.")
        } catch {
            setError("Unable to submit feedback. Please try again.")
        } finally {
            setFeedbackLoading(false)
        }

    }

    const handleApprove = () => {
        setShowConfirmation(false);
        setSuccessMessage("Action approved in demo mode. No debtor record was modified.");
    };

    const handleAskAnother = () => {
        setQuery("");
        setSubmittedQuery("");
        setResponse(null);
        setShowFeedback(false);
        setSuccessMessage("");
        setError("");
    };

    return (
        <div className="finance-agent-page">
            <div className="finance-agent-heading">
                <div className="finance-agent-avatar">
                    <Bot size={24} />
                </div>

                <div>
                    <h2>Finance Agent</h2>
                    <p>Ask questions about debtors and collection priorities</p>
                </div>
            </div>

            <div className="finance-agent-workspace">
                {!submittedQuery && (
                    <div className="agent-welcome">
                        <Bot size={36} />
                        <h2>How can i help you?</h2>
                        <p>Ask about outstanding payments, overdue accounts,
                            debtor ageing, or collection priorities.</p>
                    </div>
                )}

                {submittedQuery && (
                    <div className="agent-conversation">
                        <div className="agent-user-message">
                            {submittedQuery}
                        </div>

                        {loading && (
                            <div className="agent-loading">
                                <span className="agent-loading-dot" />
                                Analysing debtor information...
                            </div>
                        )}

                        {response && (
                            <>
                                <AgentResponse response={response} onAskAnother={handleAskAnother} onFeedBack={() => setShowFeedback(true)} onReviewAction={() => setShowConfirmation(true)} />
                                {showFeedback && (
                                    <AgentFeedback onSubmit={handleFeedback} onCancel={() => setShowFeedback(false)} submitting={feedbackLoading} />
                                )}
                            </>
                        )}

                    </div>
                )}

                {error && (
                    <div className="api-error">
                        <p>{error}</p>
                    </div>
                )}

                {successMessage && (
                    <div className="agent-success">
                        {successMessage}
                    </div>
                )}

                <form className="agent-query-form" onSubmit={handleQuery}>
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask the Finance Agent" disabled={loading} />
                    <button type="submit" disabled={!query.trim() || loading}> <Send size={18} /></button>
                </form>
            </div>

            {showConfirmation && response && (
                <ActionConfirmation debtor={response.debtors[0]} onApprove={handleApprove} onCancel={() => setShowConfirmation(false)} />
            )}
        </div>
    );
};

export default FinanceAgent
