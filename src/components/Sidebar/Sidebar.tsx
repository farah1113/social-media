import {
  Bell,
  Bookmark,
  Compass,
  Home,
  Plus,
  UserRound,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import "./Sidebar.css";
interface SidebarProps {
  onCreatePost: () => void;
}

export default function Sidebar({
  onCreatePost,
}: SidebarProps) {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `sidebar__link ${isActive ? "sidebar__link--active" : ""}`;

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__logo">R</div>

        <div>
          <strong>Route</strong>
          <span>Posts</span>
        </div>
      </div>

      <nav className="sidebar__nav">
        <NavLink to="/home" className={getLinkClass}>
          <Home size={21} />
          <span>Home</span>
        </NavLink>

        <NavLink to="/explore" className={getLinkClass}>
          <Compass size={21} />
          <span>Explore</span>
        </NavLink>

        <NavLink to="/notifications" className={getLinkClass}>
          <Bell size={21} />
          <span>Notifications</span>
        </NavLink>

        <NavLink to="/bookmarks" className={getLinkClass}>
          <Bookmark size={21} />
          <span>Saved</span>
        </NavLink>

        <NavLink to="/profile" className={getLinkClass}>
          <UserRound size={21} />
          <span>Profile</span>
        </NavLink>
      </nav>

   <button
  type="button"
  className="sidebar__create"
  onClick={onCreatePost}
>
  <Plus size={20} />
  <span>Create post</span>
</button>

      <div className="sidebar__account">
        <div className="sidebar__account-avatar">
          <UserRound size={18} />
        </div>

        <div className="sidebar__account-info">
          <strong>My profile</strong>
          <span>@username</span>
        </div>
      </div>
    </aside>
  );
}