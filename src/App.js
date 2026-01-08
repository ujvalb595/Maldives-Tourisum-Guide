import { useState } from "react";
import { MapContainer, Marker, ImageOverlay } from "react-leaflet";
import L, { icon } from "leaflet";
import "leaflet/dist/leaflet.css";

/* ================= IMAGE MAP CONFIG ================= */
const IMAGE_BOUNDS = [
  [0, 0],
  [1000, 2000],
];

/* ================= ATOLLS ================= */
const ATOLLS = [
  { id: "north-male", name: "North Malé Atoll", pos: [470, 1720] },
  { id: "south-male", name: "South Malé Atoll", pos: [360, 1420] },
  { id: "ari", name: "Ari Atoll", pos: [560, 1100] },
  { id: "baa", name: "Baa Atoll", pos: [410, 980] },
  { id: "raa", name: "Raa Atoll", pos: [470, 1300] },
  { id: "dhaalu", name: "Dhaalu Atoll", pos: [430, 690] },
  { id: "laamu", name: "Laamu Atoll", pos: [700, 1300] },
  { id: "gaafu", name: "Gaafu Alif Atoll", pos: [300, 250] },
];

/* ================= CATEGORIES ================= */
const CATEGORIES = [
  {
    id: "hotel",
    label: "Hotels",
    //image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
    icons: "/resort.png",
  },
  {
    id: "spa",
    label: "Spa & Wellness",
    //image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
    icons: "/meditation.png",
  },
  {
    id: "hospital",
    label: "Hospitals",
    //image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
    icons: "/image.png",
  },
  {
    id: "pub",
    label: "Pubs & Bars",
    //image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
    icons: "/cocktail.png",
  },
  {
    id: "airport",
    label: "Airports",
    //image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    icons: "/departures.png",
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
        border-width: 2px;
    border-color: #fff;
    background-color: hsl(var(--glass) / 0.2);
    --tw-backdrop-blur: blur(50px);
    transition-duration: 300ms;
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    animation: marker-pulse 2s ease-in-out infinite;
    backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
      ">
        <img src="${iconUrl}" style="width:20px;height:20px;" />
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
            pos: pos[0],
          },
        ],
        hospital: [
          {
            id: 1,
            name: `${a.name}`,
            desc: "24/7 medical care with emergency, outpatient, and diagnostic services provided by experienced healthcare professionals.",
            pos: pos[0],
          },
        ],
        pub: [
          {
            id: 1,
            name: `${a.name} Lagoon Pub`,
            desc: "Nightlife & drinks",
            pos: pos[0],
          },
        ],
        airport: [
          {
            id: 1,
            name: `${a.name} Airport`,
            desc: "Main transport hub",
            pos: pos[0],
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
        <ImageOverlay url="/Maldives_3.jpg" bounds={IMAGE_BOUNDS} />

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
          <div onClick={(e) => e.stopPropagation()} className="parent">
            {/* CARD */}
            <div className="card">
              <button
                onClick={() => setSelectedItem(null)}
                className="close-btn"
              >
                ✕
              </button>
              {/* GLASS LAYER */}
              <div className="glass"></div>

              {/* CONTENT */}
              <div className="content">
                <span className="title">{selectedItem.name}</span>
                <span className="text">{selectedItem.desc}</span>
                {/* <span className="text">{selectedItem.atoll}</span> */}
              </div>

              {/* LOGO CIRCLES (NEEDED FOR EFFECT) */}
              <div className="logo">
                <span className="circle circle1"></span>
                <span className="circle circle2"></span>
                <span className="circle circle3"></span>
                <span className="circle circle4"></span>
                <span className="circle circle5">
                  <svg className="svg" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY CARDS */}
      <div className="absolute text-center bottom-6 left-0 right-0 z-[999] px-4 pointer-events-none">
        <div className="cards-glass-wrapper mx-auto pointer-events-auto">
          <div className="grid grid-cols-5 place-content-center">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                label={cat.label}
                icons={cat.icons}
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
function CategoryCard({ label, icons, onClick, active }) {
  return (
    <div
      onClick={onClick}
      className={`premium-card ${active ? "active" : ""}`}
      style={{ height: "130px", width: "130px" }}
    >
      {/* ICON ONLY */}
      <div className="flex premium-card-icon items-center justify-center">
        <img
          src={icons}
          alt={label}
          className="category-icon"
          draggable="false"
        />
      </div>

      {/* LABEL */}
      <h3 className="premium-card-title bottom-2 left-3 mt-1">{label}</h3>
    </div>
  );
}
