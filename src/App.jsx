import React, { useState } from 'react';
import DrawCanvas from './components/DrawCanvas';

const App = () => {
  const [imgSrc, setImgSrc] = useState('');

  const handleImgUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImgUpload} style={{ marginBottom: '10px' }} />
      {imgSrc && <DrawCanvas imgSrc={imgSrc} />}
    </div>
  );
};

export default App;
