import { Marker, useMap } from "react-leaflet";

export default function ZoomMarker({ position, icon, onClick }) {
  const map = useMap();

  const handleClick = () => {
    const currentZoom = map.getZoom();
    const targetZoom = currentZoom + 2; // Zoom in by 2 levels
    map.flyTo(position, targetZoom);
    // After zoom, trigger the original onClick (e.g., open popup)
    map.once('zoomend', onClick);
  };

  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{
        click: handleClick,
      }}
    />
  );
}
