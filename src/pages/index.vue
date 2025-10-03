<script setup>
import { onMounted, useTemplateRef, watch } from 'vue'
import useMap from '../composable/useMap'
import useFetch from '../composable/useFetch'

const {
  doFetch,
  result
} = useFetch()

const mapRef = useTemplateRef('mapRef')

const {
  addMarkerLayer
} = useMap(mapRef)

onMounted(async () => {
  await doFetch()
})

watch(result, cafes => {
  addMarkerLayer(cafes)
})


</script>

<template>
<section>
  <div ref="mapRef" class="min-h-svh"></div>
</section>
</template>
