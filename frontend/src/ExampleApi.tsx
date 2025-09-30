import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000"
})

export async function getPets() {
    const response = await api.get(`/pets`)
    if (response.status === 200){
        return response.data
    } else {
        return
    }
}

export async function getPet(id: any) {
    const response = await api.get(`/pets/${id}`)
    if (response.status === 200){
        return response.data
    } else {
        return
    }
}

export async function createPet(pet: any) {
    const response = await api.post(`/pets`, pet)
    return response
}

export async function updatePet(id: any, pet: any) {
    const response = await api.put(`/pets/${id}`, pet)
    return response
}

export async function deletePet(id : any) {
    const response = await api.delete(`/pets/${id}`)
    return response
}