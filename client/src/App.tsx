import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Signin from "./Pages/SignIn"
import Signup from "./Pages/Signup"
import Profile from "./Pages/Profile"
import Header from "./Components/Header"

const App = () => {
  return <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/about" element={<About />}/>
    <Route path="/sign-in" element={<Signin />}/>
    <Route path="/sign-up" element={<Signup />}/>
    <Route path="/profile" element={<Profile />}/>
  </Routes>
  </BrowserRouter>
}

export default App