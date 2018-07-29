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

  <div class="title">
    <div onclick="pullUserInfo()">
      <h1 class="display-3">Welcome {{username}}</h1>
      <p class="subtitle">Email : {{email}}</p>
    </div>
  </div>

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
      username: '',
      email: '',
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
      if (!this.currentUser && this.$route.path !== '/app') {
        this.$router.push('/?redirect=' + this.$route.path)
      }
    },
    pullUserInfo: function () {
      if (this.currentUser) {
        this.$http.get('/user/' + this.currentUser.id, function (data, status) {
          this.username = data.name
          console.log('%s', this.username)
          this.email = data.email
        })
          .then(request => console.log('sucessfull get user'))
          .catch(() => console.log('pull user info failed'))
      }
    }
  }
}
</script>

<style>
  .title {
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .title .subtitle {
    font-weight: 200;
    font-size: 1.5rem;
  }
</style>
