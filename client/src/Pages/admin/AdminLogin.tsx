    import  { useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { useNavigate } from 'react-router-dom';
  import { adminSignInStart, adminSignInSuccess, adminSignInFailure } from '../../../redux/admin/adminSlice'
import { RootState } from '../../../app/user/store';

    const AdminLogin = () => {
      const [formData,setFormData]=useState({email:"",password:""});

      const{adminLoading,error}=useSelector((state:RootState)=>state.admin);
      const dispatch=useDispatch();
      const navigate=useNavigate();

      const handleInpuChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      

      const handleLogin=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        dispatch(adminSignInStart())
        try {
          const res = await fetch('http://localhost:3321/api/admin/login',{
            method:'post',
            headers:{
              'Content-Type' :'application/json'
            },
            body:JSON.stringify(formData)
          })
          const data = await res.json();
          console.log(data)
          if(!data.status){
            dispatch(adminSignInFailure(data.message));
            return
          }
          dispatch(adminSignInSuccess(data))
          // navigate('/admin/dashboard')
          navigate('/admin/dashboard', { replace: true });
        } catch (error) {
          dispatch(adminSignInFailure(error))
        }
      }
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-md rounded-lg border border-gray-200 p-8">
              <h1 className='text-3xl text-center font-semibold mb-8 text-red-700'>Admin Login</h1>
              <form onSubmit={handleLogin} className='flex flex-col gap-4'>
              <input 
  type="email" 
  name="email" // Add this line
  value={formData.email}
  placeholder="Admin Email"
  onChange={handleInpuChange} 
  className="bg-slate-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-full" 
  required
/>
<input 
  type="password" 
  name="password" // Add this line
  placeholder="Admin Password" 
  value={formData.password}
  onChange={handleInpuChange}
  className="bg-slate-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-full" 
  required
/>

                <p className='text-red-700'>
                    {error ? error || 'Something went wrong !':""}
                </p>
                <button 
                  className='bg-red-700 text-white p-3 rounded-lg uppercase 
                  hover:opacity-95 disabled:opacity-80 transition-all duration-300 w-full 'disabled={adminLoading}
                >
                {adminLoading ? "Loading...":"Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )
    }

    export default AdminLogin