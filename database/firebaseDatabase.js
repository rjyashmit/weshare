import { ref, set, get, child } from "firebase/database";
import { firebaseDatabase } from "../firebase-config.js";

const db = firebaseDatabase;

function newUpload(fileData) {
    const reference = ref(db, 'fileDetails/' + fileData.numericCode);

    set(reference, fileData);
}

async function getDetails(numericCode) {
    const dbRef = ref(db);
    const fileData = {};
    await get(child(dbRef, `fileDetails/${numericCode}`)).then((snapshot) => {
        if (snapshot.exists()) {
            fileData.url = snapshot.val().downloadURL;
            fileData.name = snapshot.val().name;
        } else {
            console.log("No data available");
            return null;
        }
    }).catch((error) => {
        console.error(error);
    });
    return fileData;
}

export { newUpload, getDetails, };