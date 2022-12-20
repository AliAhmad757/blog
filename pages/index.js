import Head from 'next/head'
import { Inter } from '@next/font/google'
import { useSession, getSession, signOut } from 'next-auth/react'
const inter = Inter({ subsets: ['cyrillic-ext'] })

export default function Home(props) {
console.log(props)
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <button onClick={signOut}>SignOut</button>
          <h2>This is Home Page</h2>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}