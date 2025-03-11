import Carousel from "../carousel";
import { getMyCurrentAge } from "@/utility/slugify";
const About = () => {
  return (
    <>
      <div className="flex h-auto sm:w-full w-[1200px] flex-wrap sm:flex-nowrap justify-between">
        <div className="w-full sm:w-auto p-10 flex flex-col">
          <h1 className="text-[110px] sm:text-[80px] text-nowrap">
            Hi i&apos;m Pranshu
          </h1>
          <p className="p-2 sm:text-[25px] text-[50px] sm:w-[600px]">
            Hi there, I&apos;m Pranshu, aka Brocode! I&apos;m a{" "}
            {getMyCurrentAge()}-year-old Software Engineer with a passion for
            building web applications. I mostly work on web-related projects,
            using technologies like Next.js, React, and Node.js. Recently, I
            started writing articles on my blog to share the things I learn
            along the way. When I&apos;m not coding, you can find me exploring
            new tech, brainstorming fun side projects, or diving into system
            design concepts. My blog is a mix of my learnings, experiences, and
            tips for fellow developers.
          </p>
        </div>
        <div className="p-10 w-full items-center justify-center sm:flex hidden">
          <Carousel />
        </div>
      </div>
    </>
  );
};

export default About;
