import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import { authMiddleware } from "../middlewares/authmidddleware";
import { createPostSchema,updatePostSchema } from "@dinesh10x/medium-common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
    Variables: {
        userId: string;
    }
}>();

// use the auth middleware
blogRouter.use(authMiddleware);

// create blog route
blogRouter.post('/', async (c) => {

    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const {success}=createPostSchema.safeParse(body);

    if(!success){
        c.status(403);
        return c.json({error:"Invalid post input"});
    }




    try{

        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        });
    
    
        return c.json({ message: "Post created", post: post });
    }
    catch(e){
        c.status(403);
        return c.json({ error: "error while creating post" });
    }

});

// update the blog route

blogRouter.put('/',async (c)=>{

    const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const body = await c.req.json();

    const {success}=updatePostSchema.safeParse(body);

    if(!success){
        c.status(403);
        return c.json({error:"Invalid post input"});
    }

    

    try{

        const post=await prisma.post.update({
            where:{
                id:body.id,
                authorId:userId
            },
            data:{
                title:body.title,
                content:body.content
            }
        })

        return c.json({message:"Post updated",post:post});


    }
    catch(e){
        c.status(403);
        return c.json({error:"error while updating post"});
    }

})

blogRouter.get('/bulk',async (c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });

    return c.json({message:"Posts fetched",posts:posts});

})

blogRouter.get('/:id',async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param('id');

    const post = await prisma.post.findUnique({
		where: {
			id
		},
        select:{
            id:true,
            content:true,
            title:true,
            author:{
                select:{
                    name:true
                }
            }
        }
	});

	return c.json(post);

})


