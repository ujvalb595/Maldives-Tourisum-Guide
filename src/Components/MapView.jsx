import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { ATOLL_CENTER } from "../Data/locations";
import PlusMarker from "./PlusMarker";
import icon from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = new L.Icon({
  iconUrl: icon,
  shadowUrl: shadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

function MapController({ onIconClick }) {
  const map = useMap();

  const handleIconClick = () => {
    const currentZoom = map.getZoom();
    const targetZoom = currentZoom + 3;
    map.flyTo(ATOLL_CENTER, targetZoom);
    map.once('zoomend', onIconClick);
  };

  return (
    <PlusMarker
      position={ATOLL_CENTER}
      onClick={handleIconClick}
    />
  );
}

export default function MapView({ category, locations, showMarkers, setShowMarkers }) {
  return (
    <MapContainer
      center={ATOLL_CENTER}
      zoom={9}
      className="h-full w-full rounded-2xl"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* + icon */}
      {category && !showMarkers && (
        <PlusMarker
          position={ATOLL_CENTER}
          onClick={() => {
            const map = useMap();
            const currentZoom = map.getZoom();
            const targetZoom = currentZoom + 3;
            map.flyTo(ATOLL_CENTER, targetZoom);
            map.once('zoomend', () => setShowMarkers(true));
          }}
        />
      )}

      {/* Location markers */}
      {showMarkers &&
        locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={defaultIcon}
          >
            <Popup>
              <h3 className="font-bold">{loc.name}</h3>
              <p>{loc.desc}</p>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
