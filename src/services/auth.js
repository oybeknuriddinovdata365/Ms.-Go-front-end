import api from "./api";

const API_BASE_URL = "http://164.92.104.205:3000/api";

/**
 * Admin login funksiyasi
 * @param {Object} data - { email, password }
 * @returns {Promise<Object>} - { accessToken, refreshToken, admin }
 */
export async function adminLogin(data) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Login xatolik");
    }

    // Admin ID'sini localStorage'ga saqlash
    if (result.admin && result.admin.id) {
      localStorage.setItem("adminId", result.admin.id.toString());
    }

    return result;
  } catch (error) {
    console.error("Login xatolik:", error);
    throw error;
  }
}

/**
 * Refresh token funksiyasi
 * @returns {Promise<Object>} - { accessToken, refreshToken }
 */
export async function refreshToken() {
  try {
    const refreshTokenValue = localStorage.getItem("refreshToken");

    if (!refreshTokenValue) {
      throw new Error("Refresh token topilmadi");
    }

    const response = await api.post("/auth/refresh-token", {
      refreshToken: refreshTokenValue,
    });

    // Yangi tokenlarni saqlash
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
    }
    if (response.data.refreshToken) {
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }

    return response.data;
  } catch (error) {
    console.error("Refresh token xatolik:", error);
    
    // Token yangilanmasa, logout qilish
    logout();
    throw error;
  }
}

/**
 * Logout funksiyasi
 */
export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("admin");
  localStorage.removeItem("adminId");
  
  // Login sahifasiga yo'naltirish
  window.location.href = "/login";
}

/**
 * Hozirgi adminni olish
 * @returns {Object|null} - Admin object yoki null
 */
export function getCurrentAdmin() {
  try {
    const adminStr = localStorage.getItem("admin");
    if (adminStr) {
      return JSON.parse(adminStr);
    }
  } catch (error) {
    console.error("Admin parse error:", error);
  }
  return null;
}

/**
 * Autentifikatsiya holatini tekshirish
 * @returns {boolean} - True agar login qilingan bo'lsa
 */
export function isAuthenticated() {
  const accessToken = localStorage.getItem("accessToken");
  return !!accessToken;
}