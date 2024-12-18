// this page shows all the blogs or posts
import BlogsCard from "@/components/BlogsCard";
import { useBlogs } from "@/hooks/use-blogs";
import AppBar from "@/components/AppBar";
import { Skeleton } from "@/components/ui/skeleton"


export function Blogs() {

    const { posts, loading } = useBlogs();

    if (loading) {
        return (
            <>
                <AppBar />
                <div className="flex flex-col space-y-6 justify-center items-center p-4 h-screen">
                    {[...Array(2)].map((_, index) => (
                        <div key={index} className="flex flex-col space-y-3 w-full max-w-lg">
                            <Skeleton className="h-[125px] w-full rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        </div>
                    ))}
                </div>



            </>)
    }


    return (
        <div>
            <AppBar />

            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Blogs Page</h1>
                <div>
                    {
                        posts?.map((post) => (
                            <BlogsCard key={post.id} id={post.id} title={post.title} content={post.content} name={post.author.name || "Anonymous"} />
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default Blogs;