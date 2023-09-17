import { Container, Image, Stack } from "react-bootstrap";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  GetObjectCommand,
  S3Client,
  ListObjectsCommand,
} from "@aws-sdk/client-s3";

export default function Home() {
  const [image, setImage] = useState();

  const CREDENTIAL = {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  };

  const REGION = "ap-southeast-2";

  const client = new S3Client({ region: REGION, credentials: CREDENTIAL });

  // List objects in the bucket
  const getListObjects = async () => {
    const command = new ListObjectsCommand({
      Bucket: "image-bucket-mac",
    });

    try {
      const { Contents } = await client.send(command);

      return Contents.filter(
        (c) => c.Key.substring(c.Key.length - 3) === "jpg",
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Get object in bucket
  const getObject = async (bucketKey) => {
    const command = new GetObjectCommand({
      Bucket: "image-bucket-mac",
      Key: bucketKey.Key,
    });

    try {
      const response = await client.send(command);
      // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods
      const uintarray = (await response.Body.transformToByteArray()).buffer;
      const imageblob = URL.createObjectURL(
        new Blob([uintarray], { type: "image/png" } /* (1) */),
      );
      return imageblob;
      // imageReturn.append("hi");
      // setImage(<></>)
    } catch (err) {
      // console.error(err);
    }
  };

  // GetObject
  const mainGet = async (bucketContents) => {
    // Loop thru each object that we want to display
    let bucketBlobs = [];
    bucketContents.forEach((bucketKey) => {
      //   setImage(await getObject(bucketKey))
      bucketBlobs.push(getObject(bucketKey));
    });

    bucketBlobs = await Promise.all(bucketBlobs);

    return bucketBlobs;

    // Make the JSX
    // console.log(imageBlobHolder)
    // setImage(      <div className="p-2"><Image src={imageBlobHolder[0]}></Image></div>        )
  };

  useEffect(() => {
    async function fetchData() {
      const bucketKeys = await getListObjects();
      let bucketImages = await mainGet(bucketKeys);
      setImage(
        bucketImages.map((bucketImage, index) => {
          if (index % 5 == 0) {
            return (
              <Stack direction="horizontal" gap={5}>
                {bucketImages.slice(index, index + 5).map((bucketImage) => {
                  return (
                    <Image src={bucketImage} width={200} height={200}></Image>
                  );
                })}
              </Stack>
            );
          }
        }),
      );
    }
    fetchData();
  }, []);

  return (
    <>
      <style type="text/css">
        {`
        .Image {
          width: 170px;
          height: 180px;
        }
        `}
      </style>
      <Container>
        <h1>Your Photos</h1>
        <Stack gap={3} direction="vertical">
          {image}
        </Stack>
      </Container>
    </>
  );
}
