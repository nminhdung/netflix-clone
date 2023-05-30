import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/hooks/useAuth";
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";
import { store } from "../redux/store";
export default function App({ Component, pageProps }: AppProps) {
  return (
    // <RecoilRoot>
      <AuthProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </AuthProvider>
    // </RecoilRoot>
  );
}
