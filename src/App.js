import "./App.css";
import { Home, Matches, Chats, Profile, Map, Settings } from "./pages";
import AuthProvider from "./contexts/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { store } from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Provider store={store}>
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
        </Provider>
      </AuthProvider>
    </Router>
  );
}

export default App;
