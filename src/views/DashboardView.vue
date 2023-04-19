<template>

  <AppBar title="Dashboard"/>
  <v-app>
    <v-main>
      <v-container>
        <v-responsive
          class="auth-wrapper d-flex align-center justify-center pa-4 bg-accent fill-height"
        >
          <v-row>
            <v-col sm="4"
                   v-for="item in cardItems"
                   :key="item.title"
            >
              <v-card
                class="mx-auto bg-white rounded-lg"
                max-width="334"
                max-height="365"
                color="accent2"
                variant="elevated"
              >
                <v-img
                  :src="item.cover"
                  height="194"
                ></v-img>

                <v-card-text>
                  <div class="text-h6 font-weight-semibold mb-1 text-left py-2">
                    {{ item.title.toLocaleUpperCase() }}
                  </div>
                  <div class="text-body-4 text-medium-emphasis text-justify">
                    {{ item.text }}
                  </div>
                </v-card-text>
                <v-card-actions
                  class="d-flex align-content-end px-4 pb-4"
                >
                  <v-btn
                    variant="tonal"
                    color="primary"
                    @click="goTo(item.to)"
                  >
                    Ir al modulo
                  </v-btn>
                </v-card-actions>
              </v-card>

            </v-col>
          </v-row>
        </v-responsive>

      </v-container>
    </v-main>
  </v-app>

</template>
<script setup>
import {useRouter} from 'vue-router'
import {ref} from 'vue'
import AppBar from "@/layouts/default/AppBar.vue";

const router = useRouter()

const cardItems = ref([
  {
    title: "Evaluación de AE",
    text: "Aqui podras evaluar los atributos de egreso.",
    to: "/evaluacion",
    cover: "https://cdn.bizneo.com/blog/wp-content/uploads/2020/05/formato-de-evaluacion-del-desempen%CC%83o.webp"
  },
  {
    title: "Gestión de AE",
    text: "Aqui podras vincular los AE con los que estaras trabajando con respecto a tus clases.",
    to: "/gestionAE",
    cover: "https://cdn.bizneo.com/blog/wp-content/uploads/2020/05/formato-de-evaluacion-del-desempen%CC%83o.webp"
  },
  {
    title: "Gestión de clases",
    text: "Aquí podras vincular las clases de classroom con el sistema.",
    to: "/gestionClases",
    cover: "https://cdn.bizneo.com/blog/wp-content/uploads/2020/05/formato-de-evaluacion-del-desempen%CC%83o.webp",
  }
])

const goTo = (path) => {
  router.push(path)
}

</script>
