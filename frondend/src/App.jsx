import { ssrImportKey } from "vite/module-runner";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import BookingPage from "./pages/BookingPage";
import DetailBookingPage from "./pages/DetailBookingPage";
import DetailProduct from "./pages/DetailProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/detailbooking" element={<DetailBookingPage />} />
        <Route path="/detailproduct" element={<DetailProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
