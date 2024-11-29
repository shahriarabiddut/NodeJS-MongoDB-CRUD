import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useLoaderData } from 'react-router-dom'
import Coffee from './components/Coffee'

function App() {
  const LoadedCoffees = useLoaderData();
  const [coffees,setCoffees] = useState(LoadedCoffees);

  return (
    <>
      <section>
       
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4 my-4">
        
    {
      coffees.map(coffee=> <Coffee key={coffee._id} coffee={coffee} coffees={coffees} setCoffees={setCoffees}></Coffee>)
    }
        </div>
      </section>
    </>
  )
}

export default App
