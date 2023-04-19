<!-- Crea un componente que permita iniciar sesión -->
<template>
 <div class="auth-wrapper d-flex align-center justify-center pa-4 bg-primary fill-height">
  <VCard
    class="auth-card pa-5 py-7 flex-column justify-center"
    flat
    width="548"
    max-height="760"
    color="accent"
    rounded="15"
  >
    <VCardItem class="flex-fill justify-center pt-16 pb-4">
      <template #prepend>
        <div>
          <MainLogo size="100%" />
        </div>
      </template>
    </VCardItem>

    <VCardText class="justify-space-between flex-wrap justify-center py-2 ">
      <div class="text-h6 font-weight-semibold mb-1 text-center py-2">
        Bienvenido docente <span class="font-weight-bold"> UABC </span> 👋🏻
      </div>
      <p class="text-body-1 text-justify py-3 mx-6">
        Para acceder al sistema inicie sesión con su cuenta institucional de <b>Google</b>
      </p>
    </VCardText>

    <VCardActions class="flex-fill justify-center pt-12 pb-8">
      <VBtn
        color="tertiary"
        variant="tonal"
        @click="signInWithGoogle"
      >
        <template #prepend>
          <VIcon class="mr-2 ms-1">mdi-google</VIcon>
        </template>
        Iniciar sesión
      </VBtn>
    </VCardActions>

  </VCard>
 </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {useRouter} from 'vue-router';
import axios from "axios";
import MainLogo from '@/assets/SRCELogo.vue'
import { useAccessStore } from "@/store/access";

const router = useRouter()
const auth = getAuth()
const accessStore = useAccessStore()
const user = ref(auth.currentUser)
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/classroom.courses.readonly')
  signInWithPopup(auth , provider)
    .then(async (res) => {
      accessStore.$state.access_token = res._tokenResponse.oauthAccessToken
    })
    .catch((error) => {
      console.log(error)
    }
  )
}

onMounted(() => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      router.push({ name: 'Dashboard' })
    } else {
      accessStore.$reset()
    }
  })
})


</script>
