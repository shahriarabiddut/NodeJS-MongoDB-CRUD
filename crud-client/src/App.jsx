import './App.css';

function App() {
  const handleAddUser = (e) =>{
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name,email};
    console.log(user);
    fetch('http://localhost:3000/users',{
      method:'POST',
      headers:{
        'content-type' : 'application/json'
      },
      body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(data =>{ 
      console.log(data)
      if(data.insertedId){
        console.log(data)
      }
    })
    // 
  }
  return (
    <>
      <h1 className="text-5xl bg-red-100 m-auto">Welcome</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name='name' /> <br />
        <input type="email" name='email' /> <br />
        <button type='submit'>Add User</button>
      </form>
    </>
  )
}

export default App
