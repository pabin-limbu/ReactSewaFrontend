import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <Outlet /> : <Navigate to={"/"} replace />;
  // Outlet is a compnent from react-router-dom that is responsible as a placeholder for the routes to be rendered.
  // Within a routes component we can use outlet anywhere to render the nested route.
  // if i use outet in about page and the route matches some url it will render the particular component in about page in outlet vomponent.
}

export default ProtectedRoute;
