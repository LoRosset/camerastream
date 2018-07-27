<template>
  <v-app id="Myapp">
  <!-- Toolbar -->
    <v-toolbar color="green" dark fluid fixed fill-height app>
      <v-toolbar-title>
        <v-btn flat :to="{name: 'HelloWorld'}">{{title}}</v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="menu in menus" :key='menu.index' :to={name:menu.route}>
          {{menu.name}}
        </v-btn>

      </v-toolbar-items>
    </v-toolbar>

    <router-view></router-view>

  <!-- Content -->

  <!-- Footer -->
  <v-footer color="green" app>
    <span class="white--text">&copy; Loïc Rosset, 2018</span>
  </v-footer>

</v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MyApp',
  data () {
    return {
      title: 'Camera-Stream',
      menus: [
        {name: 'Logout', route: 'Login'}
      ]
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  created () {
    this.checkCurrentLogin()
  },
  updated () {
    this.checkCurrentLogin()
  },
  methods: {
    checkCurrentLogin () {
      if (!this.currentUser && this.$route.path !== '/') {
        this.$router.push('/?redirect=' + this.$route.path)
      }
    }
  }
}
</script>
