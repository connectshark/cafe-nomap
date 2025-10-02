import { ref } from 'vue'

const API_URI = import.meta.env.VITE_API_DOMAIN + '/'

export default (city = '') => {
  const loading = ref(false)
  const result = ref(null)
  const doFetch = async () => {
    loading.value = true
    const response = await fetch(API_URI + city)
    const data = await response.json()
    result.value = data
    loading.value = false
  }
  return {
    loading,
    doFetch,
    result
  }
}