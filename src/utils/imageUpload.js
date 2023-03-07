export const checkImage = (file) => {
    let err = ""
    if(!file) return err = "File does not exist"

    if(file.size > 5e+6) //5mb
    err = "The larger size is 5mb"

    if(file.type !== 'image/jpeg' && file.type !== 'image/png' )
    err = "Image format is incorrect!"
    return err;
}

export const imageUpload = async (images) => {
    let imgArr = [];
    for(const item of images){
        const formData = new FormData()
         
        if(item.camera){
            formData.append("file", item.camera)
        }else{
            formData.append("file", item)
        }
        
        formData.append("upload_preset", "Splinter_store")
        formData.append("cloud_name", "dzosecp8f")

        const res = await fetch('https://api.cloudinary.com/v1_1/dzosecp8f/image/upload', {
            method: 'POST',
            body: formData
        })

        const data = await res.json()
        imgArr.push({public_id: data.public_id, url: data.secure_url})

    }
    return imgArr;
}