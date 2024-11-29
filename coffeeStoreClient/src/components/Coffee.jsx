import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'
function Coffee({coffee,coffees,setCoffees}) {
    const {_id,name,photo,details,taste,supplier,quantity} = coffee;
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
                fetch(`http://localhost:5000/coffee/${_id}`,{
                    method:'DELETE'
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data)
                    if(data.deletedCount>0){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your data has been deleted.",
                            icon: "success"
                          });
                          const remainingCoffees = coffees.filter(cof=> cof._id != _id);
                          setCoffees(remainingCoffees)
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
    <div className="card lg:card-side bg-base-100 shadow-xl gap-3 p-2">
        <figure>
          <img
            src={photo}
            alt="Album"
            className='h-52 w-52 rounded-3xl' />
        </figure>
        <div className="card-body justify-center ">
          <h2 className="card-title">{name}</h2>
          <p>Taste : {taste}</p>
          <p>Supplier : {supplier}</p>
          <p>Quantity : {quantity}</p>
          <p>{details}</p>
        </div>
          <div className="flex items-center justify-center lg:justify-end ">
            <div className="flex lg:flex-col md:flex-row gap-3">
                <button className="btn btn-neutral">View</button>
                <Link to={`/updateCoffee/${_id}`} className="btn btn-neutral" >Edit</Link>
                <button className="btn btn-warning" onClick={()=>{handleDelete(_id)}} >X</button>
            </div>
          </div>
    </div>
  )
}

export default Coffee