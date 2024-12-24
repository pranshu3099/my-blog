const ShowComments = ({ commentList }) => {
  if (commentList.length === 0) {
    return (
      <div>
        <p>No comments on this post</p>
      </div>
    );
  }
  return (
    <>
      {commentList?.map((comment, index) => {
        return (
          <div key={index} className="mb-5">
            <p>{comment?.name ? comment?.name : comment?.user?.name}</p>
            <p>{comment?.comment}</p>
          </div>
        );
      })}
    </>
  );
};

export default ShowComments;
