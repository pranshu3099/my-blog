import { useState, useEffect } from "react";
import { convertDate } from "@/utility/date";
import { slugify } from "@/utility/slugify";
import Image from "next/image";
import Link from "next/link";
const Article = ({ posts }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsImageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {posts.map((post, index) => (
        <div key={index} className="flex sm:justify-center mx-auto h-auto ">
          <div className="w-[1800px] sm:h-[200px] h-[150px] flex justify-center sm:items-center mb-10 sm:mb-4 sm:justify-between sm:flex-row flex-col">
            <div
              className={`transition duration-500 ease-in-out ${
                isImageLoaded ? "blur-0" : "blur-lg"
              } sm:block hidden`}
            >
              <Image
                src="/ijvfue6cl2e33gqzl9a7.webp"
                alt=""
                width={250}
                height={350}
              />
            </div>
            <div className=" flex flex-col text-nowrap sm:justify-center h-[125px]">
              <Link
                href={`posts/${slugify(post?.title)}`}
                className="sm:text-[25px] text-[30px] font-bold hover:underline"
              >
                {post?.title}
              </Link>
              <p className="sm:text-[25px] text-[30px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="sm:w-[450px]">
                <p className="sm:text-[25px] text-[30px]">
                  {convertDate(post?.created_at)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Article;