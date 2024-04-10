// import { createBrowserRouter } from "react-router-dom";
import { Outlet, type RouteObject } from "react-router-dom";

export const authRouter: RouteObject[] = [
    {
        path: '/auth',
        element: <div>authentication <Outlet /></div>,
        children: [
            {
                path: 'signup',
                element: <h1>signup</h1>
            }
        ]
    }
] 