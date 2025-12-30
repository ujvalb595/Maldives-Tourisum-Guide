import { useState } from "react";
import { MapContainer, Marker, ImageOverlay } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ================= IMAGE MAP CONFIG ================= */
const IMAGE_BOUNDS = [
  [0, 0],
  [1000, 2000],
];

/* ================= ATOLLS ================= */
const ATOLLS = [
  { id: "north-male", name: "North Malé Atoll", pos: [210, 1450] },
  { id: "south-male", name: "South Malé Atoll", pos: [180, 1770] },
  { id: "ari", name: "Ari Atoll", pos: [510, 1150] },
  { id: "baa", name: "Baa Atoll", pos: [300, 1000] },
  { id: "raa", name: "Raa Atoll", pos: [440, 1350] },
  { id: "dhaalu", name: "Dhaalu Atoll", pos: [460, 660] },
  { id: "laamu", name: "Laamu Atoll", pos: [660, 860] },
  { id: "gaafu", name: "Gaafu Alif Atoll", pos: [780, 450] },
];

/* ================= CATEGORIES ================= */
const CATEGORIES = [
  {
    id: "hotel",
    label: "Hotels",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
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
    className: "",
    html: `
      <div style="
        width:42px;height:42px;
        background:white;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        box-shadow:0 6px 14px rgba(0,0,0,0.25);
      ">
        <img src="${iconUrl}" style="width:22px;height:22px;" />
      </div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
}

const icons = {
  hotel: createCircleIcon("/resort.png"),
  spa: createCircleIcon("/meditation.png"),
  hospital: createCircleIcon("/image.png"),
  pub: createCircleIcon("/cocktail.png"),
  airport: createCircleIcon("/departures.png"),
};

/* ================= HELPERS ================= */
function radialPositions(center, count, radius = 40) {
  const [cy, cx] = center;
  return Array.from({ length: count }, (_, i) => {
    const angle = (2 * Math.PI * i) / count;
    return [cy + Math.sin(angle) * radius, cx + Math.cos(angle) * radius];
  });
}

/* ================= DATA ================= */
const DATA = Object.fromEntries(
  ATOLLS.map((a) => {
    const pos = radialPositions(a.pos, 5);
    return [
      a.id,
      {
        hotel: [
          {
            id: 1,
            name: `${a.name} Resort`,
            desc: "Luxury island resort",
            pos: pos[0],
          },
        ],
        spa: [
          {
            id: 1,
            name: `${a.name} Spa`,
            desc: "Wellness & relaxation",
            pos: pos[1],
          },
        ],
        hospital: [
          {
            id: 1,
            name: `${a.name} Medical Center`,
            desc: "Emergency services",
            pos: pos[2],
          },
        ],
        pub: [
          {
            id: 1,
            name: `${a.name} Lagoon Pub`,
            desc: "Nightlife & drinks",
            pos: pos[3],
          },
        ],
        airport: [
          {
            id: 1,
            name: `${a.name} Airport`,
            desc: "Main transport hub",
            pos: pos[4],
          },
        ],
      },
    ];
  })
);

/* ================= APP ================= */
export default function App() {
  const [category, setCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="h-screen w-screen relative">
      <MapContainer
        crs={L.CRS.Simple}
        bounds={IMAGE_BOUNDS}
        maxBounds={IMAGE_BOUNDS}
        zoom={-1}
        className="absolute inset-0"
      >
        <ImageOverlay url="/Maldives-3D-Final.jpg" bounds={IMAGE_BOUNDS} />

        {category &&
          ATOLLS.flatMap((atoll) =>
            DATA[atoll.id][category].map((item) => (
              <Marker
                key={`${atoll.id}-${item.id}`}
                position={item.pos}
                icon={icons[category]}
                eventHandlers={{
                  click: () =>
                    setSelectedItem({
                      ...item,
                      atoll: atoll.name,
                      category,
                    }),
                }}
              />
            ))
          )}
      </MapContainer>

      {/* ================= GLASS POPUP ================= */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-[1000] bg-black/30 backdrop-blur-sm flex items-center justify-center"
        >
          <div onClick={(e) => e.stopPropagation()} className="card">
            {/* Rotating Neon Border */}
            <div className="card__border"></div>

            <div className="card_title__container">
              <p className="card_title">{selectedItem.name}</p>
              <p className="card_paragraph">{selectedItem.atoll}</p>
            </div>

            <hr className="line" />

            <p className="card_paragraph">{selectedItem.desc}</p>

            <ul className="card__list">
              <li className="card__list_item">
                <span className="check">
                  <svg className="check_svg" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <span className="list_text">Premium Location</span>
              </li>

              <li className="card__list_item">
                <span className="check">
                  <svg className="check_svg" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <span className="list_text">24/7 Service</span>
              </li>
            </ul>

            <button className="button">Explore</button>
          </div>
        </div>
      )}
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
