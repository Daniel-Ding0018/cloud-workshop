import Button from "react-bootstrap/Button";
import { Toast, ToastContainer, Form } from "react-bootstrap"
import React from "react";
import {PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { useState } from "react";

let toastCounter = 0

function AddPhoto() {
  // Image ref
  const [file, setFile] = useState();
  const [toasts, setToasts] = useState([]);

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
      setToasts([
        ...toasts,
        {id: toastCounter++, name: file.name}
      ])
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
    <ToastContainer className="p-3"
          position="bottom-end"
          style={{ zIndex: 1 }}>
      {/* <Toast show={true} id="1">
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body>See? Just like this.</Toast.Body>
      </Toast>
      <Toast show={true} id="2">
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small className="text-muted">2 seconds ago</small>
        </Toast.Header>
        <Toast.Body>Heads up, toasts will stack automatically</Toast.Body>
      </Toast> */}
      {toasts.map(toast => <Toast show={true} onClose={() => setToasts(toasts.filter(t => t.id !== toast.id))}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Photo Uploaded</strong>
        </Toast.Header>
        <Toast.Body>{toast.name} was successfully uploaded</Toast.Body>
      </Toast>)}
    </ToastContainer>
    </>
  );
}

export default AddPhoto;
