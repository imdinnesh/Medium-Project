import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { SignupInput } from "@dinesh10x/medium-common"
import { userBaseUrl } from "@/config"

import { useToast } from "@/hooks/use-toast"

import { useNavigate } from "react-router-dom"




export function Signup() {

    const {toast}=useToast()

    const navigate=useNavigate()

    



    const [formData, setFormData] = useState<SignupInput>({
        email:'',
        password:'',
        name:''

    })

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({
            ...formData,
            [e.target.id]:e.target.value
        })
    }




    const handleSignup = async() => {



        const response=await fetch(`${userBaseUrl}/signup`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        })

        const data=await response.json()

        if(response.ok){

            toast({
                title:'Success',
                description:data.message
            })
            navigate('/signin')
            
        }
        else{
            toast({
                title:'Error',
                description:data.error,
                variant: "destructive"
            })
        }





        
    }



    return (

        <div className="flex items-center justify-center h-screen">


            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="text-2xl">Create your account</CardTitle>
                    <CardDescription className="text-xl">Signup to start positng your articles online </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" type='text' value={formData.name} onChange={handleChange} placeholder="Enter your name" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type='email' value={formData.email} onChange={handleChange} placeholder="Enter your email" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type='password' value={formData.password} onChange={handleChange} placeholder="Enter your Password" />
                        </div>
                        <Button onClick={handleSignup}>Signup</Button>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <div>
                        <p>Already have an account? <a href="/signin" className="text-blue-500">Login</a></p>
                    </div>

                </CardFooter>

            </Card>
        </div>
    )
}

export default Signup
