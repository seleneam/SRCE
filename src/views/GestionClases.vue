<template>
    <div>
      <v-app>
        <v-app-bar app color="primary" dark>
          <v-btn icon @click="goBack" color="white">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>Gestión de clases</v-toolbar-title>
        </v-app-bar>
        <v-main>
          <v-container>

          </v-container>
        </v-main>
      </v-app>
    </div>
  </template>

  <script setup>
  import axios from 'axios'
  import {useRouter} from 'vue-router'
  import {onMounted, ref} from 'vue'
  import { useAccessStore } from '@/store/access'

  const router = useRouter()
  const accessStore = useAccessStore()
  const courses = ref([])
  const loading = ref(true)

  async function goBack() {
    window.history.length > 1 ? router.go(-1) : await router.push('/')
  }
  async function listCourses(token) {
    const response = await axios.post('https://localhost:4001/courses', {
      token: token,
    })
    console.log(response)
  }
  onMounted(async () => {
    const token = accessStore.$state.access_token
    if (token) {
      const clases = await listCourses(token)
      console.log(clases)
    } else {
      await router.push({name: 'Dashboard'})
    }
  })
  </script>
