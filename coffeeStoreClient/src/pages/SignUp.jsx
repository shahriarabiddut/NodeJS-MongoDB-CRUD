import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

function SignUp()  {
    const {createNewUser,showModal,updateUserProfile,setUser} = useContext(AuthContext);
    const [showPass,setShowPass] = useState(false);
    const navigate = useNavigate();
    const handleSignUp = (e)=>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name,email,password);
        createNewUser(email,password)
        .then((userCredential) => {
            const user = userCredential.user;
            const createdAt = user?.metadata?.createdAt;
            const userDB = {
                name,email,createdAt
            };
            // Send Data to MongoDB
            fetch('https://progherocoffee.vercel.app/users',{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(userDB),
            })
            .then(res=>res.json())
            .then(data=>{console.log('User created in DB ',userDB);})
            // Show Success Modal
            showModal('Welcome','SuccessFully Registered!','success');
            // Set Data to user
            setUser(user);
            // Data to Firebase
            updateUserProfile({displayName:name})
            .then(()=>{
                navigate('/')
            }).catch((error) => {
                console.log(error);
            })
            // console.log(user);
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
            showModal('Error',errorMessage,'error');
        });
    }
    return (
        <div className='min-h-fit flex justify-center items-center py-10'>
            <div className="w-10/12 md:w-10/12 lg:w-1/3 mx-auto my-4">
                <h3 className='text-center text-5xl font-bold mb-3'>SignUp</h3>
                <div className="mx-auto">
                <form className="card-body shadow-lg rounded-lg" onSubmit={handleSignUp}>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type={showPass ? 'text':"password"} name='password' placeholder="Enter Your Password" className=" input input-bordered" required />
                    <button className=" bg-cyan-400 p-2 font-rancho rounded-2xl absolute right-2 top-10" type='button' onClick={() => setShowPass(!showPass)}>
                    {showPass ? 'Hide' : 'Show'}</button>
                    </div>
                    <div className="form-control my-6">
                    <button type='submit' className="btn bg-teal-700 text-white font-semibold hover:text-teal-800 hover:font-bold hover:bg-white">SignUp</button>
                    </div>
                    <div className="label font-semibold mx-auto gap-2">
                        <span className="label-text">Do You Have An Account? <NavLink className='text-teal-700 font-bold hover:text-blue-800' to='/auth/sinin'>Signin</NavLink> </span>
                    </div>
                </form>
                <div className="divider">OR</div>
                    <div className="form-control grid gap-3">
                    <button className='btn btn-success' > Login With Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp