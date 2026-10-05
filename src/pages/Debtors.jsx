
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import DebtorFilters from "../components/debtors/DebtorFilters";
import DebtorTable from "../components/debtors/DebtorTable";
import { getDebtors } from "../api/financeApi";

const PAGE_SIZE = 5;

const initialFilters = {
    search: "",
    risk: "",
    ageing: "",
    priority: "",
};

const Debtors = () => {
    const navigate = useNavigate();

    const [debtors, setDebtors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [filters, setFilters] = useState(initialFilters);
    const [sortBy, setSortBy] = useState("outstanding-desc");
    const [page, setPage] = useState(1);

    const loadDebtors = async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getDebtors();
            setDebtors(data);
        } catch {
            setError("Unable to retrieve Finance Agent data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDebtors();
    }, []);

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setPage(1);
    };

    const handleSortChange = (value) => {
        setSortBy(value);
        setPage(1);
    };

    const handleReset = () => {
        setFilters(initialFilters);
        setSortBy("outstanding-desc");
        setPage(1);
    };

    const filteredDebtors = debtors
        .filter((debtor) => {
            const matchesSearch = debtor.name.toLowerCase().includes(filters.search.trim().toLowerCase());
            const matchesRisk = !filters.risk || debtor.risk === filters.risk;
            const matchesPriority = !filters.priority || debtor.priority === filters.priority;

            let matchesAgeing = true;
            if (filters.ageing === "0-30") matchesAgeing = debtor.ageing <= 30;
            else if (filters.ageing === "31-60") matchesAgeing = debtor.ageing >= 31 && debtor.ageing <= 60;
            else if (filters.ageing === "61-90") matchesAgeing = debtor.ageing >= 61 && debtor.ageing <= 90;
            else if (filters.ageing === "90+") matchesAgeing = debtor.ageing > 90;

            return matchesSearch && matchesRisk && matchesPriority && matchesAgeing;
        })
        .sort((a, b) => {
            if (sortBy === "outstanding-asc") {
                return a.outstanding - b.outstanding;
            }
            return b.outstanding - a.outstanding;
        });

    const totalPages = Math.max(1, Math.ceil(filteredDebtors.length / PAGE_SIZE));

    const startIndex = (page - 1) * PAGE_SIZE;

    const paginatedDebtors = filteredDebtors.slice(
        startIndex,
        startIndex + PAGE_SIZE
    );

    if (loading) return <p>Loading debtors...</p>;

    if (error) {
        return (
            <div className="api-error">
                <p>{error}</p>
                <button onClick={loadDebtors}>Try Again</button>
            </div>
        );
    }

    return (
        <div className="debtors-page">
            <div className="debtors-heading">
                <div>
                    <h2>Debtor Management</h2>
                    <p>View and manage outstanding accounts</p>
                </div>

            </div>

            <div className="debtors-panel">
                <DebtorFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    sortBy={sortBy}
                    onSortChange={handleSortChange}
                    onReset={handleReset}
                />

                {filteredDebtors.length === 0 ? (
                    <div className="debtors-empty">
                        <Users size={36} />
                        <h3>No debtors found</h3>
                        <p>No debtors found matching your filters</p>
                        <button onClick={handleReset}>Clear Filters</button>
                    </div>
                ) : (
                    <>
                        <DebtorTable
                            debtors={paginatedDebtors}
                            onViewDebtor={(id) => navigate(`/debtors/${id}`)}
                        />

                        <div className="debtor-pagination">
                            <p>
                                Showing {startIndex + 1} -{" "}
                                {Math.min(
                                    startIndex + PAGE_SIZE,
                                    filteredDebtors.length
                                )}{" "}
                                of {filteredDebtors.length}
                            </p>

                            <div className="pagination-buttons">
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage((prev) => prev - 1)}
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                <span>
                                    Page {page} of {totalPages}
                                </span>

                                <button
                                    disabled={page === totalPages}
                                    onClick={() => setPage((prev) => prev + 1)}
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Debtors;
