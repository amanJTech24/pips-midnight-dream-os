import { useState } from 'react';
import { Map, Send, RotateCcw, CheckCircle2 } from 'lucide-react';
import { dreamLocations } from '../data/dreamLocations.js';
import './DreamMap.css';

/**
 * DreamMap — Project C: Interactive vector-illustrated Midnight Nursery map.
 * Allows visitors to pick dream targets, visualize animated delivery paths, and dispatch dreams.
 */
export default function DreamMap({ playClick }) {
  const [selectedLoc, setSelectedLoc] = useState(dreamLocations[0]);
  const [isDelivering, setIsDelivering] = useState(false);
  const [deliveryComplete, setDeliveryComplete] = useState(false);

  // Origin point: Midnight Nursery (approx 35% x, 55% y)
  const nursery = dreamLocations.find(l => l.id === 'midnight-nursery') || { x: 35, y: 55 };

  const handleSelectLocation = (loc) => {
    if (playClick) playClick();
    setSelectedLoc(loc);
    setDeliveryComplete(false);
    setIsDelivering(false);
  };

  const handleDeliver = () => {
    if (playClick) playClick();
    setIsDelivering(true);
    setDeliveryComplete(false);

    setTimeout(() => {
      setIsDelivering(false);
      setDeliveryComplete(true);
    }, 1400);
  };

  const handleReset = () => {
    if (playClick) playClick();
    setSelectedLoc(dreamLocations[0]);
    setIsDelivering(false);
    setDeliveryComplete(false);
  };

  return (
    <div id="dream-map" className="dream-map-card card" aria-label="Dream Delivery Routes">
      <div className="map-header">
        <div className="project-badge">
          <Map size={16} />
          <span>Project C // Dream_Routes.map</span>
        </div>
        <h3>Dream Delivery Routes</h3>
        <p className="project-tagline">
          An illustrated midnight map of the neighborhood Pip glides across to deliver hand-wrapped dreams.
        </p>
      </div>

      <div className="dream-map-viewport">
        {/* Sky with stars and moon */}
        <div className="map-sky-decor" aria-hidden="true">
          <span className="map-crescent-moon">🌙</span>
          <span className="map-sky-star" style={{ top: '15%', left: '20%' }}>✦</span>
          <span className="map-sky-star" style={{ top: '35%', left: '55%' }}>✦</span>
          <span className="map-sky-star" style={{ top: '10%', left: '80%' }}>✦</span>
          <span className="map-sky-star" style={{ top: '48%', left: '12%' }}>✦</span>
        </div>

        {/* Dynamic SVG delivery trajectory line */}
        <svg className="map-route-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {selectedLoc && (
            <line
              x1={nursery.x}
              y1={nursery.y}
              x2={selectedLoc.x}
              y2={selectedLoc.y}
              className={`route-line ${isDelivering ? 'route-active' : ''}`}
            />
          )}
        </svg>

        {/* Location Markers */}
        <div className="map-pins-container">
          {dreamLocations.map((loc) => {
            const isSelected = selectedLoc?.id === loc.id;
            const isNursery = loc.id === 'midnight-nursery';

            return (
              <button
                key={loc.id}
                type="button"
                className={`map-node-pin ${isSelected ? 'pin-selected' : ''} ${isNursery ? 'pin-hub' : ''}`}
                style={{
                  left: `${loc.x}%`,
                  top: `${loc.y}%`,
                  '--pin-accent': loc.color,
                }}
                onClick={() => handleSelectLocation(loc)}
                aria-label={`Select destination ${loc.name}`}
              >
                <span className="pin-emoji">{loc.emoji}</span>
                <span className="pin-label-pill">{loc.name}</span>
                {isSelected && <span className="pin-halo" />}
              </button>
            );
          })}
        </div>

        {/* Flying Pip delivery courier sprite */}
        {isDelivering && selectedLoc && (
          <div
            className="courier-pip-sprite"
            style={{
              '--target-x': `${selectedLoc.x}%`,
              '--target-y': `${selectedLoc.y}%`,
              '--start-x': `${nursery.x}%`,
              '--start-y': `${nursery.y}%`,
            }}
            aria-hidden="true"
          >
            <span>✨👶✨</span>
          </div>
        )}
      </div>

      <div className="map-dashboard-panel">
        {selectedLoc ? (
          <div className="destination-details">
            <div className="dest-title-row">
              <span className="dest-emoji">{selectedLoc.emoji}</span>
              <div>
                <h4 className="dest-name">{selectedLoc.name}</h4>
                <span className="dest-type">{selectedLoc.dreamType}</span>
              </div>
            </div>

            <p className="dest-desc">{selectedLoc.description}</p>

            <div className="dest-actions">
              {deliveryComplete ? (
                <div className="delivery-status-success animate-fade-in">
                  <CheckCircle2 size={18} className="success-icon" />
                  <span>Dream safely slipped under the pillow! 💫</span>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={handleReset}>
                    <RotateCcw size={14} /> New Route
                  </button>
                </div>
              ) : (
                <div className="dest-btn-group">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleDeliver}
                    disabled={isDelivering}
                  >
                    <Send size={16} />
                    <span>{isDelivering ? 'Delivering Dream...' : `Dispatch Dream to ${selectedLoc.name}`}</span>
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={handleReset}>
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="empty-map-prompt">Click any landmark pin on the map to plot Pip's midnight journey.</p>
        )}
      </div>
    </div>
  );
}
