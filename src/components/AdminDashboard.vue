<template>
    <div class="container mt-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Panel de administración</h2>
            <button class="btn btn-outline-danger" @click="logout">
                <i class="bi bi-box-arrow-right me-1"></i> Cerrar sesión
            </button>
        </div>


        <div v-if="loading" class="text-center">Cargando...</div>
        <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

        <table v-else class="table table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Inmueble</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(offer, index) in offers" :key="offer.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ offer.fullName }}</td>
                    <td>{{ offer.email }}</td>
                    <td>{{ offer.Property?.address || '-' }}</td>
                    <td>
                        <span :class="{
                            'badge bg-secondary': offer.status === 'pendiente',
                            'badge bg-success': offer.status === 'aceptada',
                            'badge bg-danger': offer.status === 'rechazada'
                        }">
                            {{ offer.status }}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-outline-info btn-sm me-2" @click="viewDetails(offer.id)">
                            <i class="bi bi-eye"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="offerModal" tabindex="-1" aria-labelledby="offerModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content" v-if="selectedOffer">
                <div class="modal-header">
                    <h5 class="modal-title" id="offerModalLabel">Detalle de la oferta</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <p><strong>Nombre:</strong> {{ selectedOffer.fullName }}</p>
                    <p><strong>Email:</strong> {{ selectedOffer.email }}</p>
                    <p><strong>Teléfono:</strong> {{ selectedOffer.phone }}</p>
                    <p><strong>Valor ofrecido:</strong> ${{ selectedOffer.offerValue }}</p>
                    <p><strong>Estado:</strong> {{ selectedOffer.status }}</p>
                    <p><strong>Inmueble:</strong> {{ selectedOffer.Property?.address || 'Sin dirección' }}</p>

                    <div v-if="selectedOffer.OfferDocuments?.length">
                        <h5>Documentos</h5>
                        <ul>
                            <li v-for="doc in selectedOffer.OfferDocuments" :key="doc.id">
                                <a :href="doc.fileUrl" target="_blank">{{ doc.type }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success" @click="handleAction(selectedOffer.id, 'accept')"
                        :disabled="selectedOffer.status !== 'pendiente'">
                        Aceptar
                    </button>
                    <button class="btn btn-danger" @click="handleAction(selectedOffer.id, 'reject')"
                        :disabled="selectedOffer.status !== 'pendiente'">
                        Rechazar
                    </button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const logout = () => {
  localStorage.removeItem('token') 
  window.location.href = '/login'  
}


const offers = ref([])
const loading = ref(true)
const error = ref(null)
const selectedOffer = ref(null)

const BASE_URL = `${import.meta.env.PUBLIC_API_URL}/api/offer`

let modalInstance = null

onMounted(() => {
    const modalEl = document.getElementById('offerModal')
    if (modalEl) {
        modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl)
    }
    fetchOffers()
})

const fetchOffers = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
        window.location.href = '/login'
        return
    }

    try {
        const res = await fetch(`${BASE_URL}/admin/get_offers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-token': token
            }
        })

        const data = await res.json()
        if (!data.status) {
            throw new Error(data.message || 'Error al obtener ofertas')
        }

        offers.value = data.data
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

const viewDetails = async (offerId) => {
    const token = localStorage.getItem('token')
    try {
        const res = await fetch(`${BASE_URL}/admin/get_offer_by_id`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify({ offerId })
        })

        const data = await res.json()
        if (data.status) {
            selectedOffer.value = data.data
            if (modalInstance) {
                modalInstance.show()
            }
        } else {
            alert(data.message)
        }
    } catch (err) {
        alert('Error al cargar detalles')
    }
}

const handleAction = async (offerId, action) => {
    const token = localStorage.getItem('token')
    const endpoint = action === 'accept' ? 'accept_offer' : action === 'reject' ? 'reject_offer' : null

    if (!endpoint) return

    try {
        const res = await fetch(`${BASE_URL}/admin/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify({ offerId })
        })

        const data = await res.json()
        if (data.status) {
            fetchOffers()
            if (modalInstance) {
                modalInstance.hide()
            }
        } else {
            alert(data.message)
        }
    } catch (err) {
        alert('Error al procesar la acción')
    }
}
</script>
