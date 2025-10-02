<script setup>
import { useTemplateRef } from 'vue'
import useMap from '../composable/useMap'

const mapRef = useTemplateRef('mapRef')
useMap(mapRef)
</script>

<template>
<section>
  <div ref="mapRef" class="aspect-square"></div>
</section>
</template>
