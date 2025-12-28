import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ================= ATOLLS ================= */
const ATOLLS = [
  { id: "north-male", name: "North Malé Atoll", center: [4.1755, 73.5093] },
  { id: "south-male", name: "South Malé Atoll", center: [3.7579, 73.4691] },
  { id: "ari", name: "Ari Atoll", center: [3.47, 72.82] },
  { id: "baa", name: "Baa Atoll", center: [5.2, 73.12] },
  { id: "raa", name: "Raa Atoll", center: [5.6, 72.9] },
  { id: "dhaalu", name: "Dhaalu Atoll", center: [2.74, 72.97] },
  { id: "laamu", name: "Laamu Atoll", center: [1.84, 73.4] },
  { id: "gaafu", name: "Gaafu Alif Atoll", center: [0.72, 73.43] },
];

/* ================= CATEGORIES ================= */
const CATEGORIES = [
  {
    id: "hotel",
    label: "Hotels",
    icon: "🏨",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "spa",
    label: "Spa & Wellness",
    icon: "💆",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
  },
  {
    id: "hospital",
    label: "Hospitals",
    icon: "🏥",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
  },
  {
    id: "pub",
    label: "Pubs & Bars",
    icon: "🍸",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
  },
  {
    id: "airport",
    label: "Airports",
    icon: "✈️",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
];

/* ================= ICONS ================= */
const plusIcon = new L.DivIcon({
  html: `<div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">+</div>`,
  className: "",
});

const icons = {
  hotel: new L.DivIcon({ html: "🏨", className: "text-2xl" }),
  spa: new L.DivIcon({ html: "💆", className: "text-2xl" }),
  hospital: new L.DivIcon({ html: "🏥", className: "text-2xl" }),
  pub: new L.DivIcon({ html: "🍸", className: "text-2xl" }),
  airport: new L.DivIcon({ html: "✈️", className: "text-2xl" }),
};

/* ================= DATA ================= */
const DATA = Object.fromEntries(
  ATOLLS.map((a) => [
    a.id,
    {
      hotel: [
        {
          id: 1,
          name: `${a.name} Resort`,
          lat: a.center[0] + 0.05,
          lng: a.center[1] + 0.05,
          desc: "Luxury island resort",
        },
      ],
      spa: [
        {
          id: 1,
          name: `${a.name} Spa`,
          lat: a.center[0] - 0.04,
          lng: a.center[1] - 0.03,
          desc: "Wellness & relaxation",
        },
      ],
      hospital: [
        {
          id: 1,
          name: `${a.name} Medical Center`,
          lat: a.center[0] + 0.02,
          lng: a.center[1] - 0.02,
          desc: "Emergency services",
        },
      ],
      pub: [
        {
          id: 1,
          name: `${a.name} Lagoon Pub`,
          lat: a.center[0] - 0.02,
          lng: a.center[1] + 0.02,
          desc: "Drinks & nightlife",
        },
      ],
      airport: [
        {
          id: 1,
          name: `${a.name} International Airport`,
          lat: a.center[0],
          lng: a.center[1],
          desc: "Main transport hub",
        },
      ],
    },
  ])
);

/* ================= MAP VIEW ================= */
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

/* ================= APP ================= */
export default function App() {
  const [selectedAtollId, setSelectedAtollId] = useState("all");
  const [activeAtollId, setActiveAtollId] = useState(null);
  const [category, setCategory] = useState(null);
  const [showMarkers, setShowMarkers] = useState(false);

  const isAllAtolls = selectedAtollId === "all";

  const mapCenter = isAllAtolls
    ? [3.2, 73.2]
    : ATOLLS.find((a) => a.id === selectedAtollId).center;

  const zoom = isAllAtolls ? 6 : 9;

  function getFilteredData() {
    if (!category || !activeAtollId) return [];
    return DATA[activeAtollId][category];
  }

  function getCategoryCount(catId) {
    if (selectedAtollId === "all") {
      return ATOLLS.reduce((sum, a) => sum + DATA[a.id][catId].length, 0);
    }
    return DATA[selectedAtollId][catId].length;
  }

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-sky-100 to-blue-200">
      <div className="flex-1 relative flex flex-col">
        {/* MAP */}
        <div className="relative flex-1">
          <MapContainer
            center={mapCenter}
            zoom={zoom}
            className="absolute inset-0"
          >
            <ChangeView center={mapCenter} zoom={zoom} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {category &&
              !showMarkers &&
              (isAllAtolls ? (
                ATOLLS.map((atoll) => (
                  <Marker
                    key={atoll.id}
                    position={atoll.center}
                    icon={plusIcon}
                    eventHandlers={{
                      click: () => {
                        setActiveAtollId(atoll.id);
                        setShowMarkers(true);
                      },
                    }}
                  />
                ))
              ) : (
                <Marker
                  position={mapCenter}
                  icon={plusIcon}
                  eventHandlers={{
                    click: () => {
                      setActiveAtollId(selectedAtollId);
                      setShowMarkers(true);
                    },
                  }}
                />
              ))}

            {showMarkers &&
              getFilteredData().map((item) => (
                <Marker
                  key={`${activeAtollId}-${item.id}`}
                  position={[item.lat, item.lng]}
                  icon={icons[category]}
                >
                  <Popup>
                    <b>{item.name}</b>
                    <br />
                    {item.desc}
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </div>

        {/* CATEGORY CARDS OVERLAY */}
        {/* <div className="absolute bottom-container bottom-6 left-0 right-0 z-[999] px-4 pointer-events-none">
          <div className="cards-glass-wrapper pointer-events-auto">
            <div className="inline-grid grid-cols-5 gap-[10px] place-items-center">
              {CATEGORIES.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  icon={cat.icon}
                  label={cat.label}
                  count={getCategoryCount(cat.id)}
                  image={cat.image}
                  active={category === cat.id}
                  onClick={() => {
                    setCategory(cat.id);
                    setShowMarkers(false);
                    setActiveAtollId(null);
                  }}
                />
              ))}
            </div>
          </div>
        </div> */}
        <div className="absolute bottom-container bottom-6 left-0 right-0 z-[999] px-4 pointer-events-none">
          <div className="cards-glass-wrapper max-w-[900px] mx-auto pointer-events-auto">
            <div className="grid grid-cols-5 gap-[10px]">
              {CATEGORIES.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  icon={cat.icon}
                  label={cat.label}
                  count={getCategoryCount(cat.id)}
                  image={cat.image}
                  active={category === cat.id}
                  onClick={() => {
                    setCategory(cat.id);
                    setShowMarkers(false);
                    setActiveAtollId(null);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ icon, label, count, image, onClick, active }) {
  return (
    <div
      onClick={onClick}
      className={`premium-card ${active ? "active" : ""}`}
      style={{ height: "110px", maxWidth: "250px" }}
    >
      {/* IMAGE */}
      {image && (
        <>
          <div className="premium-card-image">
            <img src={image} alt={label} />
          </div>
          <div className="premium-card-overlay" />
        </>
      )}

      {/* CONTENT */}
      <div className="premium-card-content h-full flex flex-col justify-end text-left">
        {!image && <div className="premium-card-icon">{icon}</div>}

        <h3 className="premium-card-title">{label}</h3>
      </div>
    </div>
  );
}
