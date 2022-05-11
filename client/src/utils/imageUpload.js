export const checkImage = (file) => {
  let err = "";
  if (!file) return (err = "존재하지 않는 파일입니다");

  if (file.size > 1024 * 1024 * 2)
    //2MB
    err = "용량이 너무 큰 사진입니다";

  if (file.type !== "image/jpeg" && file.type !== "image/png")
    err = "사진 형식이 아닙니다";

  return err;
};

export const imageUpload = async (images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();
    formData.append("file", item);

    formData.append("upload_preset", "jtqncys4");
    formData.append("cloud_name", "dlb43l9iy");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dlb43l9iy/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }
  return imgArr;
};
