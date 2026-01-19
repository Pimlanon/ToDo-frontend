import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import AppSidebar from "./AppSidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="w-full flex h-screen overflow-hidden">
        <AppSidebar />

        <div className="flex flex-col overflow-x-auto overflow-y-hidden flex-1 min-h-0">
          <Header />

          <main className="flex-1 p-6 min-h-0 ">
            <SidebarTrigger />
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
