import React, { useState } from 'react'
import { useSession, signIn } from 'next-auth/react'

const login = () => {
    const session = useSession()
    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    const handle = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const saveReq = async (e) => {
        e.preventDefault()
        const status = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: "/"
        })
        console.log(status)
    }


    const google = () => {
        signIn("google", { callbackUrl: "http://localhost:3000/" })
    }

    const github = () => {
        signIn("github", { callbackUrl: "http://localhost:3000/" })
    }

    return (
        <main>
            <form onSubmit={saveReq}>
                <div className="inputBox">
                    <label>Username</label>
                    <input type="email" name="email" value={values?.email} onChange={handle} />
                </div>
                <div className="inputBox">
                    <label>Password</label>
                    <input type="password" name="password" value={values?.password} onChange={handle} />
                </div>
                <input type="submit" name="sign-in" value="Sign In" />
            </form>

            <div className='margin'>
                <button onClick={google}>Sign in With google</button>
                <button onClick={github}>Sign it With github</button>
            </div>
        </main>
    )
}

export default login