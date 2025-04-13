import { Navigate } from "react-router-dom";

import { Profile } from "@/pages/profile/Profile";

import { Company } from "@/packages/company/Company";
import MailPage from "@/packages/mail/page";
import SettingsProfilePage from "@/packages/settings/page";
import { Team } from "@/packages/team/Team";
import { Dashboard } from "@/pages/dashboard/Dashboard";
import { ProtectedRoute } from "../../ProtectedRoute";
import { PrivateRoutes } from "./privateRoutes.enum";

export const privateRoutes = [
  {
    path: PrivateRoutes.MAIN,
    element: <ProtectedRoute />,
    children: [
      { path: PrivateRoutes.MAIN, element: <MailPage /> },
      { path: PrivateRoutes.DASHBOARD, element: <Dashboard /> },
      { path: PrivateRoutes.PROFILE, element: <Profile /> },
      { path: PrivateRoutes.SETTINGS, element: <SettingsProfilePage /> },
      { path: PrivateRoutes.TEAM, element: <Team /> },
      { path: PrivateRoutes.COMPANY, element: <Company /> },
      { path: "*", element: <Navigate to={PrivateRoutes.MAIN} /> },
    ],
  },
];
