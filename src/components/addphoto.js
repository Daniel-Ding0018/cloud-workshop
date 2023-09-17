import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap"
import React from "react";
import {PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { useState } from "react";

function AddPhoto() {
  // Image ref
  const [file, setFile] = useState();

  // Amazon credentials

  const CREDENTIAL = {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  };

  const REGION = "ap-southeast-2";

  const client = new S3Client({ region: REGION, credentials: CREDENTIAL });


  // Upload photo onclick
  const handleChange = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
  }

  const uploadPhoto = async () => {
    const command = new PutObjectCommand({
      Bucket: "image-bucket-mac",
      Key: file.name,
      Body: file,
    });

    try {
      const response = await client.send(command);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
    <Form>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Control type="file" onChange={handleChange}/>
      </Form.Group>
      <Button variant="primary" onClick={uploadPhoto}>
        Submit
      </Button>
    </Form>
    </>
  );
}

export default AddPhoto;
