'use client'
import { useState } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"
import Router from 'next/router'

export default function Home() {
  const [dbUrl, setdbUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [studioRunning, setStudioRunning] = useState(false);

  const handlePrisma = async () => {
    setUploading(true);

    try {
      const response = await axios.post('/api/schema', {
        dbUrl: dbUrl
      });

      console.log('POST response:', response.data);

      setMessage(response.data.message);
      setOutput(response.data.output);  

      setUploading(false);
      setGenerated(true);
    } catch (error) {
      console.error('Error during POST request:', error);
      setUploading(false);
     
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
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Push your Database Url</CardTitle>
          <CardDescription>Enter the URL of your Database repository to deploy it</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="Database-url">Database Repository URL</Label>
              <Input 
                onChange={(e) => {
                  setdbUrl(e.target.value);
                }} 
                placeholder="database url" 
              />
            </div>
            <Button onClick={handlePrisma}  className="w-full" type="submit">
              {uploading ? "Pushing ..." : "Push"}
            </Button>
          </div>
        </CardContent>
      </Card>
      {generated && <Card className="w-full max-w-md mt-8">
        <CardHeader>
          <CardTitle className="text-xl">Schema Generated Status</CardTitle>
          <CardDescription>Your schema is successfully generated!</CardDescription>
          <CardDescription>{message}</CardDescription>
          <CardDescription>{output}</CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
       
      </Card>}
    </main>
  )
}