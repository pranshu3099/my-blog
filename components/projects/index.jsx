const MyProjects = () => {
  return (
    <>
      <div className="h-auto mx-auto sm:w-full w-[1200px] max-w-[1500px] p-10">
        <div>
          <h2 className="sm:text-[40px] text-[90px] h-auto">Projects</h2>
        </div>
        <div className="flex flex-col gap-4 mt-4 sm:p-0 p-2 ">
          <div className="flex flex-col gap-2 h-auto">
            <a
              href="https://bro-streams.vercel.app/"
              target="_blank"
              className="font-bold sm:text-[25px] text-[70px]"
            >
              Bro Streams
            </a>
            <p className="sm:text-[25px] text-[50px]">
              Developed "Bro Streams," a Twitch-like platform using Next.js 14
              with Clerk authentication. Real-time streaming via LiveKit,
              Tailwind CSS for styling, and interactive user features like
              following, blocking, and guest access.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <a
              href="https://chat.pranshu.dev/"
              target="_blank"
              className="font-bold sm:text-[20px] text-[70px]"
            >
              Doge Chat
            </a>
            <p className="sm:text-[25px] text-[50px]">
              Built a fun, real-time chat application featuring a "Doge" dog
              using React.js, Node.js, and OpenAI, with secure OTP-based
              authentication and WebSocket for live chat, deployed on AWS.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <a
              href="https://pranshu3099.github.io/movies-hub/index.html"
              target="_blank"
              className="font-bold sm:text-[20px] text-[70px]"
            >
              Movies Hub
            </a>
            <p className="sm:text-[25px] text-[50px] ">
              Search for movies and tv series.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProjects;
