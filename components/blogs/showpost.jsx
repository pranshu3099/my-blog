import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { convertDate } from "@/utility/date";
import { handleGithubLogin } from "@/utility/oauth";
import { updateLikes } from "@/utility/likes";
import { getMetaContent } from "@/utility/meta";
import { generateMetaTags } from "@/utility/get-meta-content";
import Comments from "../comments/comments";
import Footer from "../footer";
const HTMLRenderer = ({ htmlContent }) => {
  return (
    <div
      className="mt-5 flex flex-col gap-4"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
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
  const [currentUrl, setCurrentUrl] = useState("");
  const PrefixText = `Check out this blog on ${post?.[0]?.title}`;
  const metaContent = useMemo(() => {
    if (!post?.[0]?.title) return [];
    let meta_tags_content = getMetaContent(post?.[0]?.title);
    if (meta_tags_content?.length) {
      return generateMetaTags(meta_tags_content[0], post?.[0]?.title);
    }
    return [];
  }, [post]);
  useEffect(() => {
    if (typeof window !== "undefined") setCurrentUrl(window.location.href);
  }, []);
  useEffect(() => {
    const ispostLiked = async () => {
      try {
        const { user } = authStatus || {};
        if (
          !user?.id ||
          !post?.[0]?.posts_id ||
          !authStatus?.status ||
          !post?.length
        )
          return;
        const response = await fetch(
          `${url}/ispostLiked/${post?.[0]?.posts_id}/users/${user?.id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          console.error(`Error fetching like status: ${response.statusText}`);
          return;
        }
        const result = await response.json();
        setHasLiked(result?.has_liked || false);
      } catch (err) {
        console.log(err);
      }
    };
    if (authStatus?.status && post?.length) {
      ispostLiked();
    }
  }, [authStatus?.status, post?.[0]?.posts_id, authStatus?.user?.id, url]);

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
      if (storedPost && post.length === 0) {
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

  const handleLikes = () => {
    try {
      const { user } = authStatus;
      const imageSrc = imageRef?.current?.src;
      if (!imageRef?.current || !user) return;
      const add_likes = "addLikes";
      const remove_likes = "removeLikes";
      const path = new URL(imageSrc).pathname;
      if (imageRef && path === "/heart-svgrepo-com.svg") {
        imageRef.current.src = "/red-heart-svgrepo-com.svg";
        updateLikes(url, post[0]?.posts_id, user?.id, add_likes).then((data) =>
          setLikes(data)
        );
      } else {
        imageRef.current.src = "/heart-svgrepo-com.svg";
        updateLikes(url, post[0]?.posts_id, user?.id, remove_likes).then(
          (data) => setLikes(data)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const copyTextToClipboard = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(window.location.href);
    }
  };
  return (
    <>
      <div>
        {post?.length && (
          <Head>
            <title>{post?.[0]?.title}</title>
            {metaContent?.map((content, index) => (
              <meta
                key={content?.key || index}
                name={content?.name}
                property={content?.property}
                content={content?.content}
              />
            ))}
          </Head>
        )}
      </div>
      {post?.length &&
        post?.map((post, index) => {
          return (
            <div
              key={index}
              className=" mx-auto w-[1300px] sm:w-[1200px] sm:max-w-[1200px] h-full p-20 flex flex-col gap-3"
            >
              <div>
                <h1 className="sm:text-[60px] text-[120px] font-bold h-auto">
                  {post?.title}
                </h1>
              </div>
              {!authStatus?.status && (
                <button
                  onClick={() => {
                    handleGithubLogin(post);
                  }}
                  type="button"
                  className=" text-white w-[400px] sm:w-[200px] hover:bg-blue-800 transition duration-300 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-[30px] p-5 sm:text-sm sm:px-5 sm:py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
                >
                  <svg
                    className="sm:w-4 sm:h-4 me-2 w-12 h-12"
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
              <div className=" flex justify-between h-auto items-center">
                <p className="sm:text-[16px] text-[50px]">
                  {convertDate(post?.created_at)}
                </p>
                {authStatus?.status && (
                  <div className=" w-[250px] gap-5 flex items-center">
                    <Image
                      src={
                        hasLiked
                          ? "/red-heart-svgrepo-com.svg"
                          : "/heart-svgrepo-com.svg"
                      }
                      alt="heart"
                      height={0}
                      width={0}
                      style={{ cursor: "pointer" }}
                      ref={imageRef}
                      onClick={handleLikes}
                      className="sm:h-[40px] sm:w-[40px] h-[80px] w-[80px]"
                    />
                    <p>{likes ? likes : post?.likes_count}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-3 items-center">
                <a
                  href={`https://twitter.com/intent/tweet?text=${PrefixText}.${currentUrl}`}
                  target="_blank"
                  rel="noopener"
                  aria-label="share on twitter"
                >
                  <Image
                    src="/twitter-svgrepo-com.svg"
                    alt="twitter"
                    width={0}
                    height={0}
                    className="sm:h-[40px] sm:w-[40px] h-[80px] w-[80px]"
                  />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    `${currentUrl}`
                  )}&title=${encodeURIComponent(
                    post?.[0]?.title
                  )}&summary=${encodeURIComponent(PrefixText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="share on linkedin"
                >
                  <Image
                    src="/linkedin-svgrepo-com.svg"
                    alt="linkedin"
                    width={0}
                    height={0}
                    className="sm:h-[40px] sm:w-[40px] h-[80px] w-[80px]"
                  />
                </a>
                <Image
                  src="/link-svgrepo-com.svg"
                  alt="link"
                  width={0}
                  height={0}
                  className="sm:h-[40px] sm:w-[40px] h-[80px] w-[80px] cursor-pointer"
                  onClick={copyTextToClipboard}
                />
              </div>

              <HTMLRenderer htmlContent={post?.parsed_content} />

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
