import React, { useEffect, useRef } from 'react';
import { MarkerArea, HighlightMarker } from 'markerjs2';

const DrawCanvas = ({ imgSrc }) => {
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current) {
      const markerArea = new MarkerArea(imgRef.current);
      markerArea.availableMarkerTypes = [HighlightMarker]; // Restrict to only FrameMarker

      // Customize FrameMarker settings for fill and stroke color
      markerArea.settings.defaultFrameMarkerSettings = {
        fillColor: 'rgba(255, 0, 0, 0.8)', // Fill color with opacity
        strokeColor: 'red'                // Stroke color
      };

      markerArea

      markerArea.addEventListener('render', (event) => {
        imgRef.current.src = event.dataUrl;
      });
      
      markerArea.show();
    }
  }, [imgSrc]);

  return (
    <div>
      <img ref={imgRef} src={imgSrc} alt="Upload" style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
};

export default DrawCanvas;
