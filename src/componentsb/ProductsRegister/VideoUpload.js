import React, { useState } from 'react';

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoLink, setVideoLink] = useState('');

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      generateVideoLink(file);
    } else {
      alert('Please drop a valid video file.');
    }
  };

  const handleBrowse = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      generateVideoLink(file);
    } else {
      alert('Please select a valid video file.');
    }
  };

  const generateVideoLink = (file) => {
    // Convert the uploaded file into a temporary URL link
    const url = URL.createObjectURL(file);
    setVideoLink(url);
  };

  return (
    <div>
      <h2>Video Upload</h2>

      {/* Drag and Drop Area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          border: '2px dashed #ccc',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        {videoFile ? (
          <p>File: {videoFile.name}</p>
        ) : (
          <p>Drag and drop a video file here or click to browse</p>
        )}
      </div>

      {/* Browse Option */}
      <input type="file" accept="video/*" onChange={handleBrowse} />

      {/* Show Video Link */}
      {videoLink && (
        <div style={{ marginTop: '20px' }}>
          <h3>Video Link:</h3>
          <a href={videoLink} target="_blank" rel="noopener noreferrer">
            {videoLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
