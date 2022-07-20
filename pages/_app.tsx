import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import MetaContainer from '@components/MetaContainer'
import Head from 'next/head'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
  apiKey: "AIzaSyBmoZ2gX2MD5x_X4XiYwzwSs-mM3FGCONc",
  authDomain: "hiiamchaitanya-efb98.firebaseapp.com",
  projectId: "hiiamchaitanya-efb98",
  storageBucket: "hiiamchaitanya-efb98.appspot.com",
  messagingSenderId: "187738907107",
  appId: "1:187738907107:web:cf9b4859ebb86d4f10c0d6",
  measurementId: "G-FHH1NGK5WK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/profile.png" />
      </Head>

      <ThemeProvider attribute="class" enableSystem={true}>
        <MetaContainer>
          <Component {...pageProps} />
        </MetaContainer>
      </ThemeProvider>
    </div>
  )
}

export default MyApp

