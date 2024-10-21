import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../schemas/index";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle";
import { loginUser } from "../../store/user/userThunk";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ImSpinner8 } from "react-icons/im";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginLoader } = useSelector((state) => state?.user);
  const [showPassword, setShowPassword] = useState(false);

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
    const result = LoginSchema.safeParse(data);
    if (result?.success) {
      let payload = {
        email: data.email,
        password: data.password,
      };

      dispatch(
        loginUser({
          payload,
          onSuccess: (msg) => {
            toast.success("User Login Successfully");
            navigate("/dashboard/operator-list");
          },
          onError: (msg) => {
            toast.error(msg);
          },
        })
      );
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
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register("password")}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                placeholder="Enter your password"
                required
              />
              <div
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className={`absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2  `}
              >
                {showPassword ? (
                  <FaEye className="text-zinc-400" size={20} />
                ) : (
                  <FaEyeSlash className="text-zinc-400" size={20} />
                )}
              </div>
            </div>
            <p className="mt-1 text-sm text-destructive">
              {errors?.password?.message}
            </p>
          </div>

          <button
            type="submit"
            disabled={loginLoader}
            className="mt-4 mb-2 w-full py-2 px-4 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
          >
            {loginLoader ? <ImSpinner8 className="spinning-icon" /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
