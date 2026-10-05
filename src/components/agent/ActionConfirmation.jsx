const ActionConfirmation = ({ debtor, onApprove, onCancel }) => {
  return (
    <div className="agent-modal-overlay" onClick={onCancel}>
      <div className="agent-modal" role="dialog" aria-modal="true" aria-labelledby="action-dialog-title" onClick={(e) => e.stopPropagation()}>

        <h2 id="action-dialog-title">Review Agent Action</h2>

        <p>The Finance Agent recommends marking this debtor as a
          high-priority collection account.</p>

        <div className="agent-action-details">
          <span>Debtor</span>
          <strong>{debtor.name}</strong>
          <span>Proposed Action</span>
          <strong>Mark as High Priority</strong>
        </div>

        <p className="agent-action-warning">This action requires your approval before it is applied</p>

        <div className="agent-modal-action">
          <button onClick={onCancel}>Cancel</button>
          <button className="agent-primary-button" onClick={onApprove}>Approve</button>
        </div>
      </div>
    </div>
  )
}

export default ActionConfirmation