// Giovani Bergamasco
// 12/8/2024
// IT 302 451
// Phase 5 CUD Node.js Data using React.js
// glb7@njit.edu
import axios from "axios";

// Backend route = /api/v1/GLB7/robohashes

class RobohashDataService {
    getAll(page = 0) {
        return axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/GLB7/robohashes?page=${page}`
        );
    }
    get(id) {
        return axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/GLB7/robohashes/id/${id}`
        );
    }
    find(query, by = "title", page = 0) {
        return axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/GLB7/robohashes?${by}=${query}&page=${page}`
        );
    }
    createComment(data) {
        return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/GLB7/robohashes/comment`, data);
    }
    updateComment(data) {
        return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/GLB7/robohashes/comment`, data);
    }
    deleteComment(id, userId) {
        return axios.delete(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/GLB7/robohashes/comment`,
            { data: { comment_id: id, user_id: userId } }
        );
    }
    getComments() {
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/GLB7/robohashes/comments`);
    }
}
const robohashDataService = new RobohashDataService();
export default robohashDataService;