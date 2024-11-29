import React from 'react'
import Swal from 'sweetalert2'

function AddCoffee() {
    const handleAddCoffee = (e)=>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const quantity = form.quantity.value;
        const category = form.category.value;
        const supplier = form.supplier.value;
        const taste = form.taste.value;
        const chef = form.chef.value;
        const details = form.details.value;
        const photo = form.photo.value;
        const newCoffee = {name,quantity,category,supplier,taste,chef,details,photo};
        fetch('http://localhost:5000/coffee',{
             method:'POST',
             headers:{
                'content-type':'application/json'
             },
             body:JSON.stringify(newCoffee),
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.insertedId){
                Swal.fire({
                    title: 'Success!',
                    text: 'Successfully Added A New Coffee!',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })
            }
        })
        form.reset();
    }
  return (
    <div>
        
        <div className="form mx-auto w-10/12 my-10 bg-base-200 p-2 rounded-xl">
        <div className="flex flex-col p-4 my-4">
            <h3 className="text-3xl text-center py-3 font-extrabold font-rancho">Add New Coffee</h3>
            <p className=" text-gray-700 text-center w-10/12 mx-auto py-3">It is a long established fact that a reader will be distraceted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.</p>
        </div>
            <form onSubmit={handleAddCoffee}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
                    <div className="grid gap-4">
                        <label className="input input-bordered flex items-center gap-2">
                        Name
                        <input type="text" name='name' className="grow" placeholder="Coffee Name" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                        Supplier
                        <input type="text" name='supplier' className="grow" placeholder="Coffee Supplier" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                        Category
                        <input type="text" name='category' className="grow" placeholder="Coffee Category" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                        Quantity
                        <input type="text" name='quantity' className="grow" placeholder="Coffee Stock Quantity" />
                        </label>
                    </div>
                    <div className="grid gap-4">
                        <label className="input input-bordered flex items-center gap-2">
                            Photo
                            <input type="text" name='photo' className="grow" placeholder="Coffee Supplier" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                        Chef
                        <input type="text" name='chef' className="grow" placeholder="Coffee Chef Details" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                        Taste
                        <input type="text" name='taste' className="grow" placeholder="Coffee Taste" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                        Details
                        <input type="text" name='details' className="grow" placeholder="Coffee Details" />
                        </label>
                    </div>
                </div>
                <button type="submit" className='btn bg-[#d2b48c] text-xl font-semibold italic font-rancho w-full'> Add Coffee </button>
            </form>
        </div>
    </div>
  )
}

export default AddCoffee