import React, { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'

function Users() {
    const loadedUsers = useLoaderData();
    const [users,setUsers] = useState(loadedUsers);
    const handleDeleteUser = (id)=>{
        console.log(id);
        fetch(`http://localhost:3000/users/${id}`,{
            method:'DELETE',
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.deletedCount>0){
                console.log('Successfully Deleted ! ',data);
                const remainingUSers = users.filter(user => user._id!== id);
                setUsers(remainingUSers);
            }else{
                console.log('Not Found ! ',data);
            }
        })
    }
  return (
    <>
    <div>Users - ({users.length})</div>
    <div>
    {
        users.map((user)=><div key={user._id}>
        <p>Name : {user.name} - 
            <Link to={`/users/${user._id}`}><button className='btn'>View</button> </Link> -
            <Link to={`/users/${user._id}/edit`}><button className='btn'>Update</button> </Link> -
            <button className='btn' onClick={()=>{handleDeleteUser(user._id)}}>Delete</button>
            </p>
        </div>)
    }
    </div>
    </>
  )
}

export default Users