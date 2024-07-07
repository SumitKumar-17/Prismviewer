import { useState } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from './ui/textarea';


const HomePage = () => {
    const { toast } = useToast()

    const [dbType, setdbType] = useState<string>("");
    const [dbUrl, setdbUrl] = useState<string>("");
    const [uploadingPull, setUploadingPull] = useState(false);
    const [uploadingPush, setUploadingPush] = useState(false);
    const [generated, setGenerated] = useState(false);
    const [message, setMessage] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const [studioRunning, setStudioRunning] = useState(false);
    const [schema, setSchema] = useState<string>('');

    const handleTextareaChange = (event:any) => {
        setSchema(event.target.value);
    };

    const handlePrismaPull = async () => {
        setUploadingPull(true);

        try {
            const response = await axios.post('/api/schemapull', {
                dbUrl: dbUrl,
                dbType: dbType
            });

            console.log('POST response:', response.data);

            setMessage(response.data.message);
            setOutput(response.data.output);

            setUploadingPull(false);
            setGenerated(true);
            toast({
                title: "Schema Generated",
                description: "Your schema is successfully generated!",
                duration: 5000
            });
        } catch (error) {
            console.error('Error during Pulling request:', error);
            setUploadingPull(false);
            setGenerated(false);
            toast({
                title: "Error",
                description: "Error during Pulling request",
                duration: 5000,
                variant: "destructive",
            });
        }
    }

    const handlePrismaPush = async () => {
        setUploadingPush(true);

        try {
            const response = await axios.post('/api/schemapush', {
                schema:schema
            });

            console.log('POST response:', response.data);

            setMessage(response.data.message);
            setOutput(response.data.output);

            setUploadingPush(false);
            setGenerated(true);
            toast({
                title: "Schema Generated",
                description: "Your schema is successfully pushed!",
                duration: 5000
            });
        } catch (error) {
            console.error('Error during Pushing request:', error);
            setUploadingPush(false);
            setGenerated(false);
            toast({
                title: "Error",
                description: "Error during Pushing request",
                duration: 5000,
                variant: "destructive",
            });
        }
    }

    const handleClick = async () => {
        try {
            const response = await axios.get('/api/studio');
            console.log(response.data.message);
            setStudioRunning(true);
        } catch (error) {
            console.error('Error opening Prisma Studio:', error);
        }
    }

    const stopPrismaStudio = async () => {
        try {
            const response = await axios.delete('/api/studio');
            console.log(response.data.message);
            setStudioRunning(false);
        } catch (error) {
            console.error('Error stopping Prisma Studio:', error);
        }
    };
    return (
        <main className="flex flex-col items-center justify-center  bg-white p-4">
            <div className=" flex w-full lg:flex-row gap-4  max-w-4xl">

                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle className="text-xl">Pull your Database Schema</CardTitle>
                        <CardDescription>Enter the URL of your Database repository to pull the schema</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="Database-type">Database type</Label>
                                <Input
                                    onChange={(e) => {
                                        setdbType(e.target.value);
                                    }}
                                    placeholder="mysql"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="Database-url">Database Repository URL</Label>
                                <Input
                                    onChange={(e) => {
                                        setdbUrl(e.target.value);
                                    }}
                                    placeholder="mysql://root:sumit@localhost:55000/users"
                                />
                            </div>
                            <Button onClick={handlePrismaPull} className="w-full" type="submit">
                                {uploadingPull ? "Pulling ..." : "Pull"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex-1">
                <CardHeader>
                        <CardTitle className="text-xl">Push your Database Schema</CardTitle>
                        <CardDescription>Enter the schema of your Database  to push the schema</CardDescription>
                    </CardHeader>
                    <CardContent >
                        <div className="grid m-auto w-full gap-2">
                            <Textarea rows={12} placeholder="Paste your Schema here." 
                            value={schema}
                            onChange={handleTextareaChange}
                            />
                            <Button onClick={handlePrismaPush} className="w-full" type="submit">
                                {uploadingPush ? "Pushing ..." : "Push"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {generated && <Card className="w-full max-w-md mt-8">
                <CardHeader>
                    <CardTitle className="text-xl">Schema Generated Status</CardTitle>
                    <CardDescription>Your schema is successfully generated!</CardDescription>
                    <CardDescription>{message}</CardDescription>
                    <CardDescription>{output}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex gap-3'>
                        <Button
                            disabled={studioRunning}

                            onClick={handleClick}

                        >
                            Open Prisma Studio
                        </Button>

                        <Button

                            onClick={stopPrismaStudio}

                        >
                            Stop Prisma Studio
                        </Button>
                    </div>
                </CardContent>

            </Card>}
        </main>
    )
}

export default HomePage