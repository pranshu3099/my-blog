const meta_content = [
  {
    blog_title: "Bun vs Node",
    title: "A Deep Dive into Bun vs. Node: Pros, Cons, and Use Cases",
    description:
      "Considering Bun or Node.js for your next project? We've got you covered with an extensive comparison. Dive into the details and choose the right tool for your needs.",
    image:
      "https://hxwnfkyekkzeimdyyksm.supabase.co/storage/v1/object/public/images/broblogsimages/ijvfue6cl2e33gqzl9a7.webp",
    author: "Pranshu Srivastava",
    imageAlt: "Comparison between Bun and Node.js",
    twitterHandle: "@pranshukodes",
  },
  {
    blog_title: "Microfrontend Architecture",
    title: "A Deep Dive into Micro frontend Architecture",
    description:
      "Considering Micro Frontend for your next project? We've got you covered with an extensive Knowledge. Dive into the details and choose the right tool for your needs.",
    image:
      "https://hxwnfkyekkzeimdyyksm.supabase.co/storage/v1/object/public/images/broblogsimages/microfrontend.png",
    author: "Pranshu Srivastava",
    imageAlt: "Mircofrontend Architecture",
    twitterHandle: "@pranshukodes",
  },
];

export const getMetaContent = (title) => {
  const result = meta_content.filter((content) => {
    return content.blog_title.toLowerCase() === title.toLowerCase();
  });
  return result;
};
