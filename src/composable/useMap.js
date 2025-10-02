import { onBeforeUnmount, onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const map = ref(undefined)
const bounds = ref(null)

export default (mapRef) => {
  const initMap = async () => {
    map.value = L.map(mapRef.value, {
      zoom: 16,
      center: [25.023293, 121.468481],
      renderer: L.canvas()
    })
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 14,
      bounds:[
        [19.715015145512087, 117.49902343749999],
        [26.892679095908164, 123.969482421875]
      ],
      attribution: ''
    }).addTo(map.value)

    bounds.value = map.value.getBounds()

    map.value.on('moveend', () => {
      bounds.value = map.value.getBounds()
    })
    map.value.on('zoomend', () => {
      bounds.value = map.value.getBounds()
    })
  }

  onMounted(initMap)
  onBeforeUnmount(() => {
    map.value.remove()
  })

  return {
    map,
    bounds
  }
}