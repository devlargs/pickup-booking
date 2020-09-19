import "styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import Meta from "components/Meta";
import Navbar from "components/Navbar";
import { Provider } from "react-redux";
import store from "store";
import NProgress from "nprogress";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const nprogressStart = () => NProgress.start();
    const nprogressDone = () => {
      NProgress.done();
    };
    router.events.on("routeChangeStart", nprogressStart);
    router.events.on("routeChangeComplete", nprogressDone);
    router.events.on("routeChangeError", nprogressDone);

    return () => {
      router.events.off("routeChangeStart", nprogressStart);
      router.events.off("routeChangeComplete", nprogressDone);
      router.events.off("routeChangeError", nprogressDone);
    };
  }, []);

  return (
    <Provider store={store}>
      <Meta />
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
