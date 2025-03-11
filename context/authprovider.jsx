import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";
const url = process.env.NEXT_PUBLIC_API_URL;
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [bearer, setBearer] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const storedToken = localStorage.getItem("Bearer");
    setBearer(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("Bearer");
    localStorage.removeItem("admin_data");
    setBearer(null);
    router.push("/login");
  };

  const handleLogin = async (data, e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/login`, {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("Bearer", result?.Authorization);
        localStorage.setItem("admin_data", JSON.stringify(result?.user));
        setBearer(result?.Authorization);
        router.push("/create");
      } else {
        console.log("Error", result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ bearer, handleLogout, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
