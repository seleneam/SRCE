<template>
  <div>
    <v-app>
      <v-main>
        <side-bar />
        <div style="padding: 2rem; margin-left: 50px">
          <h1 class="title text-uppercase text-start pb-4">
            Gestión de Atributos de Egreso
          </h1>
          <p class="text-medium-emphasis text-justify">
            En esta sección podrá gestionar las clases que se encuentran en su
            cuenta de Google Classroom.
          </p>
        </div>
        <v-container
          max-height="980"
          style="
            scroll-margin-block: 2rem;
            scroll-behavior: smooth;
            margin-left: 25px;
          "
          class="d-flex flex-column justify-space-around"
          color="white"
        >
          <v-row class="py-2 px-12">
            <v-btn
              v-for="boton in botones"
              :key="boton.clave"
              color="#181c25"
              class="my-2 mx-2"
              variant="flat"
              @click="cargarArbol(boton.ae, boton.clave)"
            >
              <span class="text-uppercase text-white">{{ boton.title }}</span>
            </v-btn>
          </v-row>
          <v-spacer class="my-4 mx-auto"></v-spacer>
          <v-card
            class="d-flex flex-column justify-space-around mx-md-10"
            style="padding: 2rem"
            color="grey-darken-3"
            variant="tonal"
          >
            <!--AQUI SE INSTANCIAN LOS VALORES DE LA BD CON RESPECTO AL BOTON SELECCIONADO-->
            <v-row class="mx-2">
              <v-col max-width="100px" min-width="100px">
                <v-sheet
                  color="transparent"
                  max-width="100px"
                  min-width="100px"
                >
                  <v-list
                    v-model:opened="open"
                    bg-color="white"
                    max-width="200px"
                    min-width="200px"
                  >
                    <v-list-subheader class="text-uppercase"
                      >Atributos de Egreso</v-list-subheader
                    >
                    <v-list-item v-for="rama in ramas">
                      <v-btn
                        @click="cargarDerecha(rama.aeDescripcion)"
                        variant="plain"
                        color="#181c25"
                      >
                        #{{ rama.idAE }}
                      </v-btn>
                      <template v-for="hoja in rama.cd">
                        <v-list-item class="my-2">
                          <v-btn
                            @click="cargarDerecha(hoja[1])"
                            variant="flat"
                            color="#181c25"
                            class="my-2"
                          >
                            <span class="text-uppercase text-white"
                              >CD {{ hoja[0] }}</span
                            >
                          </v-btn>
                          <v-list-item>
                            <v-btn
                              @click="cargarIndicador(rama.idAE, hoja[0])"
                              variant="tonal"
                              color="#181c25"
                              class="my-0"
                            >
                              Indicador
                            </v-btn>
                          </v-list-item>
                        </v-list-item>
                      </template>
                    </v-list-item>
                  </v-list>
                </v-sheet>
              </v-col>
              <v-divider
                vertical="true"
                class="mx-4"
                style="flex-wrap: wrap; position: relative"
              ></v-divider>
              <v-col>
                <v-sheet
                  color="transparent"
                  class="flex-column align-content-center text-justify text-medium-emphasis my-2"
                >
                  <template v-if="mostrarFormulario">
                    <v-form>
                      <v-text-field
                        v-model="texto"
                        label="Ingresa descripción de indicador."
                        color=""
                        required
                      ></v-text-field>
                      <v-select
                        v-model="opcionSeleccionada"
                        :items="opciones"
                        label="Selecciona la tarea a vincular."
                        required
                      ></v-select>

                      <!-- Otros campos del formulario si es necesario -->
                      <v-btn
                        @click="enviarFormulario()"
                        color="grey-darken-4"
                        variant="flat"
                        >Enviar</v-btn
                      >
                    </v-form>
                  </template>
                  <template v-else> {{ contenidoDerecha }}</template>
                </v-sheet>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import { onMounted, ref } from "vue";
