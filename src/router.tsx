import { createBrowserRouter } from "react-router-dom";
import  {Layout}  from "./Layouts/Layout";
import Profile from "./pages/Profile";
import Announcements from "./pages/Announcements";


export const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      { path: "/", 
        element: <Profile /> 
      },
      { path: "announcements", 
        element: <Announcements /> 
      },

    ]
  }
]);