import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/tanstack-query/queryAndMutations";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess, navigate]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to={"/"}>
          <h3 className="h2-bold md:h3-bold">
            <span className="text-violet-400">E</span>nbik
            <span className="text-violet-400 ml-[-5px]">S</span>ocial
          </h3>
        </Link>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <div className="h-8 w-8 rounded-full overflow-hidden object-cover">
              <img
                src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                alt="profile"
                className=""
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Topbar;
