import "@/styles/globals.css";
import { ThemeProvider } from "@/context/provider";
import { AuthProvider } from "@/context/authprovider";
import { Toaster } from "react-hot-toast";
export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Toaster position="bottom-center" />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}
