import Navbar from "../components/navbar/layout";
import About from "../components/about";
import Blogs from "../components/blogs/blog";
import MyProjects from "@/components/projects";
import Footer from "@/components/footer";
import Head from "next/head";
export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Pranshu's Blog</title>
      </Head>
      <Navbar />
      <div className="h-[710px] mx-auto w-[700px] sm:w-full sm:max-w-[1500px]">
        <About />
        <Blogs posts={posts} />
        <MyProjects />
        <Footer />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${url}/getposts`);
    const result = await response.json();
    return {
      props: {
        posts: result,
      },
    };
  } catch (err) {
    console.log(err);
  }
}
