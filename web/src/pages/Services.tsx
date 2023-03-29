import axios from "../service/AxiosClient"


export const getPosts = async () => {
    const response = await axios.get(`/posts`);
    return response?.data;
}
