// import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import uniqid from "uniqid";
//
// export async function POST(req) {
//   const data = await req.formData();
//   if (data.get("file")) {
//     const file = data.get("file");
//
//     const s3Client = new S3Client({
//       region: process.env.AWS_REGION,
//       credentials: {
//         accessKeyId: process.env.MY_AWS_ACCESS_KEY,
//         secretAccessKey: process.env.MY_AWS_SECRET_KEY,
//       },
//     });
//
//     const ext = file.name.split(".").slice(-1);
//     const newFileName = uniqid("", `.${ext}`);
//
//     const chunks = [];
//     for await (const chunk of file.stream()) {
//       chunks.push(chunk);
//     }
//     const buffer = Buffer.concat(chunks);
//     const bucket = "food-ordering-111";
//     s3Client.send(
//       new PutObjectCommand({
//         Bucket: bucket,
//         Key: newFileName,
//         ACL: "public-read",
//         ContentType: file.type,
//         Body: buffer,
//       }),
//     );
//
//     const link = "https://" + bucket + ".s3.amazonaws.com/" + newFileName;
//     console.log("ok?");
//     return Response.json(link);
//   }
//   return Response.json(true);
// }

import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import uniqid from "uniqid";

export async function POST(request) {
  const { filename, contentType } = await request.json();

  try {
    const client = new S3Client({ region: process.env.AWS_REGION });
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: uniqid(),
      Conditions: [
        ["content-length-range", 0, 10485760], // up to 10 MB
        ["starts-with", "$Content-Type", contentType],
      ],
      Fields: {
        acl: "public-read",
        "Content-Type": contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    });

    console.log({ url, fields });

    return Response.json({ url, fields });
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
