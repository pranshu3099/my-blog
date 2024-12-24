import { useState, useContext } from "react";
import { ThemeContext } from "@/context/provider";
import Image from "next/image";
import ShowComments from "./showcomments";
const Comments = ({ url, post, user }) => {
  const [comment, setcomment] = useState("");
  const [commentList, setCommentList] = useState(post?.comments || []);
  const { theme } = useContext(ThemeContext);

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
      <div className="flex flex-col">
        <div className=" h-[40px] flex items-center">
          <h2 className="text-2xl font-bold">Comment</h2>
        </div>
        <div className=" h-[60px] flex items-center">
          <form onSubmit={handleComment}>
            <input
              type="text"
              value={comment}
              placeholder="your comment :-)"
              onChange={(e) => setcomment(e.target.value)}
              className={`border-b-2 border-blue-600 w-[1050px] border-t-0 border-l-0 border-r-0 focus:outline-none bg-transparent ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            />
          </form>
          <Image
            src={"/send-2-svgrepo-com.svg"}
            width={40}
            height={40}
            className="relative bottom-3 right-8"
            style={{ cursor: "pointer" }}
            alt="comment"
            onClick={handleComment}
          />
        </div>
        <ShowComments commentList={commentList} />
      </div>
    </>
  );
};

export default Comments;
