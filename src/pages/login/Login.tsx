import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authService } from "../../api/services/auth/auth.service";
import { LoginParams } from "../../api/services/auth/libs/types/params/Login.type";
import { userService } from "../../api/services/user/user.service";
import { PublicRoutes } from "@/components/shared/Routes/libs/constants/publicRoutes.enum";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { authStorage } from "../../packages/localStorage/authStorage";
import { UserStorageKeys } from "../../packages/localStorage/enums/userStorageKeys.enum";
import { Notification } from "../../packages/notification";
import { setUser } from "../../redux/features/user/userSlice";
import { Label } from "@/components/ui/label";
import { PrivateRoutes } from "@/components/shared/Routes/libs/constants/privateRoutes.enum";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async (values: LoginParams) => {
    try {
      const response = await authService.login(values);

      const { data: user } = await userService.profile(
        response.data.data.token
      );
      dispatch(setUser(user));

      localStorage.setItem(UserStorageKeys.USER, JSON.stringify(user));
      localStorage.setItem("accessToken", response.data.data.token);
      Notification.success("Login successful");

      navigate(PrivateRoutes.SELECT_PROJECT);
    } catch (error) {
      console.error("[LOGIN ERROR]", error);
      Notification.error("Login failed");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      onLogin({
        email: values.email,
        password: values.password,
      });
    },
  });

  return (
    <div
      className={cn(
        "flex flex-col gap-6  justify-center items-center h-[100vh] "
      )}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                required
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                required
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <Button type="submit" className="w-full text-white">
              Login
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to={PublicRoutes.REGISTRATION}
                className="underline underline-offset-4"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
