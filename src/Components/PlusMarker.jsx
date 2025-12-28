import { Marker } from "react-leaflet";
import L from "leaflet";

const plusIcon = new L.DivIcon({
  html: `<div class="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-xl">+</div>`,
  className: "",
});

export default function PlusMarker({ position, onClick }) {
  return (
    <Marker
      position={position}
      icon={plusIcon}
      eventHandlers={{ click: onClick }}
    />
  );
}
