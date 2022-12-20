import axios from 'axios';
import React, { useState } from 'react';

const slug = ({ myBlog: blog }) => {

    return (
        <main>
            <div>
                <p style={{ color: "red", fontSize: "20px" }}>{blog?.title}</p>
                <p style={{ margin: "20px 0px" }}>{blog?.content}</p>
                <p style={{ margin: "20px 0px" }}>{blog?.author}</p>
            </div>
        </main>
    )
}

export async function getServerSideProps(context) {
    const { slug } = context.query;
    const response = await axios.get(`/api/getBlogs?slug=${slug}`)
    const myBlog = response?.data
    return {
        props: { myBlog }, // will be passed to the page component as props
    }
}


export default slug;