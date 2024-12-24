const ShowImage = ({ list, removelist, imgurl, preview, copyurl }) => {
  const handleRemoveurl = (img, list_img) => {
    removelist(img, list_img);
  };
  const handleurl = (e) => {
    imgurl(e);
  };

  return (
    <ul className="flex items-center gap-5 flex-wrap">
      {preview.map((img, index) => {
        return (
          <>
            <li key={index} value={index} className="imglist">
              <img src={img} alt="img" className="w-[95px]" />
            </li>
            <span
              onClick={(e) => {
                handleRemoveurl(
                  img,
                  list[index],
                  copyurl[index]?.path ? copyurl[index]?.path : ""
                );
              }}
              style={{
                cursor: "pointer",
                fontSize: "20px",
              }}
            >
              x
            </span>
            <p style={{ display: "none" }} value={index}>
              {copyurl[index]?.path}
            </p>
            {copyurl.length ? (
              <img
                src="/link-svgrepo-com.svg"
                alt=""
                style={{
                  cursor: "pointer",
                  width: "17px",
                  margin: "6px",
                }}
                id="imgurl"
                onClick={(e) => {
                  handleurl(e);
                }}
              />
            ) : (
              ""
            )}
            <p id="copied" style={{ display: "none" }}>
              copied..
            </p>
          </>
        );
      })}
    </ul>
  );
};

export default ShowImage;
