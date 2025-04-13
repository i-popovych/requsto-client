import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authService } from "../../api/services/auth/auth.service";
import { SignUp } from "../../api/services/auth/libs/types/params/Signup.type";
import { Notification } from "../../packages/notification";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/shared/ui/input";
import { Button } from "@/components/ui/button";

export const Registration = () => {
  const onRegistration = async (values: SignUp) => {
    try {
      await authService.registration(values);
      Notification.success("Registration successful");
    } catch (error) {
      console.error("[REGISTRATION ERROR]", error);
      Notification.error("Registration failed");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      onRegistration({
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
      });
    },
  });

  return (
    <div
      className={cn(
        "flex flex-col gap-6 min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0"
      )}
    >
      <Card className="max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Join</CardTitle>
          <CardDescription>Create your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                required
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                required
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="text-red-500 text-sm">
                  {formik.errors.firstName}
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                required
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="text-red-500 text-sm">
                  {formik.errors.lastName}
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                required
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                required
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            >
              Sign Up
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Sign in
              </Link>
              .
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
