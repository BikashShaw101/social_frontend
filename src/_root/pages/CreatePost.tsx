import PostForm from "@/components/forms/PostForm";

const CreatePost = () => {
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
          <h2 className="w-full text-left h3-bold md:h2-bold">Create post</h2>
        </div>
        {/* Post form components  */}
        <PostForm action="Create" />
      </div>
    </div>
  );
};

export default CreatePost;
