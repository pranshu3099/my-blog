import React from "react";
import Image from "next/image";
const Footer = () => {
  return (
    <div className="h-auto p-10 flex flex-col justify-center items-center gap-4 sm:w-auto w-[1200px]">
      <div className="font-bold sm:text-[20px] text-[50px]">
        <p>Made by Pranshu</p>
      </div>
      <div className="flex gap-3 items-center">
        <a href="https://github.com/pranshu3099" target="_blank">
          <Image
            src="/github-142-svgrepo-com (1).svg"
            alt="twitter"
            width={0}
            height={0}
            className="sm:h-[40px] sm:w-[40px] h-[80px] w-[80px]"
          />
        </a>
        <a href="https://x.com/brocode08071934" target="_blank">
          <Image
            src="/twitter-svgrepo-com.svg"
            alt="twitter"
            width={0}
            height={0}
            className="sm:h-[40px] sm:w-[40px] h-[80px] w-[80px]"
          />
        </a>
        <a href="https://www.linkedin.com/in/pranshu-cse/" target="_blank">
          <Image
            src="/linkedin-svgrepo-com.svg"
            alt="linkedin"
            width={0}
            height={0}
            className="sm:h-[40px] sm:w-[40px] h-[80px] w-[80px]"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
