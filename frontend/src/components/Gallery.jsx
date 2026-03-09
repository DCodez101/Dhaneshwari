import g1 from "../assets/Dhaneshwari Photoshoot/roomwithTV.jpeg";
import g2 from "../assets/Dhaneshwari Photoshoot/room2.jpeg";
import g3 from "../assets/Dhaneshwari Photoshoot/room3.jpeg";
import g4 from "../assets/Dhaneshwari Photoshoot/room4.jpeg";
import g5 from "../assets/Dhaneshwari Photoshoot/room5.jpeg";

const images = [g1, g2, g3, g4, g5];

function Gallery() {
  return (
    <section className="py-16">
      <h2 className="mb-10 text-center text-3xl font-semibold">Gallery</h2>

      <div className="mx-auto grid max-w-6xl grid-cols-5 gap-4 px-4">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className="h-36 w-full rounded-xl object-cover shadow-sm"
          />
        ))}
      </div>
    </section>
  );
}

export default Gallery;
