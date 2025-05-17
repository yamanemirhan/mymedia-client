import AuthProtection from "@/components/shared/AuthProtection";
import Rightbar from "@/components/shared/Rightbar";
import Sidebar from "@/components/shared/Sidebar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProtection>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-4 py-6 ml-[72px] lg:ml-[240px] lg:mr-[350px] transition-all">
          {children}
        </main>
        <Rightbar />
      </div>
    </AuthProtection>
  );
}