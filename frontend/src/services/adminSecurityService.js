import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const adminSecurityService = {
    getLockedIps: async () => {
        const response = await axios.get(`${API_URL}/admin/security/locked-ips`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    },

    unlockIp: async (ipAddress) => {
        await axios.delete(`${API_URL}/admin/security/locked-ips/${ipAddress}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    },

    getLockedAccounts: async () => {
        const response = await axios.get(`${API_URL}/admin/security/locked-accounts`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    },

    unlockAccount: async (userId) => {
        await axios.delete(`${API_URL}/admin/security/locked-accounts/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    }
};

export default adminSecurityService; 