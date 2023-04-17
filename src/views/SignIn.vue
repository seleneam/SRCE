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
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {useRouter} from 'vue-router';
import MainLogo from '@/assets/SRCELogo.vue'

const router = useRouter()
const auth = getAuth()
const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  await signInWithPopup(auth, provider).then(
    (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      localStorage.setItem('token', token);
      router.push('dashboard');
    }
  ).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
}

const user = ref(auth.currentUser)

onMounted(() => {
  auth.onAuthStateChanged((newUser) => {
    user.value = newUser
  })
})


</script>
