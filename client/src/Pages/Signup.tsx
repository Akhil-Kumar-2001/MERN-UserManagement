import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import OAuth from "../Components/OAuth";


const Signup = () => {


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
  const[error,setError] = useState<boolean|null>(null);
  const[loading,setLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setFormData({
          ...formData,
          [e.target.id]:e.target.value
        });
  };

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement> ) =>{
        e.preventDefault();
        try {
          setLoading(true);
          setError(false)
          const res = await fetch('/api/user/signup',{
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json',
            },
            body:JSON.stringify(formData)
          });
          const data = await res.json();  
          setLoading(false);
          if(data.success === false){
            setError(true);  
            return;     
          }
          navigate('/sign-in')
        } catch (error) {
          setLoading(false);
          const errorMessage:any = (error as Error).message || "Some error occurred"; 
          setError(errorMessage);
        }
   
  }


  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Signup</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
        <input type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase
         hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...':'Sign Up '}
          </button>
          <OAuth />
      </form>
      <div className='flex gap-2 mt-5 '>
            <p>Have an account?</p>
            <Link to='/sign-in'>
            <span className='text-blue-500'>Sign In</span>
            </Link>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
    </div>
  )
}

export default Signup
