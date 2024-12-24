import Article from "./article";
const Blogs = ({ posts }) => {
  return (
    <div className="h-auto mx-auto w-full max-w-[1500px] p-10">
      <div>
        <h3 className="text-[40px]">Latest Blogs</h3>
      </div>
      <Article posts={posts} />
    </div>
  );
};

export default Blogs;
