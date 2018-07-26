<template>
  <v-app id="Login">
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

<!-- Content -->
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
          <h1>{{msg}}</h1>
          <div><v-alert v-model="error" type="error">{{error}}</v-alert></div>
            <v-card class="elevation-12">
              <v-toolbar dark color="green">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="post">
                  <v-text-field name="login" label="Login" type="text required" v-model="login"></v-text-field>
                  <v-text-field id="password" name="password" label="Password" type="password" v-model="password" required></v-text-field>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green" dark type="submit">Login</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

<!-- Footer -->
  <v-footer color="green" app>
    <span class="white--text">&copy; Loïc Rosset, 2018</span>
  </v-footer>

  </v-app>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      login: '',
      password: '',
      error: false,
      title: 'Camera-Stream',
      menus: [
        {name: 'Login', route: 'Login'}
      ],
      msg: 'Enter your username and password.'
    }
  },
  methods: {
    post: function () {
      this.$http.post('/auth', { user: this.email, password: this.password })
        .then(request => this.loginSuccessful(request))
        .catch(() => this.loginFailed())
    },
    loginSuccessful: function (req) {
      if (!req.data.token) {
        this.loginFailed()
        return
      }
      localStorage.token = req.data.token
      this.error = false
      this.$router.replace(this.$route.query.redirect || '/app')
    },
    loginFailed: function () {
      this.error = 'Login failed!'
      delete localStorage.token
    }
  }
}
</script>
