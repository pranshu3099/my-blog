const url = process.env.NEXT_PUBLIC_API_URL;
const REDIRECT_URL = `${url}/api/auth/github`;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export const handleGithubLogin = (post) => {
  const path = `posts/${post?.posts_id}`;
  if (post) {
    localStorage.setItem("post", JSON.stringify([post]));
  }
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}?path=${path}&scope=user:email`;
};
