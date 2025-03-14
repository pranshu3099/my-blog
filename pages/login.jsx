import Navbar from "@/components/navbar/layout";
import { useContext, useReducer, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/context/provider";
import { AuthContext } from "@/context/authprovider";
const Login = () => {
  const { theme } = useContext(ThemeContext);
  const { handleLogin } = useContext(AuthContext);

  const reducer = (state, action) => {
    switch (action?.type) {
      case "email":
        return { ...state, email: action.email };
      case "password":
        return { ...state, password: action.password };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
  });

  const handleAuth = (e) => {
    e.preventDefault();
    const data = state;
    handleLogin(data, e);
  };

  return (
    <>
      <Navbar />
      <div className="h-screen mx-auto w-full max-w-[1500px] p-10 flex flex-col items-center justify-center">
        <div className="mb-5">
          <h1 className="text-2xl font-bold">Login</h1>
        </div>
        <form onSubmit={handleAuth}>
          <div className="flex flex-col items-center gap-12">
            <input
              placeholder="email"
              type="email"
              value={state?.email}
              className={`border-b-2 border-blue-600 w-[350px] border-t-0 border-l-0 border-r-0 focus:outline-none bg-transparent ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
              onChange={(e) => {
                dispatch({ type: "email", email: e.target.value });
              }}
            />
            <input
              type="password"
              placeholder="password"
              value={state?.password}
              className={`border-b-2 border-blue-600 w-[350px] border-t-0 border-l-0 border-r-0 focus:outline-none bg-transparent ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
              onChange={(e) => {
                dispatch({ type: "password", password: e.target.value });
              }}
            />
            <button
              onClick={handleAuth}
              type="submit"
              className="text-white w-[200px] hover:bg-blue-800 transition duration-300 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 text-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
