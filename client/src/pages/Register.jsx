import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import Loader from '../components/Loader';

const Register = () => {
  const { user } = useSelector((state) => state.auth);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const submitHandler = async (data) => {
    try {
      await registerUser(data).unwrap();
      toast.success("Registration successful! Please log in.");
      navigate("/log-in");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-purple-600">HackTask Me</h2>
          <p className="mt-2 text-gray-700">Collaborate and innovate with your team!</p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-y-4">
          <Textbox
            placeholder="email@example.com"
            type="email"
            name="email"
            label="Email Address"
            className="rounded-lg h-12 w-full border-2 border-purple-300 focus:border-purple-600 focus:outline-none"
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
            placeholder="Your Name"
            type="text"
            name="name"
            label="Name"
            className="rounded-lg h-12 w-full border-2 border-purple-300 focus:border-purple-600 focus:outline-none"
            register={register("name", { required: "Name is required!" })}
            error={errors.name ? errors.name.message : ""}
          />
          
          <div className="flex gap-4">
            <Textbox
              placeholder="Your Title"
              type="text"
              name="title"
              label="Title"
              className="flex-1 rounded-lg h-12 border-2 border-purple-300 focus:border-purple-600 focus:outline-none"
              register={register("title", { required: "Title is required!" })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder="Your Role"
              type="text"
              name="role"
              label="Role"
              className="flex-1 rounded-lg h-12 border-2 border-purple-300 focus:border-purple-600 focus:outline-none"
              register={register("role", { required: "Role is required!" })}
              error={errors.role ? errors.role.message : ""}
            />
          </div>

          <Textbox
            placeholder="Your Password"
            type="password"
            name="password"
            label="Password"
            className="rounded-lg h-12 w-full border-2 border-purple-300 focus:border-purple-600 focus:outline-none"
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

          <div className="flex items-center mt-2">
            <input type="checkbox" {...register("isAdmin")} className="form-checkbox h-5 w-5 text-purple-600" />
            <label className="ml-2 text-gray-700">Admin</label>
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <Button
              type="submit"
              label="Register"
              className="w-full h-12 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-500 transition duration-300"
            />
          )}
        </form>

        <p className="mt-4 text-gray-700 text-center">
          Already have an account?{" "}
          <button onClick={() => navigate("/log-in")} className="text-purple-600 hover:underline">
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
