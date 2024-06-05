import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContrext";

function ProtectRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  useEffect(
    function () {
      // if (!isAuthenticated) navigate("/login");
    },
    [isAuthenticated]
  );
  return children;
}

export default ProtectRoute;
