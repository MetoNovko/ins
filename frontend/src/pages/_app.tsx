import Layout from "@/components/Layout";
// import ContextProvider from "@/context/ContextProvider";
import NameserviceContextProvider from "@/context/NameserviceContextProvider";
import WalletContextProvider from "@/context/WalletContextProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletContextProvider>
      <NameserviceContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NameserviceContextProvider>
    </WalletContextProvider>
  );
}
