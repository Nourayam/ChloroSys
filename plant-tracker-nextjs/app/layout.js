import './globals.css'

export const metadata = {
  title: 'ChloroSys',
  description: 'Keep Your Plants Happy, Healthy & Hydrated',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
