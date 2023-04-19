<template>
  <v-app-bar
    color="primary">
    <v-app-bar-title> {{ title }} </v-app-bar-title>
    <template v-slot:append>
      <v-btn icon="mdi-dots-vertical" color="white"></v-btn>
      <v-btn icon="mdi-logout" color="white" @click="logOut"></v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      default: 'Dashboard'
    },
    logOut: {
      type: Function,
      default: () => {}
    }
  })
</script>
