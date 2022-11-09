<template>
    <div class="card">
        <div class="calendar">
            <vue-cal class="vuecal--rounded-theme vuecal--green-theme" />
        </div>
    </div>
</template>

<script setup>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

definePageMeta({
    middleware: 'auth'
})

</script>

<style lang="scss" scoped>
.calendar {
    height: 80vh;
    background-color: white;
}
</style>