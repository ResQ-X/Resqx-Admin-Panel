import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://internal-backend-rdhj.onrender.com",
  headers: {
    "Content-Type": "application/json",
    "x-resqx-key": "OGCALMDOWNLETMETHROUGH",
  },
})

export default axiosInstance

