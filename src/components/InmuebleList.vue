<template>
    <div>
        <div v-if="loading" class="text-center">Cargando inmuebles...</div>
        <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

        <div v-else>
            <div id="carouselInmuebles" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item" :class="{ active: index === 0 }" v-for="(chunk, index) in propertyChunks"
                        :key="index">
                        <div class="row justify-content-center">
                            <div class="col-md-4 mb-3" v-for="property in chunk" :key="property.id">
                                <div class="card h-100 shadow">
                                    <img v-if="property.image_url" :src="property.image_url" class="card-img-top"
                                        style="height: 200px; object-fit: cover;" alt="Imagen del inmueble" />
                                    <div class="card-body d-flex flex-column">
                                        <h5 class="card-title">{{ property.address }}</h5>
                                        <p class="card-text mb-1"><strong>Área:</strong> {{ property.area }} m²</p>
                                        <p class="card-text mb-1"><strong>Habitaciones:</strong> {{ property.rooms }}
                                        </p>
                                        <p class="card-text mb-1"><strong>Baños:</strong> {{ property.bathrooms }}</p>
                                        <p class="card-text mb-1"><strong>Precio:</strong> ${{ property.price }}</p>
                                        <button class="btn btn-primary mt-3 w-100" @click="openModal(property)">
                                            Ver detalle
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button class="carousel-control-prev" type="button" data-bs-target="#carouselInmuebles"
                    data-bs-slide="prev">
                    <i class="bi bi-chevron-left fs-2 text-dark bg-white p-2 rounded-circle"></i>
                    <span class="visually-hidden">Anterior</span>
                </button>

                <button class="carousel-control-next" type="button" data-bs-target="#carouselInmuebles"
                    data-bs-slide="next">
                    <i class="bi bi-chevron-right fs-2 text-dark bg-white p-2 rounded-circle"></i>
                    <span class="visually-hidden">Siguiente</span>
                </button>

            </div>
        </div>

        <!-- Modal de detalle -->
        <div class="modal fade" id="propertyModal" tabindex="-1" aria-labelledby="propertyModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content" v-if="selected">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ selected.address }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <img v-if="selected.image_url" :src="selected.image_url" class="img-fluid mb-3"
                            style="max-height: 300px; object-fit: cover;" />
                        <p><strong>Área:</strong> {{ selected.area }} m²</p>
                        <p><strong>Habitaciones:</strong> {{ selected.rooms }}</p>
                        <p><strong>Baños:</strong> {{ selected.bathrooms }}</p>
                        <p><strong>Parqueaderos:</strong> {{ selected.parkingSpaces }}</p>
                        <p><strong>Precio:</strong> ${{ selected.price }}</p>
                        <p><strong>Tipo de oferta:</strong> {{ selected.offer_type }}</p>
                    </div>
                    <div class="modal-footer">
                        <a :href="`/offer/${selected.id}`" class="btn btn-success">Aplicar oferta</a>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const apiUrl = import.meta.env.PUBLIC_API_URL;
const properties = ref([])
const propertyChunks = ref([])
const loading = ref(true)
const error = ref(null)
const selected = ref(null)
let modalInstance = null

const chunkArray = (array, size) => {
    const result = []
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size))
    }
    return result
}

const fetchProperties = async () => {
    try {
        const res = await fetch(`${apiUrl}/api/properties/get_properties`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'all' })
        })
        const data = await res.json()
        if (!data.status) throw new Error(data.message || 'Error al cargar inmuebles')

        properties.value = data.data
        propertyChunks.value = chunkArray(data.data, 2) // ✅ agrupamos en slides de 3 cards
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

const openModal = (property) => {
    selected.value = property
    const modalEl = document.getElementById('propertyModal')
    modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl)
    modalInstance.show()
}

onMounted(fetchProperties)
</script>
