import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from './firebase';

const storage = getStorage(app);

export async function uploadToFirebaseStorage(
  file: File,
  folder: string = 'uploads/'
): Promise<string> {
  try {
    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}_${sanitizedName}`;
    
    // Create reference to storage location
    const storageRef = ref(storage, `${folder}${filename}`);
    
    // Upload file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file to Firebase Storage:', error);
    throw error;
  }
}

export async function uploadImageFromDataURL(
  dataURL: string,
  folder: string = 'uploads/',
  filename?: string
): Promise<string> {
  try {
    // Convert data URL to blob
    const response = await fetch(dataURL);
    const blob = await response.blob();
    
    // Generate filename if not provided
    const finalFilename = filename || `upload_${Date.now()}.png`;
    
    // Create reference to storage location
    const storageRef = ref(storage, `${folder}${finalFilename}`);
    
    // Upload blob
    const snapshot = await uploadBytes(storageRef, blob);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading data URL to Firebase Storage:', error);
    throw error;
  }
}