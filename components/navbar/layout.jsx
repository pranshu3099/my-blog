import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/provider";
import { useRouter } from "next/router";
const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [bearer, setBearer] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const bearer = localStorage.getItem("Bearer");
    setBearer(bearer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("Bearer");
    router.push("/login");
  };

  return (
    <div className="flex sm:justify-between sm:items-center justify-between p-4 font-extrabold sm:w-full w-[1280px] mb-1 h-auto">
      <div className=" w-1/4 p-2">
        <a href="/">
          <h2 className="sm:text-2xl text-[80px] text-cyan-600">Pranshu's</h2>
        </a>
      </div>
      <div className=" sm:w-1/4 p-2 w-auto flex justify-end items-center h-auto">
        <ul className="flex flex-row justify-end gap-5 relative">
          <li className="">
            <a
              href="https://x.com/brocode08071934"
              target="_blank"
              className="sm:text-[20px] text-[50px] border-b-4 border-cyan-800 hover:bg-cyan-600 transition duration-300 hover:text-white"
            >
              twitter
            </a>
          </li>
          <li>
            <a
              href="https://github.com/pranshu3099"
              target="_blank"
              className="border-b-4 sm:text-[20px] text-[50px] border-cyan-800 hover:bg-cyan-600 transition duration-300 hover:text-white"
            >
              github
            </a>
          </li>
          {bearer && (
            <button
              onClick={handleLogout}
              type="button"
              className="text-white w-[90px] hover:bg-blue-800 transition duration-300 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 text-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
            >
              Logout
            </button>
          )}
          <button onClick={toggleTheme}>
            {theme === "light" ? (
              <img
                src={"/sun-light-theme-svgrepo-com.svg"}
                alt="sun"
                className="sm:w-[25px] sm:h-[25px] w-[90px] h-[50px]"
              />
            ) : (
              <img
                src={"/moon-dark-theme-svgrepo-com.svg"}
                alt="moon"
                className="sm:w-[25px] sm:h-[25px] w-[90px] h-[50px]"
              />
            )}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
