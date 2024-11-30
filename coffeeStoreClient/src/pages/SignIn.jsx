import React, { useContext, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

function SignIn()  {
    const {signIn,showModal,setUser} = useContext(AuthContext);
    const [showPass,setShowPass] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogin = (e)=>{
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get('email');
        const password = form.get('password');
        signIn(email,password)
        .then((userCredential) => { 
            showModal('Welcome','Signed In SuccessFully!','success');
            const user = userCredential.user;
            setUser(user);
            const lastSignInTime = user.metadata.lastSignInTime;
            const signInInfo = {email,lastSignInTime};
            //Update sign In Info
            fetch('https://progherocoffee.vercel.app/users',{
                method:'PATCH',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(signInInfo),
            })
            .then(res=>res.json())
            .then(data=>{console.log(data);})
            //
            console.log('Signed In ',user,signInInfo);
            navigate(location?.state ? location.state :'/dashboard');
        })
        .catch((error) => {
            showModal('Error','Invalid Email/Password','error');
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
        });
    }
    return (
        <div className='min-h-fit flex justify-center items-center py-10'>
            <div className="w-10/12 md:w-10/12 lg:w-1/3 mx-auto my-4">
                <h3 className='text-center text-5xl font-bold mb-3'>SignIn</h3>
                <div className="mx-auto">
                <form className="card-body shadow-lg rounded-lg" onSubmit={handleLogin}>
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
                    <button type='submit' className="btn bg-teal-700 text-white font-semibold hover:text-teal-800 hover:font-bold hover:bg-white">Login</button>
                    </div>
                    <div className="label font-semibold mx-auto gap-2">
                        <span className="label-text">Don't Have An Account? <NavLink className='text-teal-700 font-bold hover:text-blue-800' to='/auth/signup'>Register</NavLink> </span>
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

export default SignIn