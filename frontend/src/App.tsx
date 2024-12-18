import { Routes,Route } from "react-router-dom";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import Publish from "./pages/Publish";


function App(){
  return <>

  <Routes>
    <Route path="/blogs" element={<Blogs/>}></Route>
    <Route path="/signup" element={<Signup/>}></Route>
    <Route path="/signin" element={<Signin/>}></Route>
    <Route path="/blogs/:id" element={<Blog/>}></Route>
    <Route path="/publish" element={<Publish/>}></Route>

  </Routes>



  
  </>
}

export default App;