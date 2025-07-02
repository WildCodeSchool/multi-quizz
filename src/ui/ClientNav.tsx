"use client";

import { useState } from "react";
import ButtonBurger from "@/ui/BurgerButton";
import Sidebar from "@/ui/SideBar";

export default function ClientNav({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <ButtonBurger onClick={openSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      {children}
    </>
  );
}
