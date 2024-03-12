import landing from "../assets/hero-two.jpg";
import appDownloadImage from "../assets/appDownload.png";
function homePage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-md shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Your only Sewa Takeaway.
        </h1>
        <span className="text-xl">Food is in your hand</span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landing} alt="hero image" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            {" "}
            Order takeaway easy and fast!
          </span>
          <span>Download sewa food for ordering fresh cooked delicacy.</span>
          <img src={appDownloadImage} alt="download img" />
        </div>
      </div>
    </div>
  );
}

export default homePage;
