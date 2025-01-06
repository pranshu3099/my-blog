import "@/styles/globals.css";
import { ThemeProvider } from "@/context/provider";
import { Toaster } from "react-hot-toast";
export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Toaster position="bottom-center" />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
