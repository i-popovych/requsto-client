import { Header } from "@/components/shared/layout/Header/Header";
import { useAppSelector } from "@/redux/hooks";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
};
