import { FC } from 'react'
import { Footer } from '../Footer'
import { Header } from '../Header'

export const Layout: FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
