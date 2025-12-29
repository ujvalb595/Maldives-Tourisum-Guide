// import { useState } from "react";
// import { MapContainer, Marker, Popup, ImageOverlay } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// /* ================= IMAGE MAP CONFIG ================= */
// const IMAGE_BOUNDS = [
//   [0, 0],
//   [1000, 2000], // height, width
// ];

// /* ================= ATOLLS (IMAGE COORDS) ================= */
// const ATOLLS = [
//   { id: "north-male", name: "North Malé Atoll", pos: [150, 300] },
//   { id: "south-male", name: "South Malé Atoll", pos: [250, 420] },
//   { id: "ari", name: "Ari Atoll", pos: [420, 750] },
//   { id: "baa", name: "Baa Atoll", pos: [200, 1050] },
//   { id: "raa", name: "Raa Atoll", pos: [280, 1200] },
//   { id: "dhaalu", name: "Dhaalu Atoll", pos: [560, 900] },
//   { id: "laamu", name: "Laamu Atoll", pos: [680, 1150] },
//   { id: "gaafu", name: "Gaafu Alif Atoll", pos: [820, 1500] },
// ];

// /* ================= CATEGORIES (WITH IMAGES) ================= */
// const CATEGORIES = [
//   {
//     id: "hotel",
//     label: "Hotels",
//     image:
//       "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=870&auto=format&fit=crop",
//   },
//   {
//     id: "spa",
//     label: "Spa & Wellness",
//     image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
//   },
//   {
//     id: "hospital",
//     label: "Hospitals",
//     image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
//   },
//   {
//     id: "pub",
//     label: "Pubs & Bars",
//     image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
//   },
//   {
//     id: "airport",
//     label: "Airports",
//     image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
//   },
// ];

// /* ================= FLATICON ICONS ================= */
// const ICON_SIZE = [36, 36];

// const icons = {
//   hotel: new L.Icon({
//     iconUrl: "/icons/hotel.png",
//     iconSize: ICON_SIZE,
//     iconAnchor: [18, 36],
//     popupAnchor: [0, -36],
//   }),
//   spa: new L.Icon({
//     iconUrl: "/icons/spa.png",
//     iconSize: ICON_SIZE,
//     iconAnchor: [18, 36],
//     popupAnchor: [0, -36],
//   }),
//   hospital: new L.Icon({
//     iconUrl: "/icons/hospital.png",
//     iconSize: ICON_SIZE,
//     iconAnchor: [18, 36],
//     popupAnchor: [0, -36],
//   }),
//   pub: new L.Icon({
//     iconUrl: "/icons/pub.png",
//     iconSize: ICON_SIZE,
//     iconAnchor: [18, 36],
//     popupAnchor: [0, -36],
//   }),
//   airport: new L.Icon({
//     iconUrl: "/icons/airport.png",
//     iconSize: ICON_SIZE,
//     iconAnchor: [18, 36],
//     popupAnchor: [0, -36],
//   }),
// };

// /* ================= DATA ================= */
// const DATA = Object.fromEntries(
//   ATOLLS.map((a) => [
//     a.id,
//     {
//       hotel: [
//         {
//           id: 1,
//           name: `${a.name} Resort`,
//           pos: [a.pos[0] + 20, a.pos[1] + 30],
//           desc: "Luxury island resort",
//         },
//       ],
//       spa: [
//         {
//           id: 1,
//           name: `${a.name} Spa`,
//           pos: [a.pos[0] - 15, a.pos[1] - 20],
//           desc: "Wellness & relaxation",
//         },
//       ],
//       hospital: [
//         {
//           id: 1,
//           name: `${a.name} Medical Center`,
//           pos: [a.pos[0] + 10, a.pos[1] - 10],
//           desc: "Emergency services",
//         },
//       ],
//       pub: [
//         {
//           id: 1,
//           name: `${a.name} Lagoon Pub`,
//           pos: [a.pos[0] - 10, a.pos[1] + 15],
//           desc: "Drinks & nightlife",
//         },
//       ],
//       airport: [
//         {
//           id: 1,
//           name: `${a.name} Airport`,
//           pos: a.pos,
//           desc: "Main transport hub",
//         },
//       ],
//     },
//   ])
// );

// /* ================= APP ================= */
// export default function App() {
//   const [activeAtollId, setActiveAtollId] = useState(null);
//   const [category, setCategory] = useState(null);
//   const [showMarkers, setShowMarkers] = useState(false);

//   function getFilteredData() {
//     if (!category || !activeAtollId) return [];
//     return DATA[activeAtollId][category];
//   }

//   return (
//     <div className="flex h-screen w-screen relative bg-gradient-to-br from-sky-100 to-blue-200">
//       <div className="flex-1 relative">
//         <MapContainer
//           crs={L.CRS.Simple}
//           bounds={IMAGE_BOUNDS}
//           maxBounds={IMAGE_BOUNDS}
//           zoom={-1}
//           className="absolute inset-0"
//         >
//           <ImageOverlay url="/Maldives-3D-Final.jpg" bounds={IMAGE_BOUNDS} />

//           {/* ATOLL LEVEL */}
//           {category &&
//             !showMarkers &&
//             ATOLLS.map((atoll) => (
//               <Marker
//                 key={atoll.id}
//                 position={atoll.pos}
//                 icon={icons[category]}
//                 eventHandlers={{
//                   click: () => {
//                     setActiveAtollId(atoll.id);
//                     setShowMarkers(true);
//                   },
//                 }}
//               />
//             ))}

