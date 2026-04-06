import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileList from '../components/FileList';
import { getFiles, deleteFile } from '../services/file.service';

function Dashboard() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await getFiles();
        setFiles(res.data.files);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFiles();
  }, []);

  const handleDelete = async (fileId) => {
    // Thoda UX alert
    if (window.confirm("Are you sure you want to delete this file?")) {
      try {
        await deleteFile(fileId);
        setFiles(files.filter(file => file._id !== fileId));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>My Dashboard</h2>
        <button className="btn-upload" onClick={() => navigate('/upload')}>
          <span>+</span> Upload New File
        </button>
      </div>

      {files.length > 0 ? (
        <FileList files={files} onDelete={handleDelete} />
      ) : (
        <div className="empty-state">
          <p>No files found. Start by uploading something!</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;