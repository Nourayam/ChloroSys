import './globals.css'

export const metadata = {
  title: 'Plant Watering Tracker',
  description: 'Keep your plants happy and hydrated',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
