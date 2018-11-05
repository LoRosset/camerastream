<template>
  <v-app id="Myapp">
  <template>
    <Navbar></Navbar>
  </template>

  <v-container>
    <v-layout>
      <v-flex xs12>
        <h1>Welcome {{name}}</h1>
      </v-flex>
    </v-layout>
    <template>
    <Box></Box>
  </template>
  </v-container>

  <router-view></router-view>

  <template>
    <Foot></Foot>
  </template>

</v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import Foot from '@/components/Foot'
import Box from '@/components/Box'
export default {
  name: 'MyApp',
  components: {
    Navbar,
    Foot,
    Box
  },
  data () {
    return {
      username: '',
      name: '',
      email: ''
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  created () {
    this.pullUserInfo()
    this.checkCurrentLogin()
  },
  updated () {
    this.checkCurrentLogin()
  },
  methods: {
    checkCurrentLogin () {
      if (!this.currentUser && this.$route.path !== '/login') {
        this.$router.push('/?redirect=' + this.$route.path)
      }
    },
    pullUserInfo: function () {
      if (this.currentUser) {
        this.$http.get('/user/' + this.currentUser.id)
          .then(request => {
            this.username = request.data.username
            this.name = request.data.name
            this.email = request.data.email
          })
          .catch(() => console.log('pull user info failed'))
      }
    }
  }
}
</script>
