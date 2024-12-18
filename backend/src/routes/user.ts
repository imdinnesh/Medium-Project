import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { signinSchema,signupSchema } from '@dinesh10x/medium-common';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

// signup route
userRouter.post('/signup', async (c) => {


    // creata a prism client
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    // get the body
    const body = await c.req.json();

    // validate the body
    const {success}=signupSchema.safeParse(body);

    if(!success){
        c.status(403);
        return c.json({error:"Invalid user input"})
    }



    try {



        // create a user
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        });

        // create a jwt
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.json({ message: "Signup Succesful", jwt: jwt });

    } catch (e) {
        c.status(403);
        return c.json({ error: "error while signing up" });
    }

})

// signin route
userRouter.post('/signin', async (c) => {

    // creata a prism client
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    // get the body

    const body = await c.req.json();

    // validate the body
    const {success}=signinSchema.safeParse(body);

    if(!success){
        c.status(403);
        return c.json({error:"Invalid user input"})
    }



    // get the user

    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })

    if (!user) {
        c.status(403)
        return c.json({ error: "user not found. Please signup" })
    }

    // check the password
    if (user.password !== body.password) {
        c.status(403)
        return c.json({ error: "password is incorrect" })
    }

    // create a jwt 

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ message: "Signin Succesful", jwt: jwt })

})