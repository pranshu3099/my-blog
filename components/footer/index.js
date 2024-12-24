import React from "react";
import Image from "next/image";
const Footer = () => {
  return (
    <div className="h-auto p-10 flex flex-col justify-center items-center gap-4">
      <div className="font-bold sm:text-[20px]">
        <p>Made by Pranshu</p>
      </div>
      <div className="flex gap-3 items-center">
        <a href="https://github.com/pranshu3099" target="_blank">
          <Image
            src="/twitter-svgrepo-com.svg"
            alt="twitter"
            width={40}
            height={40}
          />
        </a>
        <a href="https://www.linkedin.com/in/pranshu-cse/" target="_blank">
          <Image
            src="/linkedin-svgrepo-com.svg"
            alt="linkedin"
            width={40}
            height={40}
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
