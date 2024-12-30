const meta_content = [
  {
    id: 2505,
    content: [
      {
        content:
          "Considering Bun or Node.js for your next project? We've got you covered with an extensive comparison. Dive into the details and choose the right tool for your needs.",
        key: "description",
        name: "description",
        property: "",
      },
      {
        content: "A Deep Dive into Bun vs. Node: Pros, Cons, and Use Cases",
        key: "title",
        property: "og:title",
        name: "",
      },
      {
        content:
          "Considering Bun or Node.js for your next project? We've got you covered with an extensive comparison. Dive into the details and choose the right tool for your needs.",
        property: "og:description",
        key: "description",
        name: "",
      },
      {
        property: "og:image",
        content:
          "https://hxwnfkyekkzeimdyyksm.supabase.co/storage/v1/object/public/images/broblogsimages/ijvfue6cl2e33gqzl9a7.webp",
        key: "",
        name: "",
      },
    ],
  },
];

export const getMetaContent = (post_id) => {
  const result = meta_content.filter((content) => {
    return content.id === post_id;
  });
  return result;
};
