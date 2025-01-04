import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "@/context/provider";
import Image from "next/image";
import ShowComments from "./showcomments";
const Comments = ({ url, post, user }) => {
  const [comment, setcomment] = useState("");
  const [commentList, setCommentList] = useState(
    Array.isArray(post?.[0]?.comments) ? post?.[0]?.comments : []
  );
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`${url}/getcomments/${post?.[0]?.posts_id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const result = await res.json();
        setCommentList(Array.isArray(result) ? result : []);
      } catch (err) {
        console.log(err);
        setCommentList([]);
      }
    };
    getComments();
  }, []);

  const checkForSpaces = () => {
    let trimmedText = comment;
    let pattern = /^\s*$/;
    return pattern.test(trimmedText);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (comment === "" || checkForSpaces()) {
      alert("comment is required");
    } else {
      let data = {
        user_id: user?.id,
        posts_id: post?.posts_id,
        comment,
      };

      setcomment("");
      const response = await fetch(`${url}/comment`, {
        body: JSON.stringify(data),
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      data["name"] = user?.name;
      setCommentList([...commentList, data]);
    }
  };

  return (
    <>
      <div className="flex flex-col h-auto">
        <div className="flex items-center h-auto">
          <h2 className="sm:text-2xl text-[90px] font-bold">Comment</h2>
        </div>
        <div className=" h-auto flex items-center">
          <form onSubmit={handleComment}>
            <input
              type="text"
              value={comment}
              placeholder="your comment :-)"
              onChange={(e) => setcomment(e.target.value)}
              className={`border-b-2 sm:text-[25px] text-[60px] border-blue-600 w-[1050px] border-t-0 border-l-0 border-r-0 focus:outline-none bg-transparent ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            />
          </form>
          <Image
            src={"/send-2-svgrepo-com.svg"}
            width={0}
            height={0}
            className="relative bottom-3 right-8 sm:h-[40px] sm:w-[40px] h-[80px] w-[80px]"
            style={{ cursor: "pointer" }}
            alt="comment"
            onClick={handleComment}
          />
        </div>
        <div className="mt-5">
          <ShowComments commentList={commentList} />
        </div>
      </div>
    </>
  );
};

export default Comments;
