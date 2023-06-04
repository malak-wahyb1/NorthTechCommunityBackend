import axios from "axios";

export default async function (req, res, next) {
  if (req.file) {
    const imgbbApiKey = "8bcd9d41626f3d033a74947d3f950fda";
    const imgbbUploadUrl = "https://api.imgbb.com/1/upload";

    const formData = new FormData();
    formData.append("image", req.file.buffer);

    try {
      const response = await axios.post(imgbbUploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          key: imgbbApiKey,
        },
      });

      req.body.media = response.data.data.url;
    } catch (error) {
      // Handle the error
      return next(error);
    }
  }
  next();
}
