import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../schemas/index";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginFormSubmit = (data) => {
    console.log("Data:", data);
    const result = LoginSchema.safeParse(data);
    if (result?.success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 ">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 m-2 md:m-0 max-w-sm w-full">
        <div className="absolute top-5 right-5">
          <ThemeToggle />
        </div>

        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">
          Login
        </h2>
        <form onSubmit={handleSubmit(onLoginFormSubmit)}>
          <div className="mb-4 flex flex-col">
            <label
              className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              placeholder="Enter your email"
              required
            />
            <p className="mt-1 text-sm text-destructive">
              {errors?.email?.message}
            </p>
          </div>
          <div className="mb-4 flex flex-col">
            <label
              className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              placeholder="Enter your password"
              required
            />
            <p className="mt-1 text-sm text-destructive">
              {errors?.password?.message}
            </p>
          </div>

          <button
            type="submit"
            className="mt-4 mb-2 w-full py-2 px-4 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
