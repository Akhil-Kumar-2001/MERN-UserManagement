import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../redux/user/userSlice';

const OAuth = () => {
    const dispatch = useDispatch()
    const handleGoogleClick = async () =>{
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app);
            const result = await signInWithPopup(auth,provider)
            const res = await fetch('/api/user/google',{
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    username:result.user.displayName,
                    email:result.user.email,
                    profilePicture: result.user.photoURL,
                }),
            });
            const data = await res.json();
            console.log(data);
            
            dispatch(signInSuccess(data));
        } catch (error) {
            console.log(`Could not login with google ${error}`);
            
        }
    }
  return (
  <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-white rounded-lg p-3
  uppercase hover:opacity-95'>Continue with google</button>
  )
}

export default OAuth