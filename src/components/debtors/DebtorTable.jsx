
import formatCurrency from "../../utils/formatCurrency";

const columns = [
  { label: "Debtor", key: "name" },
  { label: "Outstanding", key: "outstanding" },
  { label: "Ageing", key: "ageing" },
  { label: "Last Payment", key: "lastPayment" },
  { label: "Risk", key: "risk" },
  { label: "Priority", key: "priority" },
];

const formatDate = (date) => {
  if (!date) return "_";

  return new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
};

const DebtorTable = ({ debtors, onViewDebtor }) => {
  return (
    <div className="debtor-table-wrapper">
      <table className="debtor-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {debtors.map((debtor) => (
            <tr key={debtor.id}>
              <td>
                <button
                  className="debtor-name"
                  onClick={() => onViewDebtor(debtor.id)}
                >
                  {debtor.name}
                </button>
              </td>

              <td className="amount-cell">
                {formatCurrency(debtor.outstanding)}
              </td>

              <td>{debtor.ageing}</td>

              <td>{formatDate(debtor.lastPayment)}</td>

              <td>
                <span
                  className={`status-badge status-${debtor.risk.toLowerCase()}`}
                >
                  {debtor.risk}
                </span>
              </td>

              <td>
                <span
                  className={`status-badge status-${debtor.priority.toLowerCase()}`}
                >
                  {debtor.priority}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DebtorTable;
