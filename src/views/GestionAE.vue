<template>
  <div>
    <v-app>
      <v-app-bar app color="primary" dark>
        <v-btn icon @click="goBack" color="white">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>Gestión de AE</v-toolbar-title>
      </v-app-bar>
      <v-main>
        <v-container class="">
          <v-row>
            <!--AQUI SE INSTANCIAN LOS BOTONES DE LAS CLASES-->
            <v-col sm="2" v-for="item in cardItems" :key="item.title">
              <v-card>
                <v-card-actions class="">
                  <v-btn>{{ item.title }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <!--AQUI SE INSTANCIAN LOS VALORES DE LA BD CON RESPECTO AL BOTON SELECCIONADO-->
            <v-col cols="2">
              <v-sheet class="pa-2 ma-2">
                <v-card class="mx-auto pa-2" max-width="300">
                  <v-list v-model:opened="open">
                    <v-list-subheader>Atributos de Egreso</v-list-subheader>

                    <v-list-item title="AE1">
                      <v-list-item title="CD1">
                        <v-list-item>Indicador N</v-list-item>
                        <v-btn>+Indicador</v-btn>
                      </v-list-item>
                      <v-list-item title="CD2">
                        <v-btn>+Indicador</v-btn>
                      </v-list-item>
                      <v-list-item title="CD3">
                        <v-btn>+Indicador</v-btn>
                      </v-list-item>
                    </v-list-item>
                    <v-list-item title="AE2">
                      <v-list-item title="CD1"></v-list-item>
                      <v-list-item title="CD2"></v-list-item>
                      <v-list-item title="CD3"></v-list-item>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-sheet>
            </v-col>

            <v-col>
              <v-sheet class="pa-2 ma-2"> Seleccione a la izquierda </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import { onMounted, ref } from "vue";
import { getSelectedCourses } from "@/services/classroomApi";
const router = useRouter();
const courses = ref([]);
async function goBack() {
  window.history.length > 1 ? router.go(-1) : await router.push("/");
}

const cardItems = ref([
  {
    title: "Boton 1",

    to: "/evaluacion",
  },
  {
    title: "Boton 2",

    to: "/gestionAE",
  },
  {
    title: "Boton 3",

    to: "/gestionClases",
  },
]);

async function fetchCourses() {
  try {
    const response = await getSelectedCourses();
    console.log(response);
    courses.value = "1";
  } catch (error) {
    console.error("Error listing courses:", error);
  }
}

onMounted(async () => {
  ventanaConfirmar: false;
  await fetchCourses();
});
</script>
