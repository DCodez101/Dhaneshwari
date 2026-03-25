import {
  Hotel,
  ArrowUp,
  MapPin,
  Camera,
  Bell,
  Clock,
  Compass,
} from "lucide-react";

const features = [
  {
    text: "Prime Location",
    icon: <MapPin className="h-8 w-8 text-emerald-600" />,
  },
  {
    text: "Premium Quality Rooms",
    icon: <Hotel className="h-8 w-8 text-amber-600" />,
  },
  {
    text: "24x7 Reception",
    icon: <Clock className="h-8 w-8 text-blue-600" />,
  },
  {
    text: "Lift Facility",
    icon: <ArrowUp className="h-8 w-8 text-indigo-600" />,
  },
  {
    text: "Premium Hotel Amenities",
    icon: <Bell className="h-8 w-8 text-orange-600" />,
  },
  {
    text: "Darshan Assistance",
    icon: <Compass className="h-8 w-8 text-rose-600" />,
  },
  {
    text: "Tour & Sightseeing",
    icon: <Camera className="h-8 w-8 text-purple-600" />,
  },
];

function WhyChoose() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 pt-8">
      <div className="w-full py-10 sm:py-12 lg:py-16 bg-[#e4dcce] rounded-2xl">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="group relative inline-block text-2xl sm:text-3xl font-semibold text-gray-900 font-[Poppins] cursor-pointer">
            Why Choose Us?
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-[3px] w-12 bg-black transition-all duration-500 group-hover:w-full"></span>
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 px-4">
          {features.map((item, i) => (
            <div
              key={i}
              className="group relative min-h-[120px] overflow-hidden rounded-2xl bg-white p-5 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center justify-center text-center"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 opacity-0 transition-all duration-500 group-hover:via-amber-500/10 group-hover:opacity-100"></div>

              {/* Icon */}
              <div className="relative mb-4 flex justify-center">
                <div className="rounded-xl bg-gray-50 p-3 transition-all duration-500 group-hover:scale-110 group-hover:bg-amber-50 group-hover:shadow-lg">
                  {item.icon}
                </div>
              </div>

              {/* Text */}
              <h3 className="relative text-sm sm:text-base font-semibold text-gray-900 text-center">
                {item.text}
              </h3>

              {/* Bottom line */}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-amber-400 to-amber-600"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
