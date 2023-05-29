<template>
  <div>
    <v-app>
      <v-main>
       <side-bar/>
        <v-container>
          <div class="text-center">
            <h1 class="title text-uppercase text-start pb-4">
              Gestion de Clases
            </h1>
            <p class="text-body-1 text-medium-emphasis text-justify">
              En esta sección podrá gestionar las clases que se encuentran en su cuenta de Google Classroom.
            </p>
            <v-spacer class="mx-auto my-5"></v-spacer>
          </div>


          <v-sheet
            max-height="980"
            class="d-flex flex-wrap justify-center justify-lg-center justify-md-center overflow-auto w-auto h-auto" color="white">
            <template v-for="course in courses" :key="course.id">
              <v-card
                color="#181c25"
                rounded="lg"
                class="d-flex flex-column my-6 pa-2 mx-4"
                variant="outlined"
                min-width="400"
                max-width="400"
                min-height="150"
              >

                <v-card-item
                  style="font-weight: bold;"
                  :title="course.name"
                />
                <v-card-text>
                  <div class="text-body-2 text-medium-emphasis text-justify">
                    {{ course.descriptionHeading }}
                  </div>
                </v-card-text>
<!--                Align content to bottom of the card -->
                <v-card-actions class="align-end">
                  <v-btn
                    class="px-3 mt-5"
                    variant="flat"
                    color="#181c25"
                    content="bottom"
                    @click="agregarCursoBD(course.id, course.name, course.enrollmentCode)"
                  >
                    <v-icon color="white mx-1">mdi-plus</v-icon>
                    <span class="ml-2 text-white me-1" >Agregar</span>
                  </v-btn>
                  <v-spacer class="mx-0"/>
                  <v-btn
                    class="px-3 mt-5"
                    variant="tonal"
                    color="#181c25"
                    content="bottom"
                    @click="agregarCursoBD(course.id, course.name, course.enrollmentCode)"
                  >
                    <v-icon>mdi-google-drive</v-icon>
                    <span class="ml-2 me-1" >Drive</span>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-sheet>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {useAccessStore} from "@/store/access";
import {listCourses, getCourseWork, saveClass} from "@/services/classroomApi";
import SideBar from "@/layouts/default/SideBar.vue";
import AppBar from "@/layouts/default/AppBar.vue";


const router = useRouter();
const accessStore = useAccessStore();
const courses = ref([]);
const loading = ref(true);
const ventanaConfirmar = ref(false);

async function goBack() {
  window.history.length > 1 ? router.go(-1) : await router.push("/");
}

/*Agregar el curso al docente*/

async function agregarCursoBD(id_Asignatura, nombreAsignatura, claveAsignatura) {
  try {
    const response = await saveClass(
      id_Asignatura,
      nombreAsignatura,
      claveAsignatura
    );
    alert(response.message);
  } catch (error) {
    console.log(error);
  }
}

/*DESPLIEGUE DE CURSO*/
async function fetchCourses() {
  try {
    const response = await listCourses();
    courses.value = response;
  } catch (error) {
    console.error("Error listing courses:", error);
  }
}

/*DESPLIEGUE DE TAREAS*/
async function showCourseWork(courseId) {
  const courseWork = await getCourseWork(courseId);
}

onMounted(async () => {
  ventanaConfirmar.value = false;
  await fetchCourses();
});
</script>
