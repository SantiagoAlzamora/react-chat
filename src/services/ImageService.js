export const getImageUrl = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "santi-preset");
    data.append("cloud_name", "santicloud");


    const res = await fetch("https://api.cloudinary.com/v1_1/santicloud/image/upload",
        {
            method: "post",
            body: data,
        })
    const resultado = await res.json()
    return resultado.secure_url
}