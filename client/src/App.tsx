// import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home"
import CreateUser from "./components/CreateUser"
import UpdateUser from "./components/UpdateUser"

const App = () => {
  // const [count, setCount] = useState(0)
  // const [view, setViewed] = useState(true)
  return (
    <div className="bg-blue-500">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/CreateUser" element={<CreateUser />}></Route>
          <Route path="/UpdateUser/:id" element={<UpdateUser />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App