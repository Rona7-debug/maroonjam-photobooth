import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/df3nxocat/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'cite-photobooth';

export const uploadImage = async (imageData) => {
  const formData = new FormData();
  formData.append('file', imageData);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const response = await axios.post(CLOUDINARY_URL, formData);
  return response.data.secure_url;
};
