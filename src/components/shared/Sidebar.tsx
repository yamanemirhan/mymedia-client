"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Home,
  Search,
  Compass,
  Film,
  MessageCircle,
  Heart,
  PlusSquare,
  User,
  MoreHorizontal,
  Settings,
  Activity,
  Bookmark,
  Moon,
  AlertCircle,
  LogOut,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/auth/useLogout";
import { useUserStore } from "@/stores/userStore";

export default function Sidebar() {
  const { theme, setTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(true);
  const logout = useLogout();
  const pathname = usePathname();
  const { profile } = useUserStore();

  const navItems = [
    { name: "Ana Sayfa", href: "/", icon: Home },
    { name: "Ara", href: "/search", icon: Search },
    { name: "Keşfet", href: "/explore", icon: Compass },
    { name: "Reels", href: "/reels", icon: Film },
    { name: "Mesajlar", href: "/messages", icon: MessageCircle, badge: 31 },
    { name: "Bildirimler", href: "/notifications", icon: Heart },
    { name: "Oluştur", href: "/post/create", icon: PlusSquare },
    {
      name: "Profil",
      href: profile?.username ? `/profile/${profile.username}` : "/auth/login",
      icon: User,
    },
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    const handleResize = () => setIsExpanded(!mediaQuery.matches);

    handleResize();
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 border-r bg-background z-50 h-full transition-all duration-300 flex-grow}",
        isExpanded ? "w-[240px]" : "w-[72px]"
      )}
    >
      <div className="h-full flex flex-col justify-between">
        <div className="space-y-4 px-2 py-4">
          <div
            className={cn(
              "font-semibold py-2",
              isExpanded ? "px-4 text-xl" : "px-2 text-center"
            )}
          >
            {isExpanded ? "MyMedia" : "MM"}
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map(({ name, href, icon: Icon, badge }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={name}
                  href={href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "lg" }),
                    "justify-start w-full gap-3 px-3 py-7 relative",
                    isActive && "bg-muted text-primary"
                  )}
                >
                  <Icon className="!h-6 !w-6" />
                  {isExpanded && <span className="text-lg">{name}</span>}
                  {badge && (
                    <span className="absolute top-2 left-7 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      {badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-2 mb-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  "justify-start w-full gap-3 px-3 hover:cursor-pointer"
                )}
              >
                <MoreHorizontal className="!h-6 !w-6" />
                {isExpanded && <span>Daha fazla</span>}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Ayarlar</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Activity className="mr-2 h-4 w-4" />
                <span>Hareketlerin</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bookmark className="mr-2 h-4 w-4" />
                <span>Kaydedilenler</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Moon className="mr-2 h-4 w-4" />
                <span>Görünümü değiştir</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <AlertCircle className="mr-2 h-4 w-4" />
                <span>Bir sorun bildir</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-gray-600">
                <span>Hesap Değiştir</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Çıkış yap</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  );
}
