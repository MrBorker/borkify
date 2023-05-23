import "./App.css";
import { Home, Admin } from "./pages";
import AuthProvider from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
