import { useEffect, useRef, useState } from "react";
const imgsrc = [
  "/light-node-opened.svg",
  "/next-js.svg",
  "/javascript-svgrepo-com.svg",
  "/react-svgrepo-com.svg",
  "/typescript-official-svgrepo-com.svg",
];

const Carousel = () => {
  const imageRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imgsrc.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (imageRef?.current) {
      const imageElement = imageRef?.current;
      imageElement.style.opacity = 0;
      const timeout = setTimeout(() => {
        imageElement.src = imgsrc[currentIndex];
        imageElement.style.opacity = 1;
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);
  return (
    <>
      <img
        src={imgsrc[0]}
        ref={imageRef}
        style={{
          height: "300px",
          width: "300px",
          transition: "opacity 0.5s ease",
          opacity: 1,
        }}
        alt="carousel"
      />
    </>
  );
};

export default Carousel;
