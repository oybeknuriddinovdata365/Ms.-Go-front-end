import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Shifokorlar from "./pages/Shifokorlar";
import Arizalar from "./pages/Arizalar";
import Bemorlar from "./pages/Bemorlar";
import Adminstrator from "./pages/Adminstrator";
import ProfileEdit from "./pages/ProfileEdit";
import DashboardLayout from "./layouts/DashboardLayout";
import LogoutModal from "./components/LogoutModal";
import DoctorDetail from "./pages/DoctorDetail";
import PatientDetail from "./pages/PatientDetail";
import DoctorAppointments from "./components/DoctorAppointments";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {
  return (
    <>
    <LogoutModal/>
    <Routes>
      
      <Route
        path="/"
        element={
          <PublicRoute>
            <Navigate to="/login" />
          </PublicRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shifokorlar" element={<Shifokorlar />} />
        <Route path="/arizalar" element={<Arizalar />} />
        <Route path="/bemorlar" element={<Bemorlar />} />
        <Route path="/administrator" element={<Adminstrator />} />
        <Route path="/profile" element={<ProfileEdit />} />

        <Route path="/shifokorlar/:id" element={<DoctorDetail />} />
        <Route path="/bemorlar/:id" element={<PatientDetail/>} />
        <Route path="/shifokorlar/:id/qabullar" element={<DoctorAppointments/>} />
      </Route>

    </Routes>
    </>
  );
}
