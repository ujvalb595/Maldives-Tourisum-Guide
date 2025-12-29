import { useState } from "react";
import { MapContainer, Marker, Popup, ImageOverlay } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ================= IMAGE MAP CONFIG ================= */
const IMAGE_BOUNDS = [
  [0, 0],
  [1000, 2000],
];

/* ================= ATOLLS ================= */
const ATOLLS = [
  { id: "north-male", name: "North Malé Atoll", pos: [210, 1450] }, //8.
  { id: "south-male", name: "South Malé Atoll", pos: [180, 1770] }, //6.
  { id: "ari", name: "Ari Atoll", pos: [510, 1150] }, //4.
  { id: "baa", name: "Baa Atoll", pos: [300, 1000] }, //7.
  { id: "raa", name: "Raa Atoll", pos: [440, 1350] }, //5.
  { id: "dhaalu", name: "Dhaalu Atoll", pos: [460, 660] }, //3.
  { id: "laamu", name: "Laamu Atoll", pos: [660, 860] }, //2.
  { id: "gaafu", name: "Gaafu Alif Atoll", pos: [780, 450] }, // 1.
];

/* ================= CATEGORIES ================= */
const CATEGORIES = [
  {
    id: "hotel",
    label: "Hotels",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=870&auto=format&fit=crop",
  },
  {
    id: "spa",
    label: "Spa & Wellness",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
  },
  {
    id: "hospital",
    label: "Hospitals",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
  },
  {
    id: "pub",
    label: "Pubs & Bars",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
  },
  {
    id: "airport",
    label: "Airports",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
];

/* ================= ICONS ================= */
function createCircleIcon(iconUrl) {
  return L.divIcon({
    className: "", // IMPORTANT: prevent default styles
    html: `
      <div style="
        width: 42px;
        height: 42px;
        background: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 14px rgba(0,0,0,0.25);
        border: 1px solid rgba(0,0,0,0.1);
      ">
        <img src="${iconUrl}" style="
          width: 22px;
          height: 22px;
          object-fit: contain;
        " />
      </div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 42], // bottom-center
    popupAnchor: [0, -42],
  });
}

const icons = {
  hotel: createCircleIcon("/resort.png"),
  spa: createCircleIcon("/meditation.png"),
  hospital: createCircleIcon("/image.png"),
  pub: createCircleIcon("/cocktail.png"),
  airport: createCircleIcon("/departures.png"),
};

function radialPositions(center, count, radius = 35) {
  const [cy, cx] = center;
  return Array.from({ length: count }, (_, i) => {
    const angle = (2 * Math.PI * i) / count;
    return [cy + Math.sin(angle) * radius, cx + Math.cos(angle) * radius];
  });
}

/* ================= DATA ================= */
const DATA = Object.fromEntries(
  ATOLLS.map((a) => {
    const positions = radialPositions(a.pos, 5, 40); // 🔥 dynamic

    return [
      a.id,
      {
        hotel: [
          {
            id: 1,
            name: `${a.name} Resort`,
            pos: positions[0],
            desc: "Luxury island resort",
          },
        ],
        spa: [
          {
            id: 1,
            name: `${a.name} Spa`,
            pos: positions[1],
            desc: "Wellness & relaxation",
          },
        ],
        hospital: [
          {
            id: 1,
            name: `${a.name} Medical Center`,
            pos: positions[2],
            desc: "Emergency services",
          },
        ],
        pub: [
          {
            id: 1,
            name: `${a.name} Lagoon Pub`,
            pos: positions[3],
            desc: "Drinks & nightlife",
          },
        ],
        airport: [
          {
            id: 1,
            name: `${a.name} Airport`,
            pos: positions[4],
            desc: "Main transport hub",
          },
        ],
      },
    ];
  })
);

/* ================= APP ================= */
export default function App() {
  const [category, setCategory] = useState(null);

  return (
    <div className="flex h-screen w-screen relative bg-gradient-to-br from-sky-100 to-blue-200">
      <MapContainer
        crs={L.CRS.Simple}
        bounds={IMAGE_BOUNDS}
        maxBounds={IMAGE_BOUNDS}
        zoom={-1}
        className="absolute inset-0"
      >
        <ImageOverlay url="/Maldives-3D-Final.jpg" bounds={IMAGE_BOUNDS} />

        {/* ✅ ALL ICONS ALWAYS VISIBLE */}
        {category &&
          ATOLLS.flatMap((atoll) =>
            DATA[atoll.id][category].map((item) => (
              <Marker
                key={`${atoll.id}-${item.id}`}
                position={item.pos}
                icon={icons[category]}
              >
                <Popup closeButton={false} autoPan>
                  <div className="card">
                    <div className="card__border"></div>

                    <div className="card_title__container">
                      <p className="card_title">{item.name}</p>
                      <p className="card_paragraph">{item.desc}</p>
                    </div>

                    <hr className="line" />

                    <ul className="card__list">
                      <li className="card__list_item">
                        <span className="card_paragraph">✓</span>
                        <span className="card_paragraph">Premium Location</span>
                      </li>
                      <li className="card__list_item">
                        <span className="card_paragraph">✓</span>
                        <span className="card_paragraph">24/7 Service</span>
                      </li>
                    </ul>

                    <button className="card_paragraph">Explore</button>
                  </div>
                </Popup>
              </Marker>
            ))
          )}
      </MapContainer>

      {/* CATEGORY CARDS */}
      <div className="absolute bottom-6 left-0 right-0 z-[999] px-4 pointer-events-none">
        <div className="cards-glass-wrapper mx-auto pointer-events-auto">
          <div className="grid grid-cols-5 gap-[10px] place-content-center">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                label={cat.label}
                image={cat.image}
                active={category === cat.id}
                onClick={() => setCategory(cat.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= CATEGORY CARD ================= */
function CategoryCard({ label, image, onClick, active }) {
  return (
    <div
      onClick={onClick}
      className={`premium-card ${active ? "active" : ""}`}
      style={{ height: "90px", maxWidth: "180px" }}
    >
      <div className="premium-card-image">
        <img src={image} alt={label} />
      </div>
      <div className="premium-card-overlay" />
      <div className="premium-card-content h-full flex items-end">
        <h3 className="premium-card-title">{label}</h3>
      </div>
    </div>
  );
}
