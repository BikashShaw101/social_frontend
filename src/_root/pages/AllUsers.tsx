import UserCard from "@/components/shared/UserCard";
import { useToast } from "@/components/ui/use-toast";
import { useGetusers } from "@/lib/tanstack-query/queryAndMutations";
import Loader from "../../components/shared/Loader";

const AllUsers = () => {
  const { toast } = useToast();
  const {
    data: creators,
    isPending: isLoadingUsers,
    isError: isErrorUsers,
  } = useGetusers();

  if (isErrorUsers) {
    toast({ title: "Something ent wrong" });
    return;
  }
  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left lg:text-center w-full">
          All Users
        </h2>
        {isLoadingUsers || !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li key={creator.$id} className="flex-1 min-w-[200px] w-full">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
