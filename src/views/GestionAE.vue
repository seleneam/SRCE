<template>
  <div>
    <AppBar/>
    <v-app>
      <v-main>
        <v-container class="">
          <v-row no-gutters>
            <v-col>
              <v-sheet class="pa-2 ma-2">
                <v-btn class="px-5 mr-5">class1</v-btn>
                <v-btn class="px-5 mr-5">class2</v-btn>
                <v-btn class="px-5 mr-5">class3</v-btn>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row no-gutters>
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
import AppBar from "@/layouts/default/AppBar.vue";
const router = useRouter();
async function goBack() {
  window.history.length > 1 ? router.go(-1) : await router.push("/");
}
</script>
