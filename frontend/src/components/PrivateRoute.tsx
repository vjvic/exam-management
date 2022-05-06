import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  let location = useLocation();

  const { user } = useAppSelector((state: RootState) => state.auth);

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
