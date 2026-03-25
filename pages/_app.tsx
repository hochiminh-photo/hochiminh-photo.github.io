import type { AppProps } from "next/app";
import "../styles/index.css";
import "react-medium-image-zoom/dist/styles.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
