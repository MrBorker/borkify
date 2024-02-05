import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import { PrivateRoute } from "./PrivateRoute";
import AuthProvider from "./contexts/AuthContext";
import { Home, Matches, Chats, Profile, Map, Settings } from "./pages";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
