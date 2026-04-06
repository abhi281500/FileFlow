import { api } from "./auth.service.js";

export const uploadFile = async (files) => {
    try {
        const formData = new FormData();
        const fileList = files instanceof FileList ? Array.from(files) : files;
        for (let i = 0; i < fileList.length; i++) {
            formData.append('files', fileList[i]);
        }
        const response = await api.post('/api/upload/files', formData)

        return response;

    } catch (error) {
        console.error("uploadFile error : ", error);
        throw error


    }
}

export const getFiles = async () => {
    try {
        const response = await api.get('/api/upload/files');
        return response;

    } catch (error) {
        console.error("getFiles error : ", error);
        throw error
    }
}

export const deleteFile = async (fileId) => {
    try {
        const response = await api.delete(`/api/upload/files/${fileId}`);
        return response;
    } catch (error) {
        console.error("deleteFile error : ", error);
        throw error

    }
}

export const updateFile = async (fileId, file) => {
    try {
        const formData = new FormData();
        for (let i = 0; i < file.length; i++) {
        formData.append('files', file[i]);
    }

        const response = await api.put(`/api/upload/files/${fileId}`, formData);
        return response;
    } catch (error) {
        console.error("updateFile error : ", error);
        throw error
    }
} 