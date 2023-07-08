import { protectedRoute } from "@/components/ProtectedRoute";
import { useSidebarStore } from "@/store/sidebar";
import { userStore } from "@/store/user";
import MenuItem from "@/types/MenuItem";
import {
  DASHBOARD_URL,
  DOCTOR_ROLE,
  LOGOUT_URL,
  MEDICAL_RECORD_URL,
  MY_MEDICAL_RECORD_URL,
  PATIENT_ROLE,
  USER_URL,
} from "@/utils/constants";
import roles from "@/utils/roles";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { useEffect, useState } from "react";
import {
  FaHome,
  FaSignOutAlt,
  FaUserFriends,
  FaBars,
  FaNotesMedical,
} from "react-icons/fa";

export function Dashboard(Page: any) {
  const Dashboard: NextPage = () => {
    const user = userStore((state) => state.user);

    const { sidebarIsOpen, setSidebarIsOpen } = useSidebarStore();

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
            url: USER_URL,
            icon: <FaUserFriends />,
          });
        }

        if (roles[user.role] === DOCTOR_ROLE) {
          items.push({
            name: "Prontuários",
            url: MEDICAL_RECORD_URL,
            icon: <FaNotesMedical />,
          });
        }

        if (roles[user.role] === PATIENT_ROLE) {
          items.push({
            name: "Prontuário",
            url: MY_MEDICAL_RECORD_URL,
            icon: <FaNotesMedical />,
          });
        }

        return items;
      }
      const menu = renderMenuItems();

      setMenu(menu);
    }, [user.role]);

    function renderMenu(item: MenuItem) {
      return MenuItemIsActived(item) ? (
        <Link
          key={item.name}
          href={item.url}
          className={
            "flex flex-row items-center py-2 bg-gray-500 rounded-lg" +
            (sidebarIsOpen ? " ml-2 justify-start" : " ml-0 justify-center")
          }
        >
          <span className="flex items-center justify-center h-full w-10 text-white">
            {item.icon}
          </span>
          <span
            className={
              "text-lg font-bold transition-opacity " +
              (!sidebarIsOpen && "hidden")
            }
          >
            {item.name}
          </span>
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
          <span
            className={
              "text-lg font-bold transition-opacity " +
              (!sidebarIsOpen && "hidden")
            }
          >
            {item.name}
          </span>
        </Link>
      );
    }

    function MenuItemIsActived(item: MenuItem) {
      return item.url === router.pathname;
    }

    return (
      <>
        <div className="flex h-screen bg-slate-200">
          <div
            className={
              (sidebarIsOpen
                ? "translate-x-0 ease-out"
                : "-translate-x-full ease-in") +
              (sidebarIsOpen ? " w-48" : " w-16") +
              " fixed inset-y-0 left-0 transition-all duration-300 overflow-hidden transform bg-gray-800 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
            }
          >
            <div className="flex flex-col items-center justify-center pt-8">
              <div className="flex flex-col items-center cursor-pointer px-1">
                <Link href={DASHBOARD_URL}>
                  <Image
                    src="/images/logo.png"
                    width={sidebarIsOpen ? 120 : 40}
                    height={sidebarIsOpen ? 95 : 31}
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
                <button
                  onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                  className="text-gray-600 text-2xl font-semibold h-auto w-10"
                >
                  <FaBars />
                </button>
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

  Dashboard.getInitialProps = async (ctx: any) => {
    return Page.getInitialProps ? Page.getInitialProps(ctx) : {};
  };

  return protectedRoute(Dashboard);
}
