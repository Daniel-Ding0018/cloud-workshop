import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap"
import React from "react";
import {PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { useRef } from "react";

function AddPhoto() {
  // Image ref
  const imageRef = useRef(null);

  // Amazon credentials

  const CREDENTIAL = {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  };

  const REGION = "ap-southeast-2";

  const client = new S3Client({ region: REGION, credentials: CREDENTIAL });


  const uploadPhoto = async () => {
    const inputImage = imageRef.current;
    console.log(inputImage)

  }


  return (
    <>
    <Form>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Control type="file" ref={imageRef}/>
      </Form.Group>
      <Button variant="primary" onClick={uploadPhoto}>
        Submit
      </Button>
    </Form>
    </>
  );
}

export default AddPhoto;
