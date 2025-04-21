import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ProductForm from './ProductForm';
import AdminDashboard from './components/AdminDashboard';

// Add explicit export default
export default function App() {
  return (
    <Router>
      <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/edit/:id" element={<ProductForm />} />
      </Routes>
    </Router>
  );
}