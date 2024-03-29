import { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'


export const metadata: Metadata = {
  title: 'The New Dawn Hope Foundation',
  description: `Bringing new dawn for children's future`,
  icons: {
    icon: '/logo-square.png',
    shortcut: '/logo-square.png',
  },
  keywords: ['donation', 'donate', 'foundation', 'new dawn', 'hope', 'children']
}

const poppins = Poppins({ weight: ['700', '600', '500', '300'], subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body>{children}</body>
    </html>
  )
}
