import { RouteObject, createBrowserRouter } from "react-router-dom";
import { authRouter } from "./authRoute";
export * from "./authRoute";

const commonRoute: RouteObject[] =  [{ path: '/', element: "HOME" }];
export const router = createBrowserRouter([...authRouter, ...commonRoute])