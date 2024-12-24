import Navbar from "@/components/navbar/layout";
import ShowPost from "@/components/blogs/showpost";
import { slugify } from "@/utility/slugify";
const ShowArticle = ({ post }) => {
  return (
    <div>
      <Navbar />

      <article>
        <ShowPost post={post} />
      </article>
    </div>
  );
};

export default ShowArticle;

export async function getStaticPaths() {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${url}/getposts`, {
      method: "GET",
    });
    const result = await response.json();
    const paths = result?.map((post) => ({
      params: {
        postTitle: slugify(post?.title),
      },
    }));
    return {
      paths,
      fallback: true,
    };
  } catch (err) {
    console.log(err);
  }
}

export async function getStaticProps(context) {
  let { params } = context;
  const url = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${url}/getsinglepost/${params.postTitle}`);
  const result = await response.json();
  return {
    props: {
      post: result,
    },
  };
}
