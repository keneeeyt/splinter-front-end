import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "./Avatar";
import { TYPES } from "../redux/action/notifyAction";
import { createPost } from "../redux/action/postAction";





const StatusModal = () => {
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const videoRef = useRef();
  const refCanvas = useRef();
  const [tracks, setTracks] = useState("");

  const handleChangeImages = (event) => {
    const files = [...event.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = "File does not exist.");
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return (err = "Image format is invalid!");
      }

      return newImages.push(file);
    });

    if (err) dispatch({ type: TYPES.NOTIFY, payload: { error: err } });
    setImages([...images, ...newImages]);
  };

  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  
  const handleStream = () => {
    setStream(true)
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices.getUserMedia({video: true})
        .then(mediaStream => {
            videoRef.current.srcObject = mediaStream
            videoRef.current.play()

            const track = mediaStream.getTracks()
            setTracks(track[0])
        }).catch(err => console.log(err))
    }
}
  const handleCapture = () => {
      const width = videoRef.current.clientWidth;
      const height = videoRef.current.clientHeight;

      refCanvas.current.setAttribute('width', width)
      refCanvas.current.setAttribute('height', height)

      const ctx = refCanvas.current.getContext('2d')
      ctx.drawImage(videoRef.current, 0,0, width, height)
      let URL = refCanvas.current.toDataURL();
      setImages([...images, {camera: URL}])
  }

  const handleStopStream = () => {
    tracks.stop()
    setStream(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if(images.length ===0)
    return dispatch({type:TYPES.NOTIFY, payload: {error: 'Please add a picture!'}})

    dispatch(createPost({content, images, auth}))
    setContent('')
    setImages([])
    if(tracks) tracks.stop();
    dispatch({type: TYPES.STATUS, payload: false})
  }
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center min-h-[50rem]">
          {/* dialog overlay  */}
          <div className="fixed inset-0 bg-black opacity-20" />
          {/* dialog card  */}
          <div className="relative bg-white w-96 rounded-lg">
            {/* dialog header  */}
            <div className="flex justify-center relative border-b">
              {/* dialog title  */}
              <div className=" py-4 text-xl font-bold">Create Post</div>
              {/* dialog close icon button  */}
              <div className="absolute right-0 p-2">
                <button
                  className="bg-gray-200 p-2 hover:bg-gray-300 rounded-full text-gray-500"
                  onClick={() =>
                    dispatch({ type: TYPES.STATUS, payload: false })
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* dialog body  */}
            <div>
              {/* post author profile */}
              <div className="my-2 px-4 flex items-center space-x-2">
                <Avatar src={auth.user.avatar} />

                <div>
                  <h6 className="font-bold text-sm">{auth.user.fullName}</h6>
                </div>
              </div>

              {/* create post interface */}
              <div className="px-4 py-2">
                <div className="mb-4">
                  <textarea
                    onChange={(e) => setContent(e.target.value)}
                    name="content"
                    value={content}
                    className="w-full border-none focus:ring-0 placeholder-gray-700 text-xl"
                    rows="3 "
                    placeholder={`What's on your mind ${auth.user.userName} ?`}
                  />

                  <div className="show_images ">
                    {images.map((img, index) => (
                      <div key={index} id="file_img" className="gap-2">
                        <img
                          src={img.camera? img.camera : URL.createObjectURL(img)}
                          alt="images"
                          style={{
                            filter: `${theme ? "invert(1)" : "invert(0)"}`,
                          }}
                          className="rounded-md p-1 border-[.1rem] border-gray-300 "
                        />
                        <span
                          onClick={() => deleteImages(index)}
                          className="absolute top-[-1px] right-[2px] z-10 bg-gray-100 mt-[-0.1rem] -mr-[.1rem] text-gray-400 border-[.1rem] border-gray-400 rounded-full text-xs font-md cursor-pointer px-1"
                        >
                          &times;
                        </span>
                      </div>
                    ))}
                  </div>

                  {stream && (
                    <div className="stream relative">
                      <video
                        autoPlay
                        muted
                        ref={videoRef}
                        style={{
                          filter: `${theme ? "invert(1)" : "invert(0)"}`,
                        }}
                        width="100%"
                        height="100%"
                      />

                      <span onClick={handleStopStream} className=" cursor-pointer absolute top-[-2px] right-[5px] text-red-600
                      text-xl font-lg">&times;</span>
                      <canvas ref={refCanvas} style={{display: 'none'}} />
                    </div>
                  )}
                </div>
                <hr className="mt-3 mb-3" />
                <div className="relative flex justify-center cursor-pointer">

                {
                    stream
                    ? <div className="">
                    <img
                      className="h-7"
                      src="https://res.cloudinary.com/dzosecp8f/image/upload/v1678208048/Martz90-Circle-Camera.512_yncuut.png"
                      alt="camera"
                      onClick={handleCapture}
                    />
                  </div> 
                    : <>
                      
                    <div className="">
                    <img
                      className="h-7"
                      src="https://res.cloudinary.com/dzosecp8f/image/upload/v1678175565/Martz90-Circle-Camera.512_s3fjcd.png"
                      alt="camera"
                      onClick={handleStream}
                    />
                  </div>

                  <div className="icon_modal">
                    <img
                      className="h-6"
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png"
                      alt="albums"
                    />
                    <input
                      type="file"
                      name="file"
                      id="file"
                      multiple
                      accept="image/*"
                      onChange={handleChangeImages}
                    />
                  </div>


                    </>
                  }
                  

                  <div></div>
                </div>
              </div>
              <div className="my-2 px-4 pb-2">
                <button type="submit" className="text-center w-full py-2 rounded-lg bg-[#F89C1C] text-white">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