//           {/* PLACE LEVEL */}
//           {showMarkers &&
//             getFilteredData().map((item) => (
//               <Marker key={item.id} position={item.pos} icon={icons[category]}>
//                 <Popup closeButton={false} autoPan>
//                   <div className="card">
//                     <div className="card__border"></div>

//                     <div className="card_title__container">
//                       <p className="card_title">{item.name}</p>
//                       <p className="card_paragraph">{item.desc}</p>
//                     </div>

//                     <hr className="line" />

//                     <ul className="card__list">
//                       <li className="card__list_item">
//                         <span className="check">
//                           <svg className="check_svg" viewBox="0 0 24 24">
//                             <path d="M20 6L9 17l-5-5" />
//                           </svg>
//                         </span>
//                         <span className="list_text">Premium Location</span>
//                       </li>

//                       <li className="card__list_item">
//                         <span className="check">
//                           <svg className="check_svg" viewBox="0 0 24 24">
//                             <path d="M20 6L9 17l-5-5" />
//                           </svg>
//                         </span>
//                         <span className="list_text">24/7 Service</span>
//                       </li>
//                     </ul>

//                     <button className="button">Explore</button>
//                   </div>
//                 </Popup>
//               </Marker>
//             ))}
//         </MapContainer>

//         {/* CATEGORY CARDS */}
//         {/* <div className="absolute bottom-6 left-0 right-0 z-[999] px-4 pointer-events-none">
//           <div className="cards-glass-wrapper max-w-[900px] mx-auto pointer-events-auto">
//             <div className="grid grid-cols-5 gap-[10px]">
//               {CATEGORIES.map((cat) => (
//                 <CategoryCard
//                   key={cat.id}
//                   label={cat.label}
//                   image={cat.image}
//                   active={category === cat.id}
//                   onClick={() => {
//                     setCategory(cat.id);
//                     setShowMarkers(false);
//                     setActiveAtollId(null);
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         </div> */}
//         <div className="absolute bottom-6 left-0 right-0 z-[999] px-4 pointer-events-none">
//           <div className="cards-glass-wrapper pointer-events-auto mx-auto">
//             <div className="grid grid-cols-5 gap-[10px] place-content-center">
//               {CATEGORIES.map((cat) => (
//                 <CategoryCard
//                   key={cat.id}
//                   label={cat.label}
//                   image={cat.image}
//                   active={category === cat.id}
//                   onClick={() => {
//                     setCategory(cat.id);
//                     setShowMarkers(false);
//                     setActiveAtollId(null);
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= CATEGORY CARD ================= */
// function CategoryCard({ label, image, onClick, active }) {
//   return (
//     <div
//       onClick={onClick}
//       className={`premium-card ${active ? "active" : ""}`}
//       style={{ height: "110px", maxWidth: "250px" }}
//     >
//       {image && (
//         <>
//           <div className="premium-card-image">
//             <img src={image} alt={label} />
//           </div>
//           <div className="premium-card-overlay" />
//         </>
//       )}

//       <div className="premium-card-content h-full flex flex-col justify-end text-left">
//         <h3 className="premium-card-title">{label}</h3>
//       </div>
//     </div>
//   );
// }



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
  { id: "north-male", name: "North Malé Atoll", pos: [150, 300] },
  { id: "south-male", name: "South Malé Atoll", pos: [250, 420] },
  { id: "ari", name: "Ari Atoll", pos: [420, 750] },
  { id: "baa", name: "Baa Atoll", pos: [200, 1050] },
  { id: "raa", name: "Raa Atoll", pos: [280, 1200] },
  { id: "dhaalu", name: "Dhaalu Atoll", pos: [560, 900] },
  { id: "laamu", name: "Laamu Atoll", pos: [680, 1150] },
  { id: "gaafu", name: "Gaafu Alif Atoll", pos: [820, 1500] },
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
const ICON_SIZE = [36, 36];

const icons = {
  hotel: new L.Icon({ iconUrl: "/icons/hotel.png", iconSize: ICON_SIZE, iconAnchor: [18, 36] }),
  spa: new L.Icon({ iconUrl: "/icons/spa.png", iconSize: ICON_SIZE, iconAnchor: [18, 36] }),
  hospital: new L.Icon({ iconUrl: "/icons/hospital.png", iconSize: ICON_SIZE, iconAnchor: [18, 36] }),
  pub: new L.Icon({ iconUrl: "/icons/pub.png", iconSize: ICON_SIZE, iconAnchor: [18, 36] }),
  airport: new L.Icon({ iconUrl: "/icons/airport.png", iconSize: ICON_SIZE, iconAnchor: [18, 36] }),
};

/* ================= DATA ================= */
const DATA = Object.fromEntries(
  ATOLLS.map((a) => [
    a.id,
    {
      hotel: [{ id: 1, name: `${a.name} Resort`, pos: [a.pos[0] + 20, a.pos[1] + 30], desc: "Luxury island resort" }],
      spa: [{ id: 1, name: `${a.name} Spa`, pos: [a.pos[0] - 15, a.pos[1] - 20], desc: "Wellness & relaxation" }],
      hospital: [{ id: 1, name: `${a.name} Medical Center`, pos: [a.pos[0] + 10, a.pos[1] - 10], desc: "Emergency services" }],
      pub: [{ id: 1, name: `${a.name} Lagoon Pub`, pos: [a.pos[0] - 10, a.pos[1] + 15], desc: "Drinks & nightlife" }],
      airport: [{ id: 1, name: `${a.name} Airport`, pos: a.pos, desc: "Main transport hub" }],
    },
  ])
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
