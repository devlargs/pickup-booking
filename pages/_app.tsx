import "styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import Meta from "components/Meta";
import Navbar from "components/Navbar";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Meta />
      <Navbar />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
};

export default App;
