import z from 'zod'

export const signupSchema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(6, {
        message:
            'Password must be atleast 6 characters'
    }).max(100, { message: 'Password must be atmost 100 characters' }),
    name: z.string().optional()
})


export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
        message:
        'Password must be atleast 6 characters'
    }).max(100, { message: 'Password must be atmost 100 characters' })
})



export const createPostSchema = z.object({
    title: z.string().min(1, { message: 'Title must be atleat one character' }).max(100, { message: 'Title must be atmost 100 characters' }),
    content: z.string().min(1, { message: 'Content must be atlest one character' }).max(1000, { message: 'Content must be atmost 1000 characters' })
})



export const updatePostSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(1, { message: 'Title must be atleat one character' }).max(100, { message: 'Title must be atmost 100 characters' }),
    content: z.string().min(1, { message: 'Content must be atlest one character' }).max(1000, { message: 'Content must be atmost 1000 characters' })
})



// exported to be used in the frontend
export type SignupInput=z.infer<typeof signupSchema>
export type SigninInput=z.infer<typeof signinSchema>
export type CreatePostInput=z.infer<typeof createPostSchema>
export type UpdatePostInput=z.infer<typeof updatePostSchema>