import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { storeLocations, warehouseOffice, corporateOffice } from '../mock';

// Custom amber pin (SVG → data URL) — themed to Rajan Wines gold accent
const buildIcon = (color = '#d97706', accent = '#fbbf24', size = 36) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 52" width="${size}" height="${size * 1.3}">
      <defs>
        <radialGradient id="g" cx="50%" cy="35%" r="55%">
          <stop offset="0%" stop-color="${accent}"/>
          <stop offset="100%" stop-color="${color}"/>
        </radialGradient>
      </defs>
      <path d="M20 0C9 0 0 9 0 20c0 14 20 32 20 32s20-18 20-32C40 9 31 0 20 0z" fill="url(#g)" stroke="#78350f" stroke-width="1.5"/>
      <circle cx="20" cy="20" r="7" fill="#fffbeb" stroke="#92400e" stroke-width="1.5"/>
    </svg>`;
  return L.divIcon({
    html: svg,
    className: 'rajan-map-pin',
    iconSize: [size, size * 1.3],
    iconAnchor: [size / 2, size * 1.3],
    popupAnchor: [0, -size * 1.2]
  });
};

const storeIcon = buildIcon('#d97706', '#fbbf24', 32);
const officeIcon = buildIcon('#b91c1c', '#f87171', 40);

export const StoreMap = ({ height = '500px' }) => {
  const center = useMemo(() => [27.6, 78.2], []);

  const allOffices = [
    { ...corporateOffice, id: 'corp', label: 'Corporate Office' },
    { ...warehouseOffice, id: 'wh', label: 'Warehouse Office' }
  ];

  return (
    <div
      data-testid="store-leaflet-map"
      className="relative rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl shadow-black/40"
      style={{ height }}
    >
      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', background: '#0a0a0a' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {allOffices.map((office) => (
          <Marker
            key={office.id}
            position={[office.coordinates.lat, office.coordinates.lng]}
            icon={officeIcon}
          >
            <Popup>
              <div style={{ minWidth: 220 }}>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#b45309', fontWeight: 600 }}>
                  {office.label}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginTop: 4 }}>
                  {office.title}
                </div>
                <div style={{ fontSize: 13, color: '#374151', marginTop: 6, lineHeight: 1.45 }}>
                  {office.address}
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block', marginTop: 10, color: '#b45309', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}
                >
                  Get Directions →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
        {storeLocations.map((store) => (
          <Marker
            key={store.id}
            position={[store.coordinates.lat, store.coordinates.lng]}
            icon={storeIcon}
          >
            <Popup>
              <div style={{ minWidth: 220 }}>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#b45309', fontWeight: 600 }}>
                  {store.city}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginTop: 4 }}>
                  {store.name}
                </div>
                <div style={{ fontSize: 13, color: '#374151', marginTop: 6, lineHeight: 1.45 }}>
                  {store.address}
                </div>
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
                  {store.timing}
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block', marginTop: 10, color: '#b45309', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}
                >
                  Get Directions →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
