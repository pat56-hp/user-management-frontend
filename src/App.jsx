import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "sonner";
import Activities from "./pages/Activities";
import ProtectedAuthRoute from "./routes/ProtectedAuthRoute";
import ProtectedGuestRoute from "./routes/ProtectedGuestRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedGuestRoute>
                <Login />
              </ProtectedGuestRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedAuthRoute>
                <Dashboard />
              </ProtectedAuthRoute>
            }
          />
          <Route
            path="/activities"
            element={
              <ProtectedAuthRoute>
                <Activities />
              </ProtectedAuthRoute>
            }
          />
        </Routes>
      </AuthProvider>
      <Toaster theme="system" position="bottom-right" closeButton={true} />
    </BrowserRouter>
  );
}

export default App;
