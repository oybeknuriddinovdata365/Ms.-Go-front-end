import api from "./api";

/**
 * Admin ID'sini localStorage'dan olish
 * @returns {string|null}
 */
const getAdminId = () => {
  // Avval to'g'ridan-to'g'ri adminId ni tekshiramiz
  const adminId = localStorage.getItem("adminId");
  if (adminId) return adminId;
  
  // Keyin admin objectdan olishga harakat qilamiz
  const adminStr = localStorage.getItem("admin");
  if (adminStr) {
    try {
      const admin = JSON.parse(adminStr);
      if (admin && admin.id) {
        // Topilgan ID'ni saqlash
        localStorage.setItem("adminId", admin.id.toString());
        return admin.id;
      }
    } catch (e) {
      console.error("Admin parse error:", e);
    }
  }
  
  return null;
};

/**
 * Adminning profil ma'lumotlarini olish
 * @returns {Promise<Object>}
 */
export const getProfile = () => {
  const adminId = getAdminId();
  
  if (!adminId) {
    return Promise.reject(new Error("Admin ID topilmadi. Iltimos, qaytadan login qiling."));
  }
  
  return api.get(`/admin/${adminId}`);
};

/**
 * Profil ma'lumotlarini yangilash
 * @param {number|string} id - Admin ID
 * @param {Object} data - Yangilanishi kerak bo'lgan ma'lumotlar
 * @returns {Promise<Object>}
 */
export const updateProfile = (id, data) => {
  return api.put(`/admin/${id}`, data);
};

/**
 * Parolni o'zgartirish
 * @param {Object} data - { currentPassword, newPassword, confirmPassword }
 * @returns {Promise<Object>}
 */
export const changePassword = (data) => {
  const adminId = getAdminId();
  
  if (!adminId) {
    return Promise.reject(new Error("Admin ID topilmadi. Iltimos, qaytadan login qiling."));
  }
  
  return api.patch(`/admin/${adminId}/change-password`, data);
};