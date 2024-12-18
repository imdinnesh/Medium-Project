import { useBlog } from "@/hooks/use-blogs";
import { useParams } from "react-router-dom";

function Blog(){

    const {id}=useParams()

    const {post,loading}=useBlog({
        id:id||''
    })

    if(loading){
        return <div>Loading...</div>
    }

    console.log(post?.author.name);



    return (



        <div>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
                <div>
                    <p>{post?.content}</p>
                    <p>Author: {post?.author.name || "Anonymous"}</p>
                </div>
            </div>
        </div>
    )
}

export default Blog;