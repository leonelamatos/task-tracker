import axios from "axios";

export async function fetchTaskById(id) {
    const data = await axios.get(`http://localhost:3000/tasks/${id}`)
    
    return data
}