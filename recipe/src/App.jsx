import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import {Addrecipe, Recipelists, UniqueRecipe,Header,Home, Update} from './components/index'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addRecipe" element={<Addrecipe />} />
        <Route path="/recipelists" element={<Recipelists />} />
        <Route path="/updated/:id" element={<Update />} />
        <Route path="/uniqueRecipe/:id" element={<UniqueRecipe />} />
        {/* <Route path="productCard" element={<ProductCard/>}/>
        <Route path="wishlist" element={<Wishlist/>}/> */}
        {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
        {/* <ToastContainer/> */}
      </Router>
      {/* <Header/>
     <Addrecipe/> 
     <Recipelists/>
     <Update/>
     <UniqueRecipe/> */}
    </>
  )
}

export default App
