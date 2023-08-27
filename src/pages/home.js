import { Container } from "react-bootstrap"
import React from 'react'
import { useEffect } from "react";
import {GetObjectCommand, S3} from "@aws-sdk/client-s3";


export default function Home(){
    const s3Client = new S3.S3Client({
        region: "ap-southeast-2"
      });

    useEffect(() =>{
        

        console.log(s3Client.send(new GetObjectCommand({Bucket:'image-bucket-mac', Key: 'text.txt'})))
    })


    return (
        <Container>
            <h1>Your Photos</h1>
        </Container>
        
    )
}

