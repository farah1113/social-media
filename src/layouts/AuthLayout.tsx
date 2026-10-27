import { Outlet, useLocation } from "react-router-dom";
import AuthRobot from "../components/auth/AuthRobot";
import "../styles/auth.css";

export default function AuthLayout() {
  const location = useLocation();

  const mode: "login" | "register" =
    location.pathname === "/register" ? "register" : "login";

  return (
    <main className="auth-page">
      <section className="auth-brand">
        <div className="auth-brand__content">
          <span className="auth-brand__label">ROUTE POSTS</span>

          <h1 className="auth-brand__title">
            Connect.
            <br />
            Share.
            <br />
            <em>Stay close.</em>
          </h1>

          <p className="auth-brand__description">
            A space to share moments, follow friends, and stay connected
            with your community.
          </p>
        </div>

        <AuthRobot mode={mode} />
      </section>

      <section className="auth-form-section">
        <Outlet />
      </section>
    </main>
  );
}