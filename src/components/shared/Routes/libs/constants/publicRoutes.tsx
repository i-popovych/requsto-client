import { Navigate } from "react-router-dom";

import { Login } from "@/pages/login";

import { Registration } from "@/pages/registration/Registration";
import { PublicRoutes } from "@/components/shared/Routes/libs/constants/publicRoutes.enum";
import { Wrapper } from "@/components/shared/ui/Wrapper";

export const publicRoutes = [
  {
    path: PublicRoutes.MAIN,
    element: <Navigate to={PublicRoutes.LOGIN} />,
  },
  {
    path: PublicRoutes.LOGIN,
    element: <Login />,
  },
  {
    path: PublicRoutes.REGISTRATION,
    element: (
      <Wrapper>
        <Registration />
      </Wrapper>
    ),
  },
  {
    path: "*",
    element: <Navigate to={PublicRoutes.LOGIN} />,
  },
];
