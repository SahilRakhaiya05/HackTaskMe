import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { toast } from "sonner";
import Loader from '../components/Loader';

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (data) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-4">
          HackTask Me
        </h2>
        <p className="text-center text-gray-700 mb-6">
          Collaborate and innovate with your team!
        </p>
        
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
          <Textbox
            placeholder="email@example.com"
            type="email"
            name="email"
            label="Email Address"
            className="w-full rounded-lg border-2 border-indigo-300 focus:border-indigo-600 focus:outline-none"
            register={register("email", {
              required: "Email Address is required!",
              pattern: {
                value: /^(?=.*@(?:gmail\.com|outlook\.com)).+$/,
                message: "Must be a valid @gmail.com or @outlook.com",
              },
            })}
            error={errors.email ? errors.email.message : ""}
          />
          
          <Textbox
            placeholder="Your Password"
            type="password"
            name="password"
            label="Password"
            className="w-full rounded-lg border-2 border-indigo-300 focus:border-indigo-600 focus:outline-none"
            register={register("password", {
              required: "Password is required!",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long!",
              },
              validate: {
                hasUpperCase: (value) =>
                  /[A-Z]/.test(value) || "Must contain at least one uppercase letter!",
                hasLowerCase: (value) =>
                  /[a-z]/.test(value) || "Must contain at least one lowercase letter!",
                hasNumber: (value) =>
                  /[0-9]/.test(value) || "Must contain at least one number!",
                hasSpecialChar: (value) =>
                  /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Must contain at least one special character!",
              },
            })}
            error={errors.password ? errors.password.message : ""}
          />

          {isLoading ? (
            <Loader />
          ) : (
            <Button
              type="submit"
              label="Login"
              className="w-full h-12 bg-indigo-600 text-white rounded-lg transition-transform transform hover:scale-105 hover:bg-indigo-700"
            />
          )}
        </form>

        <p className="mt-4 text-gray-700 text-center">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-indigo-600 hover:underline"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
