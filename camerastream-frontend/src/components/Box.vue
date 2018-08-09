<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media>
          <v-flex class="text-xs-center">
            <img src="../assets/home.png" id="image">
          </v-flex>
        </v-card-media>

        <v-card-title primary-title>
          <v-flex class="text-xs-center">
            <div>
              <h3 class="headline mb-0">Your Box</h3>
            </div>
          </v-flex>
        </v-card-title>

        <v-card-actions>
          <v-flex class="text-xs-center">
            <v-btn flat color="orange">Camera</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Box',
  data () {
    return {
      box: null
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  created () {
    this.pullUserInfo()
  },
  methods: {
    pullUserInfo: function () {
      if (this.currentUser) {
        this.$http.get('/user/' + this.currentUser.id)
          .then(request => {
            if (request.data.box) {
              this.box = request.data.box
            }
          })
          .catch(() => console.log('pull user info failed'))
      }
    }
  }
}
</script>

<style>
  #image {
    width: 100px;
    height: 100px;
  }
</style>
