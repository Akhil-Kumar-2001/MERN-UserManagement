import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom"
import { signInStart, signInSuccess, signInFailure } from "../../redux/user/userSlice";
import { toast } from 'react-toastify';
import OAuth from "../Components/OAuth";


const SignIn = () => {


  type formData = {
    userName: string;
    userEmail: string;
    password: string;
  }


  const [formData,setFormData] = useState<formData>({
    userName: "",
    userEmail: "",
    password: "",
  });
  // const[error,setError] = useState<boolean|null>(null);
  // const[loading,setLoading] = useState(false);
  const { loading, error } = useSelector((state:any)=> state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setFormData({
          ...formData,
          [e.target.id]:e.target.value
        });
  };

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement> ) =>{
        e.preventDefault();
        try {
          dispatch(signInStart())
          const res = await fetch('/api/user/signin',{
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json',
            },
            body:JSON.stringify(formData)
          });
          const data = await res.json();  
          if(data.success === false){
            dispatch(signInFailure(data)) 
            return;     
          }
          toast.success("Successfully logedIn")
          dispatch(signInSuccess(data))
          navigate('/')
        } catch (error:any) {
          toast.error(error.message)
          dispatch(signInFailure(error))
          const errorMessage:any = (error as Error).message || "Some error occurred"; 
        }
   
  }


  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>SignIn</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase
         hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...':'Sign In '}
          </button>
          <OAuth />
      </form>
      <div className='flex gap-2 mt-5 '>
            <p>Dont have an account?</p>
            <Link to='/sign-up'>
            <span className='text-blue-500'>Sign up</span>
            </Link>
      </div>
      <p className="text-red-700 mt-5">{error ? error.message || "Something went wrong!": ""}</p>
    </div>
  )
}

export default SignIn
