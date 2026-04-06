import React, { useState } from 'react';
import { uploadFile } from '../services/file.service';
import { useNavigate } from 'react-router-dom';

function Upload() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false); // UX: Loading state
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) return alert("Please select a file first");

    setLoading(true);
    try {
      await uploadFile(files);
      navigate('/dashboard');
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Files</h2>
      <p>Select images, documents, or any files to store safely.</p>

      <form onSubmit={handleUpload}>
        <div className="file-input-wrapper">
          <input 
            type="file" 
            multiple 
            onChange={(e) => setFiles(Array.from(e.target.files))} 
          />
          <div className="file-drop-area">
            {files.length > 0 ? (
              <div>
                <p>Files Selected:</p>
                <span className="file-count-badge">{files.length} files</span>
              </div>
            ) : (
              <p>Click or Drag files here to upload</p>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          className="btn-submit-upload"
          disabled={loading || files.length === 0}
        >
          {loading ? "Uploading..." : "Start Upload"}
        </button>
        
        <button 
          type="button" 
          onClick={() => navigate('/dashboard')}
          style={{ background: 'none', border: 'none', color: 'var(--text)', marginTop: '15px', cursor: 'pointer' }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Upload;