<template>
<div>
<div class="calendar">
<vue-cal  />
</div>
</div>
</template>

<script setup>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

</script>

<style lang="scss" scoped>
.calendar {
height: 80vh;
background-color: white;
}
</style>