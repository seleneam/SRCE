<template>
  <v-responsive
    class="auth-wrapper d-flex align-center justify-center pa-4 bg-accent fill-height"
  >
    <v-row class="justify-center mb-10">
      <v-col class="d-flex justify-center">
        <h1 class="text-h4 font-weight-bold my-3">Dashboard</h1>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col sm="4">
        <v-card
          class="mx-auto mb-10 bg-transparent"
          max-width="344"
          style="border: 1px green; border-style: solid none"
        >
          <v-img
            src="https://cdn.bizneo.com/blog/wp-content/uploads/2020/05/formato-de-evaluacion-del-desempen%CC%83o.webp"
            class="mx-auto my-5"
            cover
            style="aspect-ratio: 1.78"
          ></v-img>

          <v-card-title> Modulo de evaluacion de AE</v-card-title>

          <v-card-text>
            Aqui podras evaluar los atributos de egreso.
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              text
              to="/evaluacion"
            >
              Ir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col sm="4">
        <v-card
          class="mx-auto mb-10 bg-secondary"
          max-width="344"
          variant="tonal"
        >
          <v-img
            src="https://cdn.bizneo.com/blog/wp-content/uploads/2020/05/formato-de-evaluacion-del-desempen%CC%83o.webp"
            class="mx-auto my-5"
            cover
            style="aspect-ratio: 1.78"
          ></v-img>

          <v-card-title> Modulo de gestion de AE</v-card-title>
          <v-card-text>
            Aqui podras vincular los AE con los que estaras trabajando con respecto a tus clases.
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="quaternary"
              text
              to="/gestionAE"
            >
              Ir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col sm="4">
        <v-card
          class="mx-auto mb-10 bg-transparent"
          max-width="344"
          style="border: 1px green; border-style: solid none"
        >
          <v-img
            src="https://cdn.bizneo.com/blog/wp-content/uploads/2020/05/formato-de-evaluacion-del-desempen%CC%83o.webp"
            class="mx-auto my-5"
            cover
            style="aspect-ratio: 1.78"
          ></v-img>

          <v-card-title> Modulo de gestión de clases</v-card-title>

          <v-card-text>
            Aquí podras vincular las clases de classroom con el sistema.
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              text
              to="/gestionClases"
            >
              Ir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-responsive>

</template>
<script setup>

</script>
