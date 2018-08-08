<template>
  <v-toolbar color="green" dark fluid fixed fill-height app>
    <v-toolbar-title>
      <v-btn flat :to="{name: 'HelloWorld'}">{{title}}</v-btn>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn v-if="currentUser" flat v-for="menu in menusUser" :key='menu.index' :to={name:menu.route}>
          {{menu.name}}
      </v-btn>
      <v-btn v-else flat v-for="menu in menus" :key='menu.index' :to={name:menu.route}>
          {{menu.name}}
      </v-btn>

    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  data () {
    return {
      title: 'Camera-Stream',
      menusUser: [
        {name: 'Logout', route: 'Logout'}
      ],
      menus: [
        {name: 'Login', route: 'Login'}
      ]
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  }
}
</script>
