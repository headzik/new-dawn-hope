/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, NextUIProvider } from '@nextui-org/react'
import Navbar from 'components/Navbar'
import { FunctionComponent } from 'react'
import { theme } from 'utils/theme'


function MyApp({ Component, pageProps }: {
  Component: FunctionComponent,
  pageProps: any
}) {
  return (
    <NextUIProvider theme={theme}>
      <Navbar />
      <Container
        css={{
          minWidth: '100vw',
          minHeight: 'calc(100vh - 80px)',
        }}
      >
        <Container lg>
          <Component {...pageProps} />
        </Container>
      </Container>
    </NextUIProvider>
  )
}

export default MyApp
