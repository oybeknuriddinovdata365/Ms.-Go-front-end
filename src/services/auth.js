export async function adminLogin(data) {
  const res = await fetch(
    "http://164.92.104.205:3000/api/auth/admin/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || "Login xatolik")
  }

  return result
}

export async function refreshToken() {
  const refreshToken = localStorage.getItem("refreshToken")

  const res = await axios.post(
    "http://164.92.104.205:3000/api/auth/refresh-token",
    { refreshToken }
  )

  return res.data
}
