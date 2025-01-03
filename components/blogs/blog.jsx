import Article from "./article";
const Blogs = ({ posts }) => {
  if (posts?.length === 0) {
    return (
      <div className="h-auto mx-auto sm:w-full max-w-[1500px] w-[1200px] p-10 font-bold">
        <p className="h-auto sm:text-[25px] text-[50px]">
          No blog&apos;s to show currently
        </p>
      </div>
    );
  }
  return (
    <div className="h-auto mx-auto sm:w-full max-w-[1500px] w-[1200px] p-10">
      <div>
        <h3 className="sm:text-[40px] mb-10 text-[90px] h-auto">
          Latest Blogs
        </h3>
      </div>
      <Article posts={posts} />
    </div>
  );
};

export default Blogs;
