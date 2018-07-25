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
            <v-card class="elevation-12">
              <v-toolbar dark color="green">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>

              <v-card-text>
                <v-form>

                  <v-text-field name="login" label="Login" type="text required"></v-text-field>

                  <v-text-field id="password" name="password" label="Password" type="password" required></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green" dark v-on:click="login">Login</v-btn>
              </v-card-actions>
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
      email: '',
      password: '',
      title: 'Camera-Stream',
      menus: [
        {name: 'Login', route: 'Login'}
      ],
      msg: 'Enter your username and password.',
      methods: {
        login () {
          console.log(this.email)
          console.log(this.password)
        }
      }
    }
  }
}
</script>
