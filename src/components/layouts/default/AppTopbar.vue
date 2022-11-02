<template>
  <div class="layout-topbar">
    <NuxtLink to="/" class="layout-topbar-logo">
      <img alt="Logo" :src="topbarImage()">
      <span>Plannerie</span>
    </NuxtLink>
    <button 
      class="p-link layout-menu-button layout-topbar-button hide-on-desktop" 
      @click="onMenuToggle">
      <i class="pi pi-bars" />
    </button>

    <button
      v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein',
                      leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}"
      class="p-link layout-topbar-menu-button layout-topbar-button"
    >
      <i class="pi pi-ellipsis-v" />
    </button>
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-calendar" />
          <span>Events</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-cog" />
          <span>Settings</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-user" />
          <span>Profile</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  emits: ['topbar-menu-toggle', 'menu-toggle'],
  computed: {
    darkTheme () {
      return this.$appState.darkTheme
    },
  },
  methods: {
    onMenuToggle (event) {
      this.$emit('menu-toggle', event)
    },
    onTopbarMenuToggle (event) {
      this.$emit('topbar-menu-toggle', event)
    },
    topbarImage () {
     //TODO dark logo
      return this.$appState.darkTheme ? '/images/logo.svg' : '/images/logo.svg'
    },
  }
}
</script>
