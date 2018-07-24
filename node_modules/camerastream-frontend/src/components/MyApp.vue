<template>
  <v-app id="Myapp">
    <!-- Toolbar -->
    <v-toolbar color="green" dark fluid fixed fill-height app>
      <v-toolbar-title>
        <v-btn flat :to="{name: 'MyApp'}">{{title}}</v-btn>
      </v-toolbar-title>
    
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="menu in menus" :key='index' :to={name:menu.route}>
          {{menu.name}}
        </v-btn>

      </v-toolbar-items>
    </v-toolbar>

    <router-view></router-view>


    <!-- Content -->
    <v-content>
      <v-container>
        <v-layout align-start justify-space-around column fill-height/>
        <v-flex xs12>
        <div class="content">
          <h1>Main Content</h1>
          <h1>Second content</h1>
        </div>
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
  name: 'MyApp',
  data () {
    return {
      title: 'Camera-Stream',
      menus:[
      {name:"Logout", route:"Login"}
      ]
    }
  }
}
</script>
