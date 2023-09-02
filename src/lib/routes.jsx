import {createBrowserRouter} from "react-router-dom";
import Login from "../Components/auth/Login";
import Register from "../Components/auth/Register";
import Dashboard from "../Components/dashboard/index";
import Layout from "../Components/layout/index";

export const ROOT = '/'
export const LOGIN = '/login'
export const REGISTER = '/register'
export const PROTECTED = "/protected"
export const DASHBOARD = '/protected/dashboard'
export const router = createBrowserRouter([
    {path: ROOT, element: "Public Root"},
    {path: LOGIN, element: <Login/>},
    {path: REGISTER, element: <Register/>},

    {
        path: PROTECTED,
        element: <Layout/>,
        children: [
            {
                path: DASHBOARD,
                element: "Dashboard"
            }, {
                path: "test",
                element: "test1"
            },
        ]
    },
])