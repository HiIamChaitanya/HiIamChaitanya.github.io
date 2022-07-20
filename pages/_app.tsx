import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import MetaContainer from '@components/MetaContainer'
import Head from 'next/head'


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

