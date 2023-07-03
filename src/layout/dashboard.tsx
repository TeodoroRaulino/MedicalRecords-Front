import { protectedRoute } from "@/components/ProtectedRoute";
import { userStore } from "@/store/user";
import MenuItem from "@/types/MenuItem";
import { DASHBOARD_URL, DOCTOR_ROLE, LOGOUT_URL } from "@/utils/constants";
import roles from "@/utils/roles";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { useEffect, useState } from "react";
import { FaHome, FaSignOutAlt, FaUserFriends, FaBars } from "react-icons/fa";

export function Dashboard(Page: any) {
  const Dashboard: NextPage = () => {
    const user = userStore((state) => state.user);

    const [menu, setMenu] = useState<MenuItem[]>([]);

    useEffect(() => {
      function renderMenuItems() {
        const items = [
          {
            name: "Dashboard",
            url: DASHBOARD_URL,
            icon: <FaHome />,
          },
        ] as MenuItem[];

        if (roles[user.role] === DOCTOR_ROLE) {
          items.push({
            name: "Usuários",
            url: "/dashboard/users",
            icon: <FaUserFriends />,
          });
        }
        return items;
      }
      const menu = renderMenuItems();

      setMenu(menu);
    }, []);

    function renderMenu(item: MenuItem) {
      return MenuItemIsActived(item) ? (
        <Link
          key={item.name}
          href={item.url}
          className="flex flex-row items-center justify-start py-2"
        >
          <span className="flex items-center justify-center h-full w-10 text-gray-400">
            {item.icon}
          </span>
          <span className="text-lg font-normal">{item.name}</span>
        </Link>
      ) : (
        <Link
          key={item.name}
          href={item.url}
          className="flex flex-row items-center justify-start py-2"
        >
          <span className="flex items-center justify-center h-full w-10 text-gray-400">
            {item.icon}
          </span>
          <span className="text-lg font-normal text-left">{item.name}</span>
        </Link>
      );
    }

    function MenuItemIsActived(item: MenuItem) {
      return item.url === router.pathname;
    }

    return (
      <>
        <div className="flex h-screen bg-slate-200">
          <div className="fixed inset-y-0 left-0 w-48 transition-all duration-300 overflow-hidden transform bg-gray-800 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0">
            <div className="flex flex-col items-center justify-center pt-8">
              <div className="flex flex-col items-center cursor-pointer">
                <Link href={DASHBOARD_URL}>
                  <Image
                    src="/images/logo.png"
                    width={120}
                    height={95}
                    alt="logo-sidebar"
                  />
                </Link>
              </div>
              <nav className="w-full py-5 px-2">
                {menu.map((item) => renderMenu(item))}
              </nav>
            </div>
          </div>

          <div className="flex flex-col flex-1 overflow-hidden w-full">
            <header className="flex justify-between items-center z-20 py-4 px-6 bg-white shadow-lg">
              <div className="flex items-center justify-center">
                <span className="text-gray-600 text-2xl font-semibold h-auto w-10">
                  <FaBars />
                </span>
              </div>
              <div className="flex items-center">
                <Link href={LOGOUT_URL} className="flex items-center">
                  <span className="flex items-center justify-center h-full w-10 text-red-600">
                    <FaSignOutAlt />
                  </span>
                  <span className="text-lg font-bold text-red-600">Sair</span>
                </Link>
              </div>
            </header>
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
              <div className="w-full bg-white">
                <Page />
              </div>
            </main>
          </div>
        </div>
      </>
    );
  };

  return protectedRoute(Dashboard);
}
