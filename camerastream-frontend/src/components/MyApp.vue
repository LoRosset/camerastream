<template>
  <v-app id="Myapp">
  <template>
    <Navbar></Navbar>
  </template>

  <div class="title">
    <div>
      <h1 class="display-3">Welcome {{name}}</h1>
      <p class="subtitle">Email : {{email}}</p>
    </div>
  </div>
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
export default {
  name: 'MyApp',
  components: {
    Navbar,
    Foot
  },
  data () {
    return {
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
            this.name = request.data.name
            this.email = request.data.email
          })
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
