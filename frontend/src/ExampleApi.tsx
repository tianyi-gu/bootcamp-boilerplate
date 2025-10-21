import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000"
})

// Pet API
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

// Event API
export async function getEvents() {
    const response = await api.get(`/events`)
    if (response.status === 200){
        return response.data
    } else {
        return []
    }
}

export async function getEvent(id: any) {
    const response = await api.get(`/events/${id}`)
    if (response.status === 200){
        return response.data
    } else {
        return
    }
}

export async function createEvent(event: any) {
    const response = await api.post(`/events`, event)
    return response
}

export async function updateEvent(id: any, event: any) {
    const response = await api.put(`/events/${id}`, event)
    return response
}

export async function deleteEvent(id : any) {
    const response = await api.delete(`/events/${id}`)
    return response
}

// Product API
export async function getProducts() {
    const response = await api.get(`/products`)
    if (response.status === 200){
        return response.data
    } else {
        return []
    }
}

export async function getProduct(id: any) {
    const response = await api.get(`/products/${id}`)
    if (response.status === 200){
        return response.data
    } else {
        return
    }
}

export async function createProduct(product: any) {
    const response = await api.post(`/products`, product)
    return response
}

export async function updateProduct(id: any, product: any) {
    const response = await api.put(`/products/${id}`, product)
    return response
}

export async function deleteProduct(id : any) {
    const response = await api.delete(`/products/${id}`)
    return response
}