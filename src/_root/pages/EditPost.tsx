import { useParams } from "react-router-dom";
import PostForm from "@/components/forms/PostForm";
import { useGetPostById } from "@/lib/tanstack-query/queryAndMutations";
import Loader from "@/components/shared/Loader";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  if (isPending)
    return (
      <div>
        <Loader />
      </div>
    );
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/add-post.svg"
            alt="add-post"
            width={36}
            height={36}
          />
          <h2 className="w-full text-left h3-bold md:h2-bold">Edit post</h2>
        </div>
        {/* Post form components  */}
        <PostForm action="Update" post={post} />
      </div>
    </div>
  );
};

export default EditPost;
