const ShowComments = ({ commentList }) => {
  console.log(commentList);
  if (commentList?.length === 0) {
    return (
      <div className="h-auto mx-auto sm:w-full max-w-[1500px] w-[1200px] p-10 font-bold">
        <p className="h-auto sm:text-[25px] text-[50px]">
          <p>No comments on this post</p>
        </p>
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
