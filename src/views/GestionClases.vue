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
            <v-card
              color="secondary"
              rounded="lg"
              class="mx-auto my-5"
              variant="elevated"
              v-for="course in courses">
              <v-card-item
                :title="course.name"
                :subtitle="course.descriptionHeading"
              />
            </v-card>
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

  import  {listCourses} from '../services/classroomApi'
  const router = useRouter()
  const accessStore = useAccessStore()
  const courses = ref([])
  const loading = ref(true)

  async function goBack() {
    window.history.length > 1 ? router.go(-1) : await router.push('/')
  }
  async function fetchCourses() {
    try {
        const coursesData = await  listCourses(accessStore.$state.access_token);
        courses.value = coursesData;
    } catch (error) {
        console.error('Error listing courses:', error);
    }
}

  onMounted(async () => {
    await fetchCourses()
  })
  </script>
