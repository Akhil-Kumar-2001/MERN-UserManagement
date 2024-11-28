import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../app/user/store';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { adminStatus } = useSelector((state: RootState) => state.admin);

  return adminStatus ? children : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;
