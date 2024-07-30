import landing from "../assets/hero-two.jpg";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-sm shadow-md py-8 flex flex-col gap-5 text-center ">
        <h1 className="text-5xl  tracking-tight text-mySecondary">
          Looking for the delicious food in town.
        </h1>
        <SearchBar placeHolder="Search by City" onSubmit={handleSearchSubmit} />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landing} alt="hero image" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter text-mySecondary">
            {" "}
            Order takeaway easy and fast!
          </span>
          <span className="text-mySecondary ">
            Download sewa food for ordering fresh cooked delicacy.
          </span>
          <img src={appDownloadImage} alt="download img" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
