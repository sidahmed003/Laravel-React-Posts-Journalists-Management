import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import User from "../pages/User"; 
import Register from "../pages/Register"; 
import AddPost from "../pages/AddPost";
import MyPosts from "../pages/MyPosts" ;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  { 
    path: "/ajouter-post",
     element: <AddPost /> 
  },
  { 
    path: "/myposts",
    element: <MyPosts /> 
  },
]);

export default router;

