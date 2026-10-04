export const debtors = [
  {
    id: 1,
    name: "ABC Industries",
    outstanding: 1250000,
    ageing: 120,
    lastPayment: "2026-08-15",
    risk: "High",
    priority: "Critical",
  },
  {
    id: 2,
    name: "XYZ Ltd",
    outstanding: 720000,
    ageing: 75,
    lastPayment: "2026-09-02",
    risk: "Medium",
    priority: "High",
  },
  {
    id: 3,
    name: "PQR Pvt Ltd",
    outstanding: 380000,
    ageing: 45,
    lastPayment: "2026-09-18",
    risk: "Low",
    priority: "Medium",
  },
  {
    id: 4,
    name: "LMN Corp",
    outstanding: 260000,
    ageing: 32,
    lastPayment: "2026-09-12",
    risk: "Low",
    priority: "Medium",
  },
  {
    id: 5,
    name: "RST Enterprises",
    outstanding: 175000,
    ageing: 95,
    lastPayment: "2026-08-05",
    risk: "High",
    priority: "High",
  },
];

export const agentActivity = [
  {
    id: 1,
    message: "Analysed overdue accounts",
    time: "10:30 AM",
  },
  {
    id: 2,
    message: "Generated collection priority list",
    time: "10:15 AM",
  },
  {
    id: 3,
    message: "Identified high-risk debtors",
    time: "09:45 AM",
  },
];

export const dashboardData = {
  totalOutstanding: debtors.reduce(
    (total, debtor) => total + debtor.outstanding,
    0,
  ),

  overdueAmount: debtors
    .filter((debtor) => debtor.ageing > 30)
    .reduce((total, debtor) => total + debtor.outstanding, 0),

  totalDebtors: debtors.length,

  highRiskDebtors: debtors.filter((debtor) => debtor.risk === "High").length,

  collectionPriority: debtors
    .filter((debtor) => ["Critical", "High"].includes(debtor.priority))
    .sort((a, b) => b.outstanding - a.outstanding),

  recentActivity: agentActivity,
};
