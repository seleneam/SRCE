<template>
  <v-navigation-drawer
    permanent
    location="left"
  >
    <template v-slot:prepend>
      <v-list-item
        lines="two"
        :prepend-avatar="user.profilePicture"
        subtitle="Logged in"
      ></v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="item in navDrawerItems"
        :key="item.title"
        :prepend-icon="item.icon"
        :title="item.title"
        link :to="item.to"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {useAccessStore} from '@/store/access'
import {signOut, getAuth} from 'firebase/auth'
import {ref} from "vue";

const router = useRouter()
const store = useAccessStore()
const auth = getAuth()

const accessStore = useAccessStore();
const user = ref(accessStore.user);

const navDrawerItems = ref([
  {title: "Home", icon: "mdi-home", to: "/home"},
  {title: "Evaluación", icon: "mdi-clipboard-check", to: "/evaluacion"},
  {title: "Gestión", icon: "mdi-clipboard-list", to: "/gestionAE"},
  {title: "Clases", icon: "mdi-school", to: "/gestionClases"},
]);

const logOut = () => {
  signOut(auth).then(() => {
    store.$reset()
    router.push({name: 'Home'})
  }).catch((error) => {
    console.log(error)
  })
}

</script>
