import { slugify } from "./slugify";
export const generateMetaTags = (post, posts_title) => {
  const postUrl = `${process.env.NEXT_PUBLIC_URL}/posts/${slugify(
    posts_title
  )}`;

  return [
    {
      property: "og:type",
      content: "article",
    },
    {
      name: "description",
      content: post.description,
    },
    {
      property: "og:title",
      content: post.title,
    },
    {
      property: "og:description",
      content: post.description,
    },
    {
      property: "og:image",
      content: post.image,
    },
    {
      property: "og:image:width",
      content: "1200",
    },
    {
      property: "og:image:height",
      content: "630",
    },
    {
      property: "article:published_time",
      content: new Date().toISOString(),
    },
    {
      property: "article:author",
      content: post.author,
    },
    {
      property: "og:url",
      content: postUrl,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: post.title,
    },
    {
      name: "twitter:description",
      content: post.description,
    },
    {
      name: "twitter:url",
      content: postUrl,
    },
    {
      name: "twitter:image",
      content: post.image,
    },
    {
      name: "twitter:image:alt",
      content: post.imageAlt || `An image for ${post.title}`,
    },
    {
      name: "twitter:creator",
      content: post.twitterHandle || "@brocode08071934",
    },
    {
      property: "linkedin:card",
      content: "summary_large_image",
    },
    {
      property: "linkedin:title",
      content: post.title,
    },
    {
      property: "linkedin:description",
      content: post.description,
    },
    {
      property: "linkedin:image",
      content: post.image,
    },
    {
      property: "linkedin:author",
      content: post.author,
    },
  ];
};
