import express from "express";
import cors from "cors";
import { agentActivity, debtors } from "./data/financeData.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["https://hemraj-ai.vercel.app", "http://localhost:5173"],
  }),
);
app.use(express.json());

const feedbackRecords = [];

app.get("/api/dashboard", (req, res) => {
  const totalOutStanding = debtors.reduce(
    (total, debtor) => total + debtor.outstanding,
    0,
  );

  const overdueAmount = debtors
    .filter((debtor) => debtor.ageing > 30)
    .reduce((total, debtor) => total + debtor.outstanding, 0);

  const collectionPriority = debtors
    .filter((debtor) => ["Critical", "High"].includes(debtor.priority))
    .sort((a, b) => b.outstanding - a.outstanding);

  res.json({
    totalOutStanding,
    overdueAmount,
    totalDebtors: debtors.length,
    highRiskDebtors: debtors.filter((d) => d.risk === "High").length,
    collectionPriority,
    recentActivity: agentActivity,
  });
});

app.get("/api/debtors", (req, res) => {
  res.json(debtors);
});

app.get("/api/debtors/:id", (req, res) => {
  const debtor = debtors.find((d) => d.id === Number(req.params.id));

  if (!debtor) {
    return res.status(404).json({ message: "Debtor not found" });
  }
  res.json(debtor);
});

app.post("/api/agent/query", (req, res) => {
  const query = req.body.query;

  if (typeof query !== "string" || !query.trim()) {
    return res.status(400).json({ message: "Query is required" });
  }

  const text = query.toLowerCase();

  const supportedTerms = [
    "debtor",
    "collection",
    "outstanding",
    "overdue",
    "priority",
    "risk",
    "payment",
    "ageing",
    "account",
  ];

  if (!supportedTerms.some((term) => text.includes(term))) {
    return res.status(422).json({
      message:
        "This demo supports debtor, outstanding payment, ageing, risk and collection priority queries.",
    });
  }

  const priorityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };

  const topDebtors = [...debtors]
    .sort((a, b) => {
      const priorityDifference =
        priorityOrder[b.priority] - priorityOrder[a.priority];
      return priorityDifference || b.outstanding - a.outstanding;
    })
    .slice(0, 5);

  const totalOutStanding = topDebtors.reduce(
    (total, debtor) => total + debtor.outstanding,
    0,
  );

  res.json({
    summary:
      "Here are five collection-priority accounts based on assigned priority and outstanding balance.",
    totalOutStanding,
    criticalAccounts: topDebtors.filter(
      (debtor) => debtor.priority === "Critical",
    ).length,
    recommendedAction:
      "Mark ABC Industries as a high-priority collection account.",
    debtors: topDebtors,
  });
});

app.post("/api/feedback", (req, res) => {
  const { useful, reason } = req.body || {};

  const validReasons = [
    "Incorrect information",
    "Missing information",
    "Not relevant",
    "Other",
  ];

  if (
    typeof useful !== "boolean" ||
    (useful === false && !validReasons.includes(reason))
  ) {
    return res.status(400).json({ message: "Invalid feedback" });
  }

  feedbackRecords.push({
    id: feedbackRecords.length + 1,
    useful,
    reason: useful ? null : reason,
  });

  res.status(201).json({ message: "Feedback submitted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http:localhost:${PORT}`);
});
