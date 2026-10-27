import { Link, useNavigate } from "react-router-dom";
import {
  AtSign,
  CalendarDays,
  LoaderCircle,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";

import {
  registerSchema,
  type RegisterFormData,
} from "../../schemas/register.schema";

import { signup } from "../../api/auth.api";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      const response = await signup(data);

      toast.success(response.message);

      navigate("/login");
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
          JOIN ROUTE POSTS
        </span>

        <h2>Create your account</h2>

        <p>Join the community and start sharing.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Full name */}
        <div className="form-group">
          <label htmlFor="name">Full name</label>

          <div className="input-wrapper">
            <User size={18} />

            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              {...register("name")}
            />
          </div>

          {errors.name && (
            <p className="form-error">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Username */}
        <div className="form-group">
          <label htmlFor="username">Username</label>

          <div className="input-wrapper">
            <AtSign size={18} />

            <input
              id="username"
              type="text"
              placeholder="e.g. farah2026"
              {...register("username")}
            />
          </div>

          {errors.username && (
            <p className="form-error">
              {errors.username.message}
            </p>
          )}
        </div>

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

        {/* Date + Gender */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dateOfBirth">
              Date of birth
            </label>

            <div className="input-wrapper">
              <CalendarDays size={18} />

              <input
                id="dateOfBirth"
                type="date"
                {...register("dateOfBirth")}
              />
            </div>

            {errors.dateOfBirth && (
              <p className="form-error">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>

            <select
              id="gender"
              className="form-select"
              defaultValue=""
              {...register("gender")}
            >
              <option value="" disabled>
                Select gender
              </option>

              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            {errors.gender && (
              <p className="form-error">
                {errors.gender.message}
              </p>
            )}
          </div>
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>

          <div className="input-wrapper">
            <LockKeyhole size={18} />

            <input
              id="password"
              type="password"
              placeholder="e.g. Farah@123"
              {...register("password")}
            />
          </div>

          {errors.password && (
            <p className="form-error">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label htmlFor="rePassword">
            Confirm password
          </label>

          <div className="input-wrapper">
            <LockKeyhole size={18} />

            <input
              id="rePassword"
              type="password"
              placeholder="Repeat your password"
              {...register("rePassword")}
            />
          </div>

          {errors.rePassword && (
            <p className="form-error">
              {errors.rePassword.message}
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
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </button>
      </form>

      <p className="auth-switch">
        Already have an account?{" "}
        <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
}