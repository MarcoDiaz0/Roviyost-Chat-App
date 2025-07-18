import axios from "axios";
import FormData from "form-data";

export const uploadImage = async (file) => {
  try {
    const form = new FormData();
    form.append("source", file.data, {
      filename: file.name,
      contentType: file.mimetype,
      knownLength: file.size,
    });

    form.append("action", "upload");
    form.append("type", "file");

    const response = await axios.post(
      `https://freeimage.host/api/1/upload?key=${process.env.IMG_HOST_KEY}`,
      form,
      {
        headers: form.getHeaders(),
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );
    return response.data.image.display_url;
  } catch (error) {
    console.error(
      "Image upload failed:",
      error.response?.data || error.message
    );
    return { error: "Image upload failed" };
  }
};
