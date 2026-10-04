import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./components/layout/MainLayout"
import Dashboard from "./pages/Dashboard";
import Debtors from "./pages/Debtors";
import FinanceAgent from "./pages/FinanceAgent";
import DebtorDetails from "./pages/DebtorDetails";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/debtors" element={<Debtors />} />
          <Route path="/agent" element={<FinanceAgent />} />
          <Route path="/debtors/:id" element={<DebtorDetails/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
