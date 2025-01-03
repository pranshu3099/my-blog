import Image from "next/image";
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
              <Image
                src={img}
                alt="img"
                className="w-[95px]"
                width={95}
                height={95}
              />
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
              <Image
                src="/link-svgrepo-com.svg"
                alt=""
                style={{
                  cursor: "pointer",
                  margin: "6px",
                }}
                id="imgurl"
                onClick={(e) => {
                  handleurl(e);
                }}
                height={60}
                width={30}
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
