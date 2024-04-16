import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisinesFilter from "@/components/CuisinesFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";

import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

function SearchPage() {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({ ...prevState, sortOption, page: 1 }));
  };
  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => {
      return { ...prevState, searchQuery: searchFormData.searchQuery, page: 1 };
    });
  };

  const resetSearch = () => {
    setSearchState((prevState) => {
      return { ...prevState, searchQuery: "", page: 1 };
    });
  };

  const SetSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => {
      return {
        ...prevState,
        selectedCuisines,
        page: 1,
      };
    });
  };

  const setPage = (page: number) => {
    console.log(page);
    setSearchState((prevState) => {
      return { ...prevState, page };
    });
  };

  if (isLoading) {
    return <span>Loading</span>;
  }

  if (!results?.data || !city) {
    return <span>No Result Found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="cuisines-list">
        <CuisinesFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={SetSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>
      <div className="flex flex-col" id="main-content">
        <SearchBar
          onSubmit={setSearchQuery}
          placeHolder="search by restaurant name or cuisines"
          onReset={resetSearch}
          searchQuery={searchState.searchQuery}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}

        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default SearchPage;
