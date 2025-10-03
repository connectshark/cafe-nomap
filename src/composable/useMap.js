import { onBeforeUnmount, onMounted, ref, toRaw } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import "leaflet.markercluster/dist/leaflet.markercluster";
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
export default (mapRef) => {
  const map = ref(undefined)
  const initMap = async () => {
    map.value = L.map(mapRef.value, {
      zoom: 16,
      center: [25.023293, 121.468481],
      renderer: L.canvas()
    })
    L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP/default/EPSG:3857/{z}/{y}/{x}', {
      maxZoom: 20,
      minZoom: 14,
      bounds:[
        [19.715015145512087, 117.49902343749999],
        [26.892679095908164, 123.969482421875]
      ],
      attribution: ''
    }).addTo(toRaw(map.value))
  }

  const addMarkerLayer = async (points) => {
    const cafesMarker = L.markerClusterGroup()
    points.forEach(p => {
      L.marker([p.latitude, p.longitude], {
        icon: L.icon({
          iconUrl: '/cafe.png',
          iconSize: [30, 30]
        })
      })
        .bindTooltip(p.name)
        .addTo(toRaw(cafesMarker))
    })
    toRaw(map.value).addLayer(cafesMarker)
  }

  onMounted(initMap)
  onBeforeUnmount(() => {
    map.value.remove()
  })

  return {
    map,
    addMarkerLayer
  }
}