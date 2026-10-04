import client from "./client";

export const getDashboard = async () => {
  const response = await client.get("/dashboard");
  return response.data;
};

export const getDebtors = async () => {
  const response = await client.get("/debtors");
  return response.data;
};
export const getDebtorById = async (id) => {
  const response = await client.get(`/debtors/${id}`);
  return response.data;
};
export const askFinanceAgent = async (query) => {
  const response = await client.post("/agent/query", { query });
  return response.data;
};
export const submitAgentFeedback = async (feedback) => {
  const response = await client.post("/feedback", feedback);
  return response.data;
};
