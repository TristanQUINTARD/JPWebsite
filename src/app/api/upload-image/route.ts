import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = new IncomingForm();
    form.uploadDir = path.join(process.cwd(), 'public', 'uploads');
    form.keepExtensions = true;

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve([fields, files]);
      });
    });

    const file = files.image;
    if (!file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const oldPath = file.path;
    const fileName = `${Date.now()}-${file.name}`;
    const newPath = path.join(form.uploadDir, fileName);
    await fs.rename(oldPath, newPath);

    // Connect to MongoDB
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db('JPWebsite');
    const collection = db.collection('images');

    // Save image metadata to MongoDB
    const result = await collection.insertOne({
      fileName: fileName,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      uploadDate: new Date(),
    });

    await client.close();

    const imageUrl = `/uploads/${fileName}`;

    res.status(200).json({ success: true, imageUrl: imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
}