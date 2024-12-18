import { useState,useEffect } from "react";
import { blogBaseUrl } from "@/config";

interface Posts{
    id:string
    title:string
    content:string
    author:{
        name:string
    }
}

export function useBlogs(){
    const [posts,setPosts]=useState<Posts[]>()
    const [loading,setLoading]=useState(true)

    useEffect(() => {
        fetch(`${blogBaseUrl}/bulk`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.json()).then(data => {
            if (data.message === 'Posts fetched') {
                setPosts(data.posts)
                setLoading(false)
            }
        })
    }, [])

    return {posts,loading}

}

export function useBlog({id}:{id:string}){
    const [post,setPost]=useState<Posts>()
    const [loading,setLoading]=useState(true)

    useEffect(() => {
        fetch(`${blogBaseUrl}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.json()).then(data => {
            setPost(data)
            setLoading(false)
        })
    }, [id])

    return {post,loading}

}