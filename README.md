# Hemraj AI — Finance/Debtor Agent Prototype

A responsive Finance/Debtor Agent prototype built using React and Express. The application allows users to review outstanding debtor accounts, identify collection priorities, and interact with a simulated Finance Agent.

## Live Demo

**Frontend:** https://hemraj-ai.vercel.app/

**Backend API:** https://hemraj-ai.onrender.com/api/debtors

## Tech Stack

- Frontend: React, JavaScript, Vite
- Styling: CSS
- Routing: React Router
- HTTP Client: Axios
- Icons: Lucide React
- Backend: Node.js, Express
- Deployment: Vercel (frontend), Render (backend)

## Features

### Finance Dashboard
- Total outstanding amount
- Overdue amount
- Number of debtors
- High-risk debtor count
- Collection priority list
- Recent agent activity

### Debtor Management
- Debtor table with outstanding amount, ageing, last payment, risk, and priority
- Search by debtor name
- Risk, ageing, and priority filters
- Column sorting
- Pagination
- Individual debtor details

### Finance Agent
- Finance-related query input
- Simulated responses using mock debtor data
- Outstanding balance and critical account summaries
- Recommended collection actions
- Supporting debtor data
- CSV export
- Yes/No feedback with reason selection
- Human approval confirmation before simulated sensitive actions

### User Experience
- Responsive layout
- Loading indicators
- Empty states
- API error messages
- Success confirmations

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/dashboard` | Dashboard metrics and activity |
| GET | `/api/debtors` | All debtor records |
| GET | `/api/debtors/:id` | Individual debtor details |
| POST | `/api/agent/query` | Simulated Finance Agent response |
| POST | `/api/feedback` | Submit response feedback |

## Local Setup

**Requirements:** Node.js and npm.

Clone the repository:

```bash
git clone https://github.com/Yogendra-SinghRathore/hemraj-ai.git
cd hemraj-ai
```

Install and start the backend:

```bash
cd server
npm install
node index.js
```

In a separate terminal, install and start the frontend:

```bash
npm install
npm run dev
```

The frontend uses the Vite development proxy to communicate with the backend at `http://localhost:5000`.

For production, set the frontend environment variable:

```env
VITE_API_URL=https://hemraj-ai.onrender.com/api
```

## Architecture

The application separates responsibilities into:

- **Pages:** Dashboard, Debtors, Debtor Details, Finance Agent
- **Reusable components:** Layout, dashboard cards, debtor table, filters, agent responses, feedback, confirmation
- **API layer:** Axios client and API functions
- **Backend:** Express routes returning mock financial data

React manages UI state, filtering, sorting, pagination, and user interactions. Express provides the mock API responses.

## Design Decisions

- Reusable components keep the interface consistent.
- The API layer separates frontend components from HTTP request logic.
- Mock data allows the finance workflows to be demonstrated without a production database.
- Sensitive recommendations require explicit user confirmation.
- The application uses responsive layouts for desktop and mobile screens.

## Assumptions and Limitations

- All financial records are fictional.
- The Finance Agent is simulated; it is not connected to a real LLM.
- Agent queries support a limited demonstration rather than arbitrary natural-language analysis.
- Overdue balances are approximated using an ageing threshold of more than 30 days.
- Feedback is stored temporarily in server memory and is lost when the server restarts.
- Action approval is a demonstration and does not modify debtor records.
- Authentication and role-based authorization are not implemented in this prototype.

## Production Considerations

For a real organizational deployment, the application would require:

- Authentication and server-side role-based authorization
- Department-level data access controls
- Persistent database storage
- Audit logs for sensitive financial actions
- Stronger request validation and monitoring
- Server-side pagination and filtering for large datasets
- Scalable API and agent-service architecture

## Deployment

- React frontend hosted on Vercel
- Express backend hosted on Render

The Render free service may take additional time to respond after inactivity.

## Repository

https://github.com/Yogendra-SinghRathore/hemraj-ai