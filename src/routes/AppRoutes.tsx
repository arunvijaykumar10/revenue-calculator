import { Routes, Route, Navigate  } from "react-router-dom";
import AuthPages from "../pages/Auth";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/index.html" element={<Navigate to="/" replace />} />
      <Route path="/">
        <Route index element={<AuthPages />} />
        <Route path="auth" element={<AuthPages />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
