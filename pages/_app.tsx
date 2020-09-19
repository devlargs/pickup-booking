import "styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import Meta from "components/Meta";
import Navbar from "components/Navbar";
import { Provider } from "react-redux";
import store from "store";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Meta />
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
