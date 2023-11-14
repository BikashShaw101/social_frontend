import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultProps) => {
  if (isSearchFetching) {
    return <Loader />;
  }

  if(searchedPosts && searchedPosts.documents.length > 0){
    return (
        <GridPostList posts={searchedPosts.documents}/>
    )
  }
  return <p className="text-light-4 mt-10 w-full text-center">No results found</p>;
};

export default SearchResults;
