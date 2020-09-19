import "styles/global.css";
import type { AppProps } from "next/app";
import Meta from "components/Meta";
import Navbar from "components/Navbar";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Meta />
      <Navbar />
      <Component {...pageProps} />
    </>
  );
};

export default App;
