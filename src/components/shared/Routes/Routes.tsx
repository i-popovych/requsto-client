import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { privateRoutes } from "./libs/constants/privateRoutes";
import { publicRoutes } from "./libs/constants/publicRoutes";
import { useAppSelector } from "@/redux/hooks";

export const Routes = () => {
  const { user } = useAppSelector((state) => state.user);

  const isAutorized = user;

  const routes = [...(!isAutorized ? publicRoutes : []), ...privateRoutes];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
