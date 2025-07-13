<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="card shadow p-4" style="max-width: 400px; width: 100%;">
      <h2 class="text-center mb-4">Iniciar sesión</h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label">Correo</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            placeholder="tu@correo.com"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            placeholder="••••••"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary w-100" :disabled="isLoading">
          <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          {{ isLoading ? 'Entrando...' : 'Entrar' }}
        </button>

        <div v-if="error" class="alert alert-danger mt-3 text-center">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const apiUrl = import.meta.env.PUBLIC_API_URL
const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  error.value = ''
  isLoading.value = true
  try {
    const res = await fetch(`https://inmobiliariabackend-cxa2eegkg0dpdjcs.centralus-01.azurewebsites.net`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })

    const data = await res.json()

    if (!data.status) {
      error.value = data.message || 'Error al iniciar sesión'
    } else {
      localStorage.setItem('token', data.token)
      window.location.href = '/admin'
    }
  } catch (err) {
    error.value = 'No se pudo conectar con el servidor'
  } finally {
    isLoading.value = false
  }
}
</script>
