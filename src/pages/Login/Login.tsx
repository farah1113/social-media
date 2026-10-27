import { Link, useNavigate } from "react-router-dom";
import {
  LoaderCircle,
  LockKeyhole,
  Mail,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";

import {
  loginSchema,
  type LoginFormData,
} from "../../schemas/login.schema";

import { signin } from "../../api/auth.api";
import { setToken } from "../../utils/token";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    try {
      const response = await signin(data);

      // Save the token returned from the backend
      setToken(response.data.token);

      toast.success(response.message);

      // Go to Home after successful login
      navigate("/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong"
        );
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  return (
    <div className="auth-form">
      <div className="auth-form__heading">
        <span className="auth-form__eyebrow">
          WELCOME BACK
        </span>

        <h2>Sign in to your account</h2>

        <p>Enter your details to continue.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>

          <div className="input-wrapper">
            <Mail size={18} />

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
            />
          </div>

          {errors.email && (
            <p className="form-error">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="form-group">
          <div className="label-row">
            <label htmlFor="password">
              Password
            </label>

            <button
              className="forgot-password"
              type="button"
            >
              Forgot password?
            </button>
          </div>

          <div className="input-wrapper">
            <LockKeyhole size={18} />

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
          </div>

          {errors.password && (
            <p className="form-error">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          className="auth-submit"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <LoaderCircle
                className="submit-spinner"
                size={18}
              />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      <p className="auth-switch">
        Don't have an account?{" "}
        <Link to="/register">
          Create account
        </Link>
      </p>
    </div>
  );
}