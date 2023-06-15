import "./App.css";
import { Home, Matches, Chats, Profile, Map, Settings } from "./pages";
import AuthProvider from "./contexts/AuthContext";
import DatabaseProvider from "./contexts/DatabaseContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <DatabaseProvider>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<PrivateRoute />}>
              <Route index element={<Profile />} />
              <Route path="/admin/matches" element={<Matches />} />
              <Route path="/admin/chats" element={<Chats />} />
              <Route path="/admin/map" element={<Map />} />
              <Route path="/admin/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<Navigate to="/home" replace />}></Route>
          </Routes>
        </DatabaseProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
