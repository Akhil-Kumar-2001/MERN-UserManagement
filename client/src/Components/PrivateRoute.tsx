import { ReactNode } from "react";
import { useSelector } from "react-redux"
import { Outlet,Navigate } from "react-router-dom";


interface PrivateRouteProps {
    children: ReactNode;
  }

const PrivateRoute = ({ children }: PrivateRouteProps) => {
//     const { currentUser } = useSelector((state:any)=>state.user);
//   return currentUser ? <Outlet /> : <Navigate to='/sign-in'/>
const currentUser = useSelector((state: { user: { currentUser: any } }) => state.user.currentUser);

return currentUser ? <>{children}</> : <Navigate to='/sign-in' />;
}
export default PrivateRoute
