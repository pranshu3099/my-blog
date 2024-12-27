import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { convertDate } from "@/utility/date";
import { handleGithubLogin } from "@/utility/oauth";
import { updateLikes } from "@/utility/likes";
import Comments from "../comments/comments";
import Footer from "../footer";
const HTMLRenderer = ({ htmlContent }) => {
  const cleanedContent = useMemo(() => {
    return htmlContent
      .replace(/style=["{]+([^"}]+)["}]+/g, 'style="$1"')
      .replace(
        /style="([^"]+)"/g,
        (match, p1) => `style="${p1.replace(/[="]/g, "").trim()}"`
      );
  }, [htmlContent]);

  return (
    <div
      className="mt-5 flex flex-col gap-4"
      dangerouslySetInnerHTML={{ __html: cleanedContent }}
    />
  );
};

const ShowPost = ({ post: initialPost }) => {
  const [post, setPost] = useState(initialPost || []);
  const [authStatus, setAuthStatus] = useState({ status: false, user: null });
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const imageRef = useRef(null);
  const url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const timer = setTimeout(() => setIsImageLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkValidity = async () => {
      try {
        const res = await fetch(`${url}/tokenValid`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const result = await res.json();
        if (result[0]?.message === "unauthorized") {
          setAuthStatus({ ...authStatus, status: false, user: null });
        } else {
          setAuthStatus({
            ...authStatus,
            status: true,
            user: result?.[0]?.user,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkValidity();
  }, []);

  useEffect(() => {
    if (!initialPost) {
      const storedPost = JSON.parse(sessionStorage.getItem("post"));
      if (storedPost) {
        setPost(storedPost);
      }
    }
  }, [initialPost]);

  if (!post || post?.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2>Loading posts</h2>
      </div>
    );
  }

  useEffect(() => {
    const ispostLiked = async () => {
      try {
        const { user } = authStatus;
        const response = await fetch(
          `${url}/ispostLiked/${post?.[0]?.posts_id}/users/${user?.id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const result = await response.json();
        const has_liked = result?.has_liked;
        setHasLiked(has_liked);
      } catch (err) {
        console.log(err);
      }
    };
    ispostLiked();
  }, [authStatus]);

  const handleLikes = () => {
    try {
      const { user } = authStatus;
      const add_likes = "addLikes";
      const remove_likes = "removeLikes";
      const imageSrc = imageRef?.current.src;
      const path = new URL(imageSrc).pathname;
      let current_likes = 0;
      if (imageRef && path === "/heart-svgrepo-com.svg") {
        imageRef.current.src = "/red-heart-svgrepo-com.svg";
        current_likes = updateLikes(
          url,
          post[0]?.posts_id,
          user?.id,
          add_likes
        );
      } else {
        imageRef.current.src = "/heart-svgrepo-com.svg";
        current_likes = updateLikes(
          url,
          post[0]?.posts_id,
          user?.id,
          remove_likes
        );
      }
      setLikes(current_likes);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {post?.length &&
        post?.map((post, index) => {
          return (
            <div
              key={index}
              className=" mx-auto w-[1200px] sm:max-w-[1200px] h-full p-20 flex flex-col gap-3"
            >
              <div>
                <h1 className="text-[60px] font-bold">{post?.title}</h1>
              </div>
              {!authStatus?.status && (
                <button
                  onClick={() => {
                    handleGithubLogin(post);
                  }}
                  type="button"
                  className="text-white w-[200px] hover:bg-blue-800 transition duration-300 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
                >
                  <svg
                    className="w-4 h-4 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Sign in with Github
                </button>
              )}
              <div className=" flex justify-between h-[40px] items-center">
                <p>{convertDate(post?.created_at)}</p>
                {authStatus?.status && (
                  <div className=" w-[250px] gap-5 flex items-center">
                    <Image
                      src={
                        hasLiked
                          ? "/red-heart-svgrepo-com.svg"
                          : "/heart-svgrepo-com.svg"
                      }
                      alt="heart"
                      height={30}
                      width={30}
                      style={{ cursor: "pointer" }}
                      ref={imageRef}
                      onClick={handleLikes}
                    />
                    <p>{likes ? likes : post?.likes_count}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-3 items-center">
                <a href="">
                  <Image
                    src="/twitter-svgrepo-com.svg"
                    alt="twitter"
                    width={40}
                    height={40}
                  />
                </a>
                <a href="">
                  <Image
                    src="/linkedin-svgrepo-com.svg"
                    alt="linkedin"
                    width={40}
                    height={40}
                  />
                </a>
                <a href="">
                  <Image
                    src="/link-svgrepo-com.svg"
                    alt="link"
                    width={25}
                    height={25}
                  />
                </a>
              </div>
              {/* <div
                style={{
                  transition: "all 0.5s ease-in-out",
                  filter: isImageLoaded ? "blur(0)" : "blur(8px)",
                }}
              >
                <Image
                  src="/Solarwinds-Cyber-Attack-1.jpg"
                  alt="Blog Image"
                  width={1200}
                  height={800}
                  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
                />
              </div> */}
              {/* <div className="mt-5 flex flex-col gap-4"> */}
              <HTMLRenderer htmlContent={post?.parsed_content} />
              {/* <h1 className="text-2xl font-bold border-b-4 border-cyan-800">
                  Bun the new js run time
                </h1>
                <p>
                  Bun is a superfast all in one toolkit for javascript an
                  typescript apps. Bun streamline the dev process making it
                  smoother and more efficient, it is not just a runtime but also
                  a bundler package manager and test runner.
                </p>
                <h2 className="text-2xl font-bold border-b-4 border-cyan-800">
                  Bun vs Node as a JavaScript Runtime
                </h2>
                <p>
                  A js run time is an environment which provides all the
                  necessary components in order to use and run a js program.Both
                  node and bun are a javascript run time. Node js is written in
                  c++ and Bun is written in general purpose programming language
                  zig.
                </p>
                <p>
                  A javascript Engine is basically a program that converts a js
                  program in to machine code. Node js uses Google's v8 engine
                  and Bun uses Javascript core which is an opensource developed
                  by apple for safari.
                </p>
                <p>
                  Both v8 and JSC (Javascript core) works very differently. jsc
                  prioritize faster start times and reduced memory usage with a
                  slightly slower execution time. On the other hand v8
                  prioritize fast execution with more run time optimization
                  which may lead to more memory usage whhich makes Bun more
                  efficient and smoother
                </p>
                <h2 className="text-2xl font-bold border-b-4 border-cyan-800">
                  Transpiler
                </h2>
                <p>
                  To execute typescript in node env external dependecies are
                  required. one common approach is the build step to transpile
                  ts into js and then run resulting js code(npm i -D typescript
                  ts-node) Bun comes with a javascript transpiler integrated
                  into the runtime directlly run js ts jsx or tsx file.This is
                  also a big reason for using bun over node.
                </p>
                <h2 className="text-2xl font-bold border-b-4 border-cyan-800">
                  Module system
                </h2>
                <p>
                  A module system allows developers to organize code into
                  reusable segments. Javascript mainly uses common js and ESM
                  i.e Ecmascript module.
                </p>
                <p>
                  Common js is used on server such as node js server uses
                  require or module.exports for synchronous module handelling.
                  Esm for browsers uses import and export statement providing
                  more static and asynchronous approach optimized for browser
                  builds.
                </p>
                <p>
                  The main point to note here is that you can not use module and
                  import statement side by side in the same file and one more
                  thing to use import in a file you should create a file using
                  mjs extension or set type to module in package.json file which
                  is in root directory in your project.
                </p>
                <p>
                  On the other hand bun support both common js and esm without
                  any special configuration i.e you can use both import and
                  require in same file.
                </p>
                <h2 className="text-2xl font-bold border-b-4 border-cyan-800">
                  Web Api's
                </h2>
                <p>
                  Integral to browser based application and offer tools like
                  fetch and websocket for web application.Earlier fetch was not
                  supported in node js developers have to rely on packages such
                  as node-fetch but from node js v18 there is experimental
                  support for the fetch api but bun has built support to fetch.
                  Dev can directly use fetch request response.
                </p>
                <h2 className="text-2xl font-bold border-b-4 border-cyan-800">
                  Hot reloading
                </h2>
                <p>
                  Hot Reloading is that feature that instantly reflects code
                  changes in the application without the need of full restart in
                  node js we have a couple of options for hot reloading for
                  example nodemon that hard restarts the entire process and from
                  node18 we have --watch flag for the same.
                </p>
                <p>
                  Bun has a --hot flag. unlike the node js methods that might
                  require a full process restart bun reloads your code in place
                  without terminating the old process provides a smoother
                  development experience.
                </p>
                <h2 className="text-2xl font-bold border-b-4 border-cyan-800">
                  Node js compatibility
                </h2>
                <ul className="">
                  <li>Bun is actually drop in replacement for node.js</li>
                  <li>
                    You can integrate bun with node js app without any
                    modification
                  </li>
                  <li>
                    There is already support for built-in node js module such as
                    fs path and net
                  </li>
                  <li>
                    Adherence to the nodejs module resolution algorithm,
                    including the familiar node_modules structure
                  </li>
                </ul>
                <h2 className="text-2xl font-bold border-b-4 border-cyan-800">
                  Bundler
                </h2>
                <p>
                  Bundling is the process of taking multiple js files and
                  merging them into one or more optimized bundles.Process may
                  inivolve transformation such as converting typescript to
                  javascript or minifying the code to reduce its size. In node
                  js eco system bundelling is typically handeled by third party
                  tools such as webpack rollup parcel rather than node js
                  itself.
                </p>
                <p>
                  Bun on the other hand is designed to bundle js and ts code for
                  various platfroms.To bundle with bun use simple command bun
                  build ./index.ts --outdir ./build.
                </p>
                <h2 className="text-2xl font-bold border-b-4 border-cyan-800">
                  Bundler
                </h2>
                <p>
                  Bun boasts installation speed which is faster than npm. It
                  acheives this by the help of global module cache, eliminating
                  redundant downloads from the npm registry Bun enusres fastest
                  sysytem call and it also gives optimal performance.
                </p> */}
              {/* </div> */}

              {authStatus?.status && (
                <Comments url={url} user={authStatus?.user} post={post} />
              )}
              <Footer />
            </div>
          );
        })}
    </>
  );
};

export default ShowPost;
