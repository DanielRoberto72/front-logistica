import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import router from "next/router";
import Logout from "@/infrastructure/api-gerenciamento-logistico/logout";
import { destroyCookie, parseCookies } from "nookies";

const navigation = [
  { name: "Dashboard", href: "/dashboard", current: false },
  { name: "Envios", href: "/envios", current: false },
  { name: "Reenvios", href: "/envios", current: false },
  { name: "Consultas", href: "/consultas", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface HeaderProps {
  page: string;
}

export default function Header(props: HeaderProps) {
  
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    const {['user']: user} = parseCookies();
    setUser(user);
  }, []);

  const logout = async () => {
    const logout = new Logout();
    try {
      await logout.logout(user);
      const cookies = parseCookies();
      for (const cookieName in cookies) {
        destroyCookie(null, cookieName);
      }
      router.push("/");
    } catch (error) {
      const cookies = parseCookies();
      for (const cookieName in cookies) {
        destroyCookie(null, cookieName);
      }
      router.push("/");
    }
  };
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" style={{backgroundColor: '#0000F9'}}>
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                
                  <div className="flex items-center">
                  <img
                  className="mx-auto h-8 m-2 w-auto"
                  src="/assets/surf-logo.png"
                  alt="Surf Logo"
                />
                    <div className="flex-shrink-0"></div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-blue-800 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex items-center rounded-full w-full h-full p-2 bg-blue-800 text-sm">
                            <div className="text-base font-medium leading-none text-white">
                              {user}
                            </div>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute p-2 right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <button type="button" onClick={logout}>
                              logout
                            </button>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <div className="text-base font-medium leading-none text-white">
                        {user}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    <Disclosure.Button
                      onClick={logout}
                      key={"logout"}
                      as="a"
                      href={"/"}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      logout
                    </Disclosure.Button>
                  </div>
                </div>
              </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <header className="bg-white">
                <div className="py-4 sm:px-6 border-2">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    {props.page}
                  </h1>
                </div>
              </header>
            </div>
    </>
  );
}

