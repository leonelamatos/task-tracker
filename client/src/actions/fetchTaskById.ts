import axios from "axios";

export async function fetchTaskById(id) {
    const data = await axios.get(`/api/tasks/${id}`)
    
    return data
}