import image1 from "../assets/Dhaneshwari Photoshoot/Kashi-Vishwanath.webp";
import image2 from "../assets/Dhaneshwari Photoshoot/kalBharavTemple.webp";
import image3 from "../assets/Dhaneshwari Photoshoot/eveningArati.webp";
import image4 from "../assets/Dhaneshwari Photoshoot/roomwithChaire.jpeg";

const attractions = [
  {
    title: "Kashi Vishwanath",
    desc: "Sacred temple dedicated to Lord Shiva in Varanasi.",
    img: image1,
  },
  {
    title: "Kal Bhairav Temple",
    desc: "Ancient temple known as the guardian of Kashi.",
    img: image2,
  },
  {
    title: "Evening Ganga Aarti",
    desc: "Spiritual evening ritual on the holy Ganga ghats.",
    img: image3,
  },
  {
    title: "Premium Room",
    desc: "Comfortable room with modern design and amenities.",
    img: image4,
  },
];

function Attractions() {
  return (
    <section className="py-16">
      <h2 className="mb-12 text-center text-3xl font-semibold">
        Famous Attractions
      </h2>

      <div className="mx-auto grid max-w-6xl grid-cols-4 gap-6 px-4">
        {attractions.map((item, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl bg-white shadow-md"
          >
            <img src={item.img} className="h-40 w-full object-cover" />

            <div className="p-5">
              <h3 className="mb-1 text-base font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Attractions;
