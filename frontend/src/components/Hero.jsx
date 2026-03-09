import hero from "../assets/Dhaneshwari Photoshoot/room77.jpeg";

function Hero() {
  return (
    <section className="relative h-[520px]">
      <img src={hero} className="h-full w-full object-cover" />

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 text-white">
        <h1 className="mb-6 text-5xl font-semibold tracking-wide">
          Welcome to Dhaneshwari
        </h1>

        <div className="flex gap-4">
          <button className="rounded-full bg-orange-500 px-8 py-3 text-sm font-medium shadow-lg hover:bg-orange-600">
            Book Now
          </button>

          <button className="rounded-full border border-white/70 px-8 py-3 text-sm font-medium hover:bg-white/10">
            Explore Services
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
