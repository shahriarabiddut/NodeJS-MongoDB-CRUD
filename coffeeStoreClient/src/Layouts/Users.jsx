import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const Users = () => {
    const loadedUsers = useLoaderData();
    const [users,setUsers] = useState(loadedUsers);
    let i = 1;
    const handleDelete = (_id)=>{
        console.log(_id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://progherocoffee.vercel.app/users/${_id}`,{
                    method:'DELETE'
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data)
                    if(data.deletedCount>0){
                        Swal.fire({
                            title: "Deleted!",
                            text: "User data has been deleted.",
                            icon: "success"
                          });
                          const remainingUsers = users.filter(user=> user._id != _id);
                          setUsers(remainingUsers)
                    }else{
                        Swal.fire({
                            title: "Error!",
                            text: "There was something Wrong.",
                            icon: "error"
                          });
                    }
                })
                
              
            }
          });
    }
  return (
    <div>
        <div className="py-4 flex flex-col justify-center gap-2">
        <h2 className="text-2xl">Users </h2>
        <p className='text-xs'> No of Users {users.length}</p>
        </div>
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Created At</th>
                    <th>Last Signed In</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                        users.map(user=>
                    <tr key={user._id}>
                        <th>{i++}</th>
                        <td>{user?.name}</td>
                        <td>{user?.email}</td>
                        <td>{user.createdAt}</td>
                        <td>{user.lastSignInTime}</td>
                        <td>
                            <div className="flex gap-2">
                            <button onClick={()=>alert('clicked')} className='btn btn-neutral'>Edit</button> 
                            <button onClick={()=>handleDelete(user._id)} className='btn btn-error'>Delete</button> 
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Users