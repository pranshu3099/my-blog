import { useRouter } from "next/router";
import Create from "../create";
const Edit = () => {
  const router = useRouter();
  const post = router.query;
  return (
    <div>
      <Create post={post} />
    </div>
  );
};

export default Edit;
