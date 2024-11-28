import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { 
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOut,
} from '../../redux/user/userSlice';
import { RootState } from '../../app/user/store'; // Adjust import based on your store configuration

// Type definitions
type FormData = {
    username: string;
    email: string;
    password: string;
    profilePicture?: File | null;
}

const Profile: React.FC = () => {
    const { currentUser, loading, error } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const fileRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<FormData>({
        username: currentUser?.username || '',
        email: currentUser?.email || '',
        password: "",
        profilePicture: null
    });

    const [updateSuccess, setUpdateSuccess] = useState(false);
    // const [imagePreview, setImagePreview] = useState<string>(
    //     process.env.UPLOADS_PATH+currentUser?.profilePicture || 
    //     "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"
    // );

    // const [imagePreview, setImagePreview] = useState<string>(
    //     currentUser?.profilePicture
    //         ?"../"+ currentUser.profilePicture
    //         : "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"
    // );
    const [imagePreview, setImagePreview] = useState<string>(
        currentUser?.profilePicture
            ? `http://localhost:3321/api${currentUser.profilePicture}`
            : "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"
    );
    

    console.log(imagePreview);
    
    
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === 'profilePicture') {
            const file = e.target.files?.[0];
            if (file) {
                setFormData({
                    ...formData,
                    profilePicture: file
                });
                
                // Create image preview
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Create FormData for file upload
        const formDataToSend = new FormData();
        formDataToSend.append('username', formData.username);
        formDataToSend.append('email', formData.email);
        
        if (formData.password) {
            formDataToSend.append('password', formData.password);
        }
        
        if (formData.profilePicture) {
            formDataToSend.append('profilePicture', formData.profilePicture);
        }

        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser?._id}`, {
                method: 'POST',
                credentials: 'include',
                body: formDataToSend
            });
            
            const data = await res.json();
            if(data.success === false){
                dispatch(updateUserFailure(data));
                toast.error("Update failed");
                return;
            }
            
            toast.success("Profile Updated successfully");
            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
        } catch (error) {
            toast.error("Something went wrong. Try again.");
            dispatch(updateUserFailure(error));
        }
    };

    const handleDeleteAccount = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser?._id}`,{
                method: 'DELETE',
                credentials: 'include'
            });
            const data = await res.json();
            if(data.success === false){
                dispatch(deleteUserFailure(data));
                toast.error("Account deletion failed");
                return;
            }
            dispatch(deleteUserSuccess());
            toast.success("Account deleted successfully");
        } catch (error) {
            dispatch(deleteUserFailure(error));
            toast.error("Something went wrong. Try again.");
        }
    };

    const handleSignOut = async () => {
        try {
            await fetch('/api/user/signout', {
                method: 'GET',
                credentials: 'include'
            });
            dispatch(signOut());
            toast.success("Signed out successfully");
        } catch (error) {
            console.error(error);
            toast.error("Sign out failed");
        }
    };

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <ToastContainer 
                position="top-right" 
                autoClose={3000} 
                hideProgressBar={false} 
                newestOnTop={false} 
                closeOnClick 
                rtl={false} 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover 
            />
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input 
                    type="file" 
                    ref={fileRef} 
                    hidden 
                    accept='image/*' 
                    id='profilePicture'
                    onChange={handleChange}
                />
                <img 
                    src={imagePreview} 
                    alt="Profile" 
                    className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2' 
                    onClick={() => fileRef.current?.click()}
                />
                
                <input 
                    defaultValue={currentUser?.username} 
                    type="text" 
                    id='username'
                    placeholder='Username' 
                    className='bg-slate-100 rounded-lg p-3' 
                    onChange={handleChange}
                />
                
                <input 
                    defaultValue={currentUser?.email} 
                    type="email" 
                    id='email'
                    placeholder='Email' 
                    className='bg-slate-100 rounded-lg p-3' 
                    onChange={handleChange}
                />
                
                <input 
                    type="password" 
                    id='password' 
                    placeholder='Password'
                    className='bg-slate-100 rounded-lg p-3' 
                    onChange={handleChange}
                />

                <button 
                    type="submit"
                    className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Update"}
                </button>
            </form>

            <div className='flex justify-between mt-5'>
                <span 
                    onClick={handleDeleteAccount} 
                    className='text-red-700 cursor-pointer'
                >
                    Delete Account
                </span>
                <span 
                    onClick={handleSignOut} 
                    className='text-red-700 cursor-pointer'
                >
                    Sign Out
                </span>
            </div>

            {error && (
                <p className='text-red-700 mt-5'>
                    {typeof error === 'string' ? error : 'Something went wrong!'}
                </p>
            )}
            
            {updateSuccess && (
                <p className='text-green-700 mt-5'>
                    User updated successfully!
                </p>
            )}
        </div>
    );
};

export default Profile;