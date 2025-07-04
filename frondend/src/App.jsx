// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import BookingPage from "./pages/BookingPage";
import DetailBookingPage from "./pages/DetailBookingPage";
import DetailProduct from "./pages/DetailProduct";
import AdminPage from "./pages/AdminPage";
import { AuthProvider } from "./components/AuthContext"; // path sesuai struktur kamu
import AdminRoute from "./components/adminRoute";
import ResetPassword from "./pages/LupaPassword";
import ResetPage from "./pages/ResetPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/detailbooking" element={<DetailBookingPage />} />
          <Route path="/detailproduct" element={<DetailProduct />} />
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPage />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
