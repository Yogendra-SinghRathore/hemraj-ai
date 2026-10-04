
import { RotateCcw, Search } from "lucide-react";

const DebtorFilters = ({
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
  onReset,
}) => {
  return (
    <div className="debtor-filters">
      <div className="debtor-search">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search debtors..."
          value={filters.search}
          onChange={(e) =>
            onFilterChange("search", e.target.value)
          }
        />
      </div>

      <div className="filter-controls">
        <select
          value={filters.risk}
          onChange={(e) =>
            onFilterChange("risk", e.target.value)
          }
        >
          <option value="">All Risks</option>
          <option value="High">High Risk</option>
          <option value="Medium">Medium Risk</option>
          <option value="Low">Low Risk</option>
        </select>

        <select
          value={filters.ageing}
          onChange={(e) =>
            onFilterChange("ageing", e.target.value)
          }
        >
          <option value="">All Ageing</option>
          <option value="0-30">0-30 Days</option>
          <option value="31-60">31-60 Days</option>
          <option value="61-90">61-90 Days</option>
          <option value="90+">90+ Days</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) =>
            onFilterChange("priority", e.target.value)
          }
        >
          <option value="">All Priorities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort debtors by outstanding amount"
        >
          <option value="outstanding-desc">
            Outstanding: High to Low
          </option>
          <option value="outstanding-asc">
            Outstanding: Low to High
          </option>
        </select>

        <button className="filter-reset" onClick={onReset}>
          <RotateCcw size={16} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};

export default DebtorFilters;
