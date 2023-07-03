import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaRegEnvelope, FaLock, FaLockOpen } from "react-icons/fa";
import * as yup from "yup";
import API from "@/services/api";
import { DASHBOARD_URL, TOKEN_STORAGE_KEY } from "@/utils/constants";
import { userStore } from "@/store/user";
import Router from "next/router";
import { toast } from "react-toastify";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const setProfile = userStore((state) => state.setProfile);

  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const { register, handleSubmit } = useForm<LoginForm>({
    resolver: yupResolver(validationSchema),
  });

  async function onSubmit(formValues: LoginForm) {
    const response = await API.post("/Auth/login", { ...formValues }).catch(
      (err) => {
        toast.error(err.response.data);
      }
    );

    const data = response?.data;

    if (response?.status === 200) {
      localStorage.setItem(TOKEN_STORAGE_KEY, data?.token);

      const { name, role } = data?.user;

      setProfile({
        name,
        role,
      });

      Router.push(DASHBOARD_URL);
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="flex h-screen">
          <div
            className="hidden w-3/4 h-auto bg-gray-400 bg-cover lg:block"
            style={{
              backgroundImage: "url('/images/login.jpg')",
            }}
          ></div>
          <div className="flex flex-col p-8 justify-center w-full bg-white lg:w-1/3">
            <h1 className="mb-4 py-10 text-6xl font-semibold text-gray-700 text-center">
              Login
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col mb-4">
                <label className="mb-2 ml-2 font-semibold text-gray-600 text-sm">
                  Email
                </label>
                <div className="flex relative">
                  <span className="flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <FaRegEnvelope />
                  </span>
                  <input
                    type="email"
                    className="h-10 w-full border-gray-300 border rounded-full pl-10 text-gray-600"
                    placeholder="
                    Email"
                    {...register("email")}
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label className="mb-2 ml-2 font-semibold text-gray-600 text-sm">
                  Password
                </label>
                <div className="flex relative">
                  <div
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                      {showPassword ? <FaLockOpen /> : <FaLock />}
                    </span>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="h-10 w-full border-gray-300 border rounded-full pl-10 text-gray-600"
                    placeholder="Password"
                    {...register("password")}
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <button
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                  type="submit"
                >
                  Login
                </button>
                <div className="ml-auto py-2">
                  <a
                    className="inline-block text-sm text-gray-500 align-baseline hover:text-gray-800"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
