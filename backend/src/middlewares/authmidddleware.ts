import { Context, Next } from 'hono';
import { verify } from 'hono/jwt'

export const authMiddleware = async (c: Context, next: Next) => {
    // get the jwt from the header
    //verify the jwt
    //if the jwt is valid then call the next middleware
    //if the jwt is invalid then return a 403 error

    const token = c.req.header('Authorization');
    if (!token) {
        c.status(401);
        return c.json({ error: "unauthorized" })
    }



    const jwt = token.split(' ')[1];


    // Check the Bearer token

    if(token.split(' ')[0] !== 'Bearer'){

        c.status(401);
        return c.json({ error: "unauthorized" })
    }

    

    const payload = await verify(jwt, c.env.JWT_SECRET) as { id: string };

    if (!payload) {
        c.status(403);
        return c.json({ error: "invalid jwt" })
    }

    c.set('userId', payload.id);

    await next();

}