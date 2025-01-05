import Navbar from "../components/navbar/layout";
import About from "../components/about";
import Blogs from "../components/blogs/blog";
import MyProjects from "@/components/projects";
import Footer from "@/components/footer";
import Head from "next/head";
import ErrorBoundary from "@/components/error";
export default function Home({ posts }) {
  const currentUrl = `${process.env.NEXT_PUBLIC_URL}`;
  return (
    <div>
      <Head>
        <title>Pranshu&apos;s Blog</title>
        <meta property="og:title" content="Pranshu's Blog" />
        <meta
          property="og:description"
          content="Hi there, I'm Pranshu, aka Brocode! I'm a 24-year-old Software Engineer with a passion for building web applications."
        />
        <meta property="og:url" content={`${currentUrl}`} />
        <meta
          property="og:image"
          content="https://hxwnfkyekkzeimdyyksm.supabase.co/storage/v1/object/public/images/broblogsimages/blue_lake_5-wallpaper-2048x768.jpg"
        />
      </Head>
      <Navbar />
      <div className="h-[710px] mx-auto w-[700px] sm:w-full sm:max-w-[1500px]">
        <ErrorBoundary>
          <About />
          <Blogs posts={posts} />
          <MyProjects />
          <Footer />
        </ErrorBoundary>
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
      revalidate: 10,
    };
  } catch (err) {
    console.log(err);
  }
}
