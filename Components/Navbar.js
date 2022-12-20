import Link from 'next/link'
import React from 'react'
import styles from "../styles/Navbar.module.css"
import { useSession, signOut, getSession } from 'next-auth/react'

const Navbar = (props) => {
  const session = useSession() 
  console.log(session)

  return (
    <div className={styles.nav}>
      <Link className={styles.link} href={"/"}>Home</Link>
      <Link className={styles.link} href={"/about"}>About</Link>
      <Link className={styles.link} href={"/blog"}>Blog</Link>
      <Link className={styles.link} href={"/contact"}>Contact</Link>
      {session?.data === null && <Link className={styles.link} href={"/login"}>login</Link>}
      {session?.data && <button onClick={signOut}>logOut</button>}

    </div>
  )
}

export default Navbar