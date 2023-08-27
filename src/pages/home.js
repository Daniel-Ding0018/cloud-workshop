import { Container } from "react-bootstrap"
import React from 'react'
import { useEffect } from "react";
import {GetObjectCommand, S3} from "@aws-sdk/client-s3";


export default function Home(){


    useEffect = (() =>{
        var s3Client = new S3.S3Client({
            region: 'ap-southeast-2'
        });

        s3Client.send(new GetObjectCommand({Bucket:'image-bucket-mac', Key: 'text.txt'}))
    })


    return (
        <Container>
            <h1>Your Photos</h1>
        </Container>
        
    )
}

