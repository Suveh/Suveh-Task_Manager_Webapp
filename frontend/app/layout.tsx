import "./globals.css";

export const metadata = {
  title: "Task Manager",
  description: "Mini Task Management System"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (

    <html lang="en">
      <body>
        {children}
      </body>
    </html>

  )
}