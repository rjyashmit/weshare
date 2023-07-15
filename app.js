import express from 'express';
import { firebaseStorage } from './firebase-config.js';
import { newUpload, getDetails } from '././database/firebaseDatabase.js';
import {
    ref,
    getDownloadURL,
    uploadBytesResumable,
} from 'firebase/storage'
import multer from 'multer';
import { v4 } from 'uuid';
import cors from 'cors';

const app = express();
const port = 5000;
const upload = multer();

app.use(cors());

app.get('/', (req, res) => { res.send("APIs are up and running") });

app.post('/upload', upload.single("theFile"), async (req, res) => {
    try {
        const file = req.file;
        // console.log(file);
        const { originalname, mimetype, buffer } = file;
        const storageRef = ref(firebaseStorage, `files/${v4() + originalname}`);
        const metadata = {
            contentType: mimetype,
        };
        const snapshot = await uploadBytesResumable(storageRef, buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        const numericCode = Math.floor(100000 + Math.random() * 900000);
        const fileData = {
            name: originalname,
            downloadURL: downloadURL,
            numericCode: numericCode,
        }

        newUpload(fileData);

        console.log("file uploaded");
        res.send(fileData);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/download/:numericCode', async (req, res) => {
    const fileID = req.params.numericCode;

    const fileData = await getDetails(fileID);
    console.log(fileData)

    const response = {
        url: fileData.url,
        name: fileData.name,
    };
    console.log(response)
    res.send(response);
});

app.listen(port, () => console.log(`Server started on port ${port}`));