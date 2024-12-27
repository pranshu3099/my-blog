import Article from "./article";
const Blogs = ({ posts }) => {
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
