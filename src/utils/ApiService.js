import axios from "axios";

const defaultOptions = {
    // Change this URL to point to your API
    baseURL: `http://localhost:8000/`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
};

const apiClient = axios.create(defaultOptions);

// Set the AUTH token for any request
apiClient.interceptors.request.use(function (config) {
    const parseToken = localStorage.getItem("user", token);
    const token = JSON.parse(parseToken);
    config.headers.Authorization = token ? `Bearer ${token.token}` : "";
    return config;
});

export default {
    // USER AUTHENTICATION
    userLogin(credentials) {
        return apiClient.post("/auth/login", credentials);
    },
    registerValidate(credentials) {
        // If no need Admin validation
        return apiClient.put("/auth/registerValidate", credentials);
    },
    regConfirmation(credentials) {
        // Check email token for verification
        return apiClient.post("/auth/regConfirmation", credentials);
    },
    registerPending(credentials) {
        // If need admin validation (it send a mail saying activation is pending)
        return apiClient.put("/auth/registerPending", credentials);
    },
    forgotPassword(credentials) {
        return apiClient.post("/auth/reset", credentials);
    },
    resetPassword(credentials) {
        return apiClient.post("/auth/new-password", credentials);
    },
    // GENERAL SECURITY
    // Used in route guard
    checkToken(token) {
        return apiClient.post("/auth/checkToken", token);
    },
    // ADMIN
    adminUserList() {
        return apiClient.get("/admin/adminUserList");
    },
    updateUserStatus(user) {
        return apiClient.put("/admin/updateUserStatus", user);
    },
    deleteUser(userId) {
        return apiClient.post("/admin/deleteUser", userId);
    }
};