import {
  getSelectedCourses,
  getTree,
  getCourseWork,
  getTareasCurso,
} from "@/services/classroomApi";
import AppBar from "@/layouts/default/AppBar.vue";
import SideBar from "@/layouts/default/SideBar.vue";
import { useAccessStore } from "@/store/access";
import { saveIndicator } from "@/services/classroomApi";

const router = useRouter();
const courses = [];

async function goBack() {
  window.history.length > 1 ? router.go(-1) : await router.push("/");
}

const accessStore = useAccessStore();
const user = ref(accessStore.user);
const alert = ref(true);
const botones = ref([]);
const ramas = ref([]);
const datosIndicador = ref([]);
const contenidoDerecha = ref(
  "Seleccione una clase y posterior a ello un elemento de la izquierda."
);

const mostrarFormulario = ref(false);
const texto = ref("");
const opcionSeleccionada = ref(null);
const opciones = ref([]);

async function showCourseWork(courseId) {
  if (opciones.value.length > 0) {
    var i = 0;
    for (i = opciones.value.length; i < opciones.value.length; i++)
      opciones.value.pop();
  } else {
    const courseWork = await getCourseWork(courseId);

    courseWork.forEach((item) => {
      const tarea = {
        idTarea: item.id,
        title: item.title,
      };

      opciones.value.push(tarea);
    });
  }
}

async function fetchCourses() {
  try {
    const response = await getSelectedCourses();

    response.forEach((item) => {
      const course = {
        _id: item._id,
        nombre: item.nombre,
        clave: item.clave,
        ae: item.ae,
      };
      courses.push(course);
    });

    courses.forEach((course) => {
      botones.value.push({
        title: course.nombre,
        ae: course.ae,
        clave: course.clave,
      });
    });
  } catch (error) {
    console.error("Error listing courses:", error);
  }
}

async function cargarIndicador(idAE, idCD) {
  datosIndicador.value[1] = idAE;
  datosIndicador.value[2] = idCD;

  const response = await getTareasCurso();
  mostrarFormulario.value = true;

  await showCourseWork(response);
}

async function guardarIndicadorBD(objDatos) {
  try {
    const response = await saveIndicator(objDatos);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

function enviarFormulario() {
  if (texto.value == "" || opcionSeleccionada.value == null);
  else {
    datosIndicador.value[3] = texto.value;
    datosIndicador.value[4] = opcionSeleccionada.value;
    datosIndicador.value[5] = opciones.value.find(
      (opcion) => opcion.title === opcionSeleccionada.value
    )?.idTarea;

    datosIndicador.value[6] = codigficarID(
      user.value.name,
      datosIndicador.value[0],
      datosIndicador.value[1],
      datosIndicador.value[2]
    );

    guardarIndicadorBD(datosIndicador);
  }
}

function codigficarID(valor, clave, ae, cd) {
  var primerosDos = valor.substr(0, 3);
  var ultimosDos = valor.substr(-3);

  var hexCombinados =
    primerosDos.charCodeAt(0).toString(16) +
    primerosDos.charCodeAt(1).toString(16) +
    primerosDos.charCodeAt(2).toString(16) +
    ultimosDos.charCodeAt(0).toString(16) +
    ultimosDos.charCodeAt(1).toString(16) +
    ultimosDos.charCodeAt(2).toString(16);

  return hexCombinados + "-" + clave + "-" + ae + cd;
}
function cargarDerecha(aeDescripcion) {
  try {
    mostrarFormulario.value = false;

    contenidoDerecha.value = "" + aeDescripcion;
  } catch (error) {
    console.log(error);
  }
}

async function cargarArbol(ae, clave) {
  try {
    datosIndicador.value = [];
    datosIndicador.value[0] = clave;
    if (ramas.value.length > 0) {
      var i = 0;
      for (i = ramas.value.length; i < ramas.value.length; i++)
        ramas.value.pop();
    } else {
      const response = await getTree(ae);
      response.data.forEach((item) => {
        ramas.value.push({
          idAE: item.idAE,
          aeDescripcion: item.aeDescripcion,
          cantCD: item.cd.length,
          cd: item.cd,
          idIndicadores: item.idIndicadores,
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  await fetchCourses();
});
</script>
