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
      {commentList?.length &&
        commentList?.map((comment, index) => {
          return (
            <div key={index} className="mb-5 h-auto">
              <p className="sm:text-[25px] text-[50px]">
                {comment?.name ? comment?.name : comment?.user?.name}
              </p>
              <p className="sm:text-[25px] text-[50px]">{comment?.comment}</p>
            </div>
          );
        })}
    </>
  );
};

export default ShowComments;
