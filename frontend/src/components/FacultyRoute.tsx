import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

const FacultyRoute = ({ children }: { children: JSX.Element }) => {
  let location = useLocation();

  const { user } = useAppSelector((state: RootState) => state.auth);

  if (user && user.role === "student") {
    return <Navigate to="/home" state={{ from: location }} />;
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
};

export default FacultyRoute;
