import React, { useEffect, useRef } from 'react';
import { MarkerArea, HighlightMarker } from 'markerjs2';

const DrawCanvas = ({ imgSrc }) => {
  const imgRef = useRef(null);
  const markerAreaRef = useRef(null);

  useEffect(() => {
    if (imgRef.current) {
      const markerArea = new MarkerArea(imgRef.current);
      markerArea.availableMarkerTypes = [HighlightMarker];

      markerArea.addEventListener('render', (event) => {
        imgRef.current.src = event.dataUrl;
      });

      markerArea.show();
      markerAreaRef.current = markerArea; // Save markerArea instance to ref
    }
  }, [imgSrc]);

  const handleSaveSvg = async () => {
    const markerArea = markerAreaRef.current;
    if (markerArea) {
      // Get the canvas element that contains the markers
      const canvasElement = document.querySelector('canvas');

      // Get the SVG content from the markers
      const markerSvg = markerArea.markerLayer?.querySelector('svg');
      const markerSvgContent = markerSvg ? markerSvg.innerHTML : '';

      // Create a new SVG element
      const svgNamespace = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNamespace, "svg");
      svg.setAttribute("width", imgRef.current.naturalWidth);
      svg.setAttribute("height", imgRef.current.naturalHeight);
      svg.setAttribute("viewBox", `0 0 ${imgRef.current.naturalWidth} ${imgRef.current.naturalHeight}`);

      // Add the image element to the new SVG
      const image = document.createElementNS(svgNamespace, "image");
      image.setAttributeNS(null, "href", imgSrc);
      image.setAttribute("width", imgRef.current.naturalWidth);
      image.setAttribute("height", imgRef.current.naturalHeight);
      svg.appendChild(image);

      // Add the marker SVG content to the new SVG
      const markerSvgElement = document.createElementNS(svgNamespace, "g");
      markerSvgElement.innerHTML = markerSvgContent;
      svg.appendChild(markerSvgElement);

      // Serialize the SVG and trigger download
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const svgUrl = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement("a");
      downloadLink.href = svgUrl;
      downloadLink.download = "image-with-markers.svg";
      downloadLink.click();
    } else {
      console.error("MarkerArea instance is not available.");
    }
  };

  return (
    <div>
      <img ref={imgRef} src={imgSrc} alt="Upload" style={{ maxWidth: '100%', height: 'auto' }} />
      <button onClick={handleSaveSvg} style={{ marginTop: '10px' }}>Save as SVG</button>
    </div>
  );
};

export default DrawCanvas;
