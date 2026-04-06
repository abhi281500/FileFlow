import React from 'react'

function FileCard({ file, onDelete }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "10px",
      margin: "10px",
      borderRadius: "10px",
      width: "200px"
    }}>
      
      
      <img 
        src={file.fileUrl} 
        alt={file.fileName}
        style={{ width: "100%", height: "120px", objectFit: "cover" }}
      />

      <p>{file.fileName}</p>

      <button onClick={() => onDelete(file._id)}>
        Delete
      </button>

    </div>
  );
}

export default FileCard