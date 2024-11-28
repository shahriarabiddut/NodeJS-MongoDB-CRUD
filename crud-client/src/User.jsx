import React, { useState } from 'react'
import { useLoaderData, useLocation } from 'react-router-dom'

function User() {
    const user = useLoaderData();
    const location = useLocation();
    const [view,setView] = useState(false);
    const handleUpdateUser = (e) =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const updateUser = {name,email};
        // console.log(updateUser);
        fetch(`http://localhost:3000/user/${user._id}`,{
          method:'PUT',
          headers:{
            'content-type' : 'application/json'
          },
          body: JSON.stringify(updateUser),
        })
        .then(res => res.json())
        .then(data =>{ 
          if(data.modifiedCount){
            console.log('Updated : ',data)
          }
        })
        
      }
  return (
    <div>
        {view ? 
        <>
        <h2>User</h2>
        <p>Name : {user.name}</p></>
        :
        <>
        <h2>Update ({user._id})</h2>

        <form onSubmit={handleUpdateUser}>
            <input type="text" name='name' defaultValue={user.name} /> <br />
            <input type="email" name='email' defaultValue={user.email}  /> <br />
            {/* <input type="hidden" name='id' defaultValue={user._id}  /> <br /> */}
            <button type='submit'>Update User</button>
        </form>
        </>
        }

    </div>
  )
}

export default User