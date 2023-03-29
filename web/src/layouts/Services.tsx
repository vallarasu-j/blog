import axios from "../service/AxiosClient";

export const getCurrentUser = async () => {
    const response = await axios.get(`/currentUser`);
    return response;
}