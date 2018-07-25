<template>
  <v-app id="Hello">
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
    <div>
      <h1 class="display-3">Welcome on Camera-Stream</h1>
      <p class="subtitle">Security camera streaming</p>
    </div>
  </div>
  <!-- Footer -->
  <v-footer color="green" app>
    <span class="white--text">&copy; Loïc Rosset, 2018</span>
  </v-footer>

</v-app>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      title: 'Camera-Stream',
      menus: [
        {name: 'Login', route: 'Login'}
      ]
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
