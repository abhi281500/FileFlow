import React from 'react'
import FileCard from './FileCard'

  function FileList({ files, onDelete }) {
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "10px"
    }}>
      {files.map((file) => (
        <FileCard key={file._id} file={file} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default FileList