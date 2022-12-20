import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios';

const blog = ({ data }) => {

    const [blog, setBlog] = useState(data)
    console.log(blog)
    return (
        <main>
            {blog.map((item, idx) => {
                return (
                    <div key={idx}>
                        <Link href={`blog/${item.slug}`}>{item.title}</Link>
                        <p>{item.content}</p>
                        <small style={{ color: "red" }}>{item.author.substr(0, 20)}</small>
                    </div>
                )
            })}
        </main>
    )
}

export async function getServerSideProps(context) {
    const response = await axios.get("/api/blogs")
    const data = response?.data
    return {
        props: { data }, // will be passed to the page component as props
    }
}

export default blog