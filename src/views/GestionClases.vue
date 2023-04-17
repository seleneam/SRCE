<template>
    <div>
      <v-app>
        <v-app-bar app color="primary" dark>
          <v-btn icon @click="goBack">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>Gestión de clases</v-toolbar-title>
        </v-app-bar>
        <v-main>
          <v-container>
            <v-data-table
              :headers="headers"
              :items="clases"
              :loading="loading"
              hide-default-footer
            ></v-data-table>
          </v-container>
        </v-main>
      </v-app>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    name: 'App',
    data() {
      return {
        headers: [
          { text: 'Nombre', value: 'nombre' },
          { text: 'ID', value: 'id' },
          { text: 'Curso', value: 'curso' },
          { text: 'Propietario', value: 'propietario' },
          { text: 'Estado', value: 'estado' },
        ],
        clases: [],
        loading: true,
      }
    },
    methods: {
      goBack() {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
      },
    },
    async mounted() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://classroom.googleapis.com/v1/courses', {
          headers: { Authorization: 'Bearer ${token}' },
        })
        this.clases = response.data.courses.map((curso) => ({
          nombre: curso.name,
          id: curso.id,
          curso: curso.courseState,
          propietario: curso.ownerProfile.name.fullName,
          estado: curso.enrollmentCode ? 'Activo' : 'Inactivo',
        }))
        this.loading = false
      } catch (error) {
        console.error(error)
      }
    },
  }
  </script>
  