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
            Aqui podras mirar el desempeño
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              text
              to="/dashboard/evaluacion"
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

          <v-card-title> Modulo de evaluacion de AE</v-card-title>
          <v-card-text>
            Aqui podras mirar el desempeño
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="quaternary"
              text
              to="/dashboard/evaluacion"
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

          <v-card-title> Modulo de evaluacion de AE</v-card-title>

          <v-card-text>
            Aqui podras mirar el desempeño
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              text
              to="/dashboard/evaluacion"
            >
              Ir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-responsive>

</template>
<script setup></script>
