import {
  Bell,
  Bookmark,
  Compass,
  Home,
  UserRound,
} from "lucide-react";

import {
  NavLink,
  Link,
} from "react-router-dom";

import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">

        <Link
          to="/home"
          className="navbar__brand"
        >
          <div className="navbar__logo">
            R
          </div>

          <span>Route Posts</span>
        </Link>

        <nav className="navbar__nav">
          <NavLink to="/home">
            <Home size={20} />
            <span>Home</span>
          </NavLink>

          <NavLink to="/explore">
            <Compass size={20} />
            <span>Explore</span>
          </NavLink>

          <NavLink to="/bookmarks">
            <Bookmark size={20} />
            <span>Saved</span>
          </NavLink>
        </nav>

        <div className="navbar__actions">
          <NavLink
            to="/notifications"
            className="navbar__icon"
          >
            <Bell size={20} />
          </NavLink>

          <NavLink
            to="/profile"
            className="navbar__profile"
          >
            <UserRound size={19} />
            <span>Profile</span>
          </NavLink>
        </div>

      </div>
    </header>
  );
}