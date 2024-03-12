function Footer() {
  return (
    <div className="bg-orange-500 py-10 ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          Sewa Food
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <span>Privacy policies</span>
          <span>Terms of Services</span>
        </span>
      </div>
      <p className="inline-block w-full text-center text-sm  text-white">
        Copyright &copy; 2024 || Sewa Food all rights reserved.
      </p>
    </div>
  );
}

export default Footer;
