import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { blogBaseUrl } from "@/config";

function Publish() {
    const { toast } = useToast();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handlePublish = async () => {
        const response = await fetch(`${blogBaseUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ title, content })
        });

        const data = await response.json();

        if (response.ok) {
            toast({
                title: 'Success',
                description: data.message
            });
            setTitle("");
            setContent("");
        } else {
            toast({
                title: 'Error',
                description: data.error,
                variant: "destructive"
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 mt-5">
            <h1 className="text-2xl font-bold mb-4">Publish a New Post</h1>
            <div className="flex flex-col space-y-4">
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        type="text"
                        placeholder="Enter the title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                        id="content"
                        placeholder="Type your content here."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <Button onClick={handlePublish}>Publish</Button>
            </div>
        </div>
    );
}

export default Publish;