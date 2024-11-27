import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { updateUserFailure,
    updateUserStart,
    updateUserSuccess,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure
   } from '../../redux/user/userSlice';
import { toast } from "react-toastify";
const Profile = () => {
  type formData = {
    username: string;
    email: string;
    password: string;
    profilePicture?:any;
  }
  const {currentUser ,loading, error} = useSelector((state:any)=>state.user);
  const dispatch = useDispatch()
  const fileRef = useRef<HTMLInputElement>(null);


const [formData,setFormData] = useState<formData>({
  username: currentUser.username, // Match backend field name
  email: currentUser.email, // Match backend field name
  password: "",
  profilePicture: currentUser.profilePicture
});
const [updateSuccess,setUpdateSuccess] = useState(false);

const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
  setFormData({
    ...formData,
    [e.target.id]: e.target.value
  });
};

const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        credentials: 'include',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data))
      }
      toast.success("Profile Updated successfully")
      dispatch(updateUserSuccess(data))
      // alert('successfully updated')
      setUpdateSuccess(true)
    } catch (error) {
      toast.error("Something went wrong try again")
     
      dispatch(updateUserFailure(error))
    }
}

const handleDeleteAccount = async () => {
  try {
    dispatch(deleteUserStart());
    const res = await fetch(`/api/user/delete/${currentUser._id}`,{
      method:'DELETE',
    });
    const data = await res.json();
    if(data.success === false){
      dispatch(deleteUserFailure(data))
      return ;
    }
    dispatch(deleteUserSuccess(data))
  } catch (error) {
    dispatch(deleteUserFailure(error))
  }
}
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center
      my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {/* <input type="file" ref={fileRef} hidden accept='image/*' /> */}
        <img src={currentUser.profilePicture} alt="Profile" 
        className='h-24 w-24 self-center cursor-pointer
        rounded-full object-cover mt-2' 
         />
         {/* onClick={() => fileRef.current?.click()} */}
        
        <input defaultValue={currentUser.username} type="text" id='username'
         placeholder='Username' className='bg-slate-100
        rounded-lg p-3' onChange={handleChange}/>
        <input defaultValue={currentUser.email} type="email" id='email'
         placeholder='Email' className='bg-slate-100
        rounded-lg p-3' onChange={handleChange}/>
        <input type="password" id='password' placeholder='Password'
         className='bg-slate-100
        rounded-lg p-3' onChange={handleChange}/>

        <button className='bg-slate-700 text-white p-3 
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "Loading..." : "Update"}</button>
      </form>
      <div className='flex justify-between mt-5'>
          <span onClick={handleDeleteAccount} className='text-red-700 cursor-pointer'>Delete Account</span>
          <span className='text-red-700 cursor-pointer'>Sign Up</span>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
      <p className=' text-green-700 mt-5'>{updateSuccess && 'user is updated successfully!'}</p>

    </div>
  )
}

export default Profile
