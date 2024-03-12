import hero from "../assets/hero-one.jpg";

function Hero() {
  return (
    <div>
      <img className="w-full max-h-[600px] object-cover " src={hero} alt="Hero Image" />
    </div>
  );
}

export default Hero;
