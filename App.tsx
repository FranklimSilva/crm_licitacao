import { Routes, Route } from "react-router-dom";

import Dashboard from "./src/pages/Dashboard";
import Leads from "./src/pages/Leads";
import Clientes from "./src/pages/Clientes";
import Oportunidades from "./src/pages/Oportunidades";
import Faturamento from "./src/pages/Faturamento";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/leads" element={<Leads />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/oportunidades" element={<Oportunidades />} />
      <Route path="/faturamento" element={<Faturamento />} />
    </Routes>
  );
}