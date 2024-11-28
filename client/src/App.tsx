import { BrowserRouter,Routes,Route, Outlet } from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Signin from "./Pages/SignIn"
import Signup from "./Pages/Signup"
import Profile from "./Pages/Profile"
import Header from "./Components/Header"
import PrivateRoute from "./Components/PrivateRoute"
import PrivateRouteAdmin from "./Components/PrivateRouteAdmin"
import AdminLogin from './Pages/admin/AdminLogin'
import AdminHeader from "./Pages/admin/AdminHeader"
import Dashboard from "./Pages/admin/Dashboard"
import ManageUser from "./Pages/admin/ManageUser"





// Layout component for non-admin routes
const NonAdminLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

// Layout component for admin routes
const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Non-Admin Routes with Header */}
        <Route element={<NonAdminLayout />}>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/sign-in" element={<Signin />}/>
          <Route path="/sign-up" element={<Signup />}/>
          <Route 
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Admin Routes with Admin Header */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/login" element={<AdminLogin />}/>
          
          <Route 
              path="/admin/dashboard" 
              element={
               <PrivateRouteAdmin >
                  <Dashboard />
               </PrivateRouteAdmin>}/>     
          < Route
               path="/admin/user"
                element={
                <PrivateRouteAdmin >
                     <ManageUser/>
               </PrivateRouteAdmin>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
