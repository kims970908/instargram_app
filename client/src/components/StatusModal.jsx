import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";

const StatusModal = () => {
  const { auth, theme, state } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const [tracks, setTracks] = useState("");

  const videoRef = useRef();
  const refCanvas = useRef();

  //  사진 등록 handler
  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = "존재 하지 않는 파일입니다");

      if (file.size > 1024 * 1024 * 5) {
        return (err = "파일이 너무 큽니다");
      }
      return newImages.push(file);
    });

    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setImages([...images, ...newImages]);
  };

  // 사진 삭제 handler
  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  //
  const handleStream = () => {
    setStream(true);
    navigator.getWebcam =
      navigator.getUserMedia ||
      navigator.webKitGetUserMedia ||
      navigator.moxGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then(function (stream) {
          //Display the video stream in the video object
        })
        .catch(function (e) {
          console.log(e.name + ": " + e.message);
        });
    } else {
      navigator.getWebcam(
        { audio: true, video: true },
        function (stream) {
          //Display the video stream in the video object
        },
        function () {
          console.log("Web cam is not accessible.");
        }
      );
    }
  };

  const handleCapture = () => {};

  return (
    <div className="status_modal">
      <form>
        <div className="status_header">
          <h5 className="m-0">게시물 작성</h5>
          <span
            onClick={() =>
              dispatch({ type: GLOBALTYPES.STATUS, payload: false })
            }
          >
            &times;
          </span>
        </div>

        <div className="status_body">
          <textarea
            name="content"
            value={content}
            // ${auth.user.username}
            placeholder={`, 무슨 생각 중인가요?`}
            onChange={(e) => setContent(e.target.value)}
            style={{
              filter: theme ? "invert(1)" : "invert(0)",
              color: theme ? "white" : "#111",
              background: theme ? "rgba(0,0,0,.03)" : "",
            }}
          />
          {/* images show view */}
          <div className="show_images">
            {images.map((img, index) => (
              <div key={index} id="file_img">
                <img src={URL.createObjectURL(img)} alt="images" />
                <span onClick={() => deleteImages(index)}>&times;</span>
              </div>
            ))}
          </div>

          {stream && (
            <div className="stream position-relative">
              <video
                autoPlay
                muted
                ref={videoRef}
                width="100%"
                height="100%"
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
              />

              <span>&times;</span>
              <canvas ref={refCanvas} style={{ display: "none" }} />
            </div>
          )}

          <div className="input_images">
            {stream ? (
              <i className="fas fa-camera" onClick={handleCapture} />
            ) : (
              <>
                <i className="fas fa-camera" onClick={handleStream} />
                <div className="file_upload">
                  <i className="fas fa-image" />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleChangeImages}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="status_footer">
          <button className="btn btn-secondary w-100">전송</button>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
