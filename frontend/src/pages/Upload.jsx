import React, { useState } from 'react';
import { uploadFile } from '../services/file.service';

function Upload() {
  const [files, setFiles] = useState([]);

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      await uploadFile(files);
      alert("Upload success");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input 
          type="file" 
          multiple 
          onChange={(e) => setFiles(e.target.files)} 
        />
        <button type="submit"
        >Upload</button>
      </form>
    </div>
  );
}

export default Upload;