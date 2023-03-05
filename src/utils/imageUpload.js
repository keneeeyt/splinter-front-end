export const checkImage = (file) => {
    let err = ""
    if(!file) return err = "File does not exist"

    if(file.size > 5e+6) //5mb
    err = "The larger size is 5mb"

    if(file.type !== 'image/jpeg' && file.type !== 'image/png' )
    err = "Image format is incorrect!"
    return err;
}