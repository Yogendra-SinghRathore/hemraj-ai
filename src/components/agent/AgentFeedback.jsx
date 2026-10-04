import { useState } from "react"

const feedbackReasons = ["Incorrect information", "Missing information", "Not relevant", "Other"]

const AgentFeedback = ({ onSubmit, onCancel, submitting = false }) => {

  const [useful, setUseful] = useState(null);
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (useful === null) return;
    if (useful === false && !reason) return;

    onSubmit({ useful, reason: useful ? null : reason });

  }


  return (
    <form className="agent-feedback" onSubmit={handleSubmit}>
      <h3>Was this response useful</h3>

      <div className="feedback-choice">
        <button type="button" className={useful === true ? "feedback-selected" : ""} onClick={() => {
          setUseful(true);
          setReason("");
        }}>
          Yes
        </button>

        <button type="button" className={useful === false ? "feedback-selected" : ""} onClick={() => setUseful(false)}>
          No
        </button>
      </div>

      {useful === false && (
        <div className="feedback-reasons">
          <p>What was wrong</p>

          {feedbackReasons.map((item) => (
            <label key={item}>
              <input type="radio" name="feedbackReason" value={item} checked={reason === item} onChange={() => setReason(item)} />
              {item}</label>
          ))}
        </div>
      )}

      <div className="feedback-actions">
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit" className="agent-primary-button" disabled={submitting || useful === null || (useful === false && !reason)}>Submit Feedback</button>
      </div>
    </form>
  )
}

export default AgentFeedback
