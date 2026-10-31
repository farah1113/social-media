import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
import CreatePostModal from "../components/CreatePostModal/CreatePostModal";

import "./MainLayout.css";

export default function MainLayout() {
  const [isCreatePostOpen, setIsCreatePostOpen] =
    useState(false);

  function openCreatePostModal() {
    setIsCreatePostOpen(true);
  }

  function closeCreatePostModal() {
    setIsCreatePostOpen(false);
  }

  return (
    <>
      <div className="main-layout">

        <Sidebar
          onCreatePost={openCreatePostModal}
        />

        <div className="main-layout__content">
          <Outlet />
        </div>

      </div>

      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={closeCreatePostModal}
        onPostCreated={() => {}}
      />
    </>
  );
}