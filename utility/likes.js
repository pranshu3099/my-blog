export const updateLikes = async (url, post_id, user_id, request_for) => {
  try {
    const response = await fetch(
      `${url}/${request_for}/${post_id}/users/${user_id}`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    const result = await response.json();
    return result?.likes;
  } catch (err) {
    console.log(err);
  }
};
