<template>
  <div v-if="loading" class="text-center">Cargando inmueble...</div>
  <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
  <div v-else>
    <h2 class="mb-4">Aplicar oferta para: {{ property.address }}</h2>

    <div class="mb-4">
      <img
        :src="property.image_url"
        class="img-fluid rounded shadow-sm"
        alt="Imagen del inmueble"
        style="max-height: 300px; object-fit: cover;"
      />
      <p class="mt-2"><strong>Área:</strong> {{ property.area }} m²</p>
      <p><strong>Precio:</strong> ${{ property.price }}</p>
    </div>

    <form @submit.prevent="submitOffer" enctype="multipart/form-data">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Número de documento</label>
          <input v-model="form.documentId" type="text" class="form-control" required />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Nombre completo</label>
          <input v-model="form.fullName" type="text" class="form-control" required />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Dirección</label>
          <input v-model="form.address" type="text" class="form-control" required />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Teléfono</label>
          <input v-model="form.phone" type="text" class="form-control" required />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Correo electrónico</label>
          <input v-model="form.email" type="email" class="form-control" required />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Valor ofertado</label>
          <input v-model="form.offerValue" type="number" class="form-control" required />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">PDF de identificación</label>
          <input ref="identificacionRef" type="file" accept="application/pdf" class="form-control" required />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Certificado de ingresos</label>
          <input ref="certificadoRef" type="file" accept="application/pdf" class="form-control" required />
        </div>
      </div>

      <!-- Botón con spinner -->
      <button type="submit" class="btn btn-success" :disabled="isSubmitting">
        <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        {{ isSubmitting ? 'Enviando...' : 'Enviar oferta' }}
      </button>

      <!-- Mensajes -->
      <div v-if="success" class="alert alert-success mt-3">{{ success }}</div>
      <div v-if="submitError" class="alert alert-danger mt-3">{{ submitError }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const apiUrl = 'https://inmobiliariabackend-cxa2eegkg0dpdjcs.centralus-01.azurewebsites.net'
const propertyId = ref('')
const property = ref(null)
const loading = ref(true)
const error = ref(null)
const success = ref('')
const submitError = ref('')
const isSubmitting = ref(false)

const identificacionRef = ref(null)
const certificadoRef = ref(null)

const form = ref({
  documentId: '',
  fullName: '',
  address: '',
  phone: '',
  email: '',
  offerValue: ''
})

const fetchProperty = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/properties/get_properties_by_id`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ property_id: propertyId.value })
    })
    const data = await res.json()
    if (!data.status) throw new Error(data.message)
    property.value = data.data
  } catch (err) {
    error.value = 'No se pudo cargar el inmueble.'
  } finally {
    loading.value = false
  }
}

const submitOffer = async () => {
  success.value = ''
  submitError.value = ''
  isSubmitting.value = true

  const fd = new FormData()
  fd.append('propertyId', propertyId.value)
  fd.append('documentId', form.value.documentId)
  fd.append('fullName', form.value.fullName)
  fd.append('address', form.value.address)
  fd.append('phone', form.value.phone)
  fd.append('email', form.value.email)
  fd.append('offerValue', form.value.offerValue)
  fd.append('identificacion', identificacionRef.value.files[0])
  fd.append('certificado_ingresos', certificadoRef.value.files[0])

  try {
    const res = await fetch(`${apiUrl}/api/offer/create_offer`, {
      method: 'POST',
      body: fd
    })

    const data = await res.json()
    if (data.status) {
      success.value = 'Oferta enviada exitosamente.'
    } else {
      throw new Error(data.message)
    }
  } catch (err) {
    submitError.value = err.message || 'Error al enviar la oferta.'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  const url = window.location.pathname // /offer/3
  const parts = url.split('/')
  propertyId.value = parts[parts.length - 1]

  if (propertyId.value) {
    fetchProperty()
  } else {
    error.value = 'No se recibió el ID del inmueble.'
    loading.value = false
  }
})
</script>
