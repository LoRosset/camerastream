<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-media>
          <v-flex class="text-xs-center">
            <img src="../assets/home.png" id="image">
          </v-flex>
        </v-card-media>

        <v-card-title primary-title>
          <v-flex class="text-xs-center">
            <div>
              <h3 class="headline mb-0">Your Box : {{box}}</h3>
            </div>
          </v-flex>
        </v-card-title>

        <v-card-actions>
          <v-flex class="text-xs-center">
            <v-btn flat color="orange" v-for="camera in cameras" :key='camera.index' v-on:click="askForConnexion(camera.name)">{{camera.name}}</v-btn>
            <v-btn flat color="red" v-for="camera in cameras" :key='camera.index' v-on:click="askForKill(camera.name)">Kill {{camera.name}}</v-btn>
          </v-flex>
        </v-card-actions>

      <iframe v-if="url" v-bind:src="url" height="400" width="600">
        <p>Your browser does not support iframes.</p>
      </iframe>

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
      box: null,
      cameras: [],
      url: null
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  created () {
    this.pullUserInfo()
    if (this.box != null) {
      this.askForCamera(this.box)
    }
  },
  methods: {
    write: function (text) {
      alert(text)
    },

    pullUserInfo: function () {
      if (this.currentUser) {
        this.$http.get('/user/' + this.currentUser.id)
          .then(request => {
            if (request.data.box) {
              this.box = request.data.box
              this.pullBoxInfo()
            }
          })
          .catch(() => console.log('pull user info failed'))
      }
    },

    pullBoxInfo: function () {
      this.$http.get('/box/' + this.box)
        .then(request => {
          if (request.data) {
            this.askForCamera()
            console.log(request.data)
            for (var i = request.data.cameras.length - 1; i >= 0; i--) {
              this.$http.get('/camera/' + request.data.cameras[i]).then(request => {
                this.cameras.push(request.data)
              })
            }
          }
        })
        .catch(() => console.log('pull box info failed'))
    },

    askForCamera: function () {
      var request = {msg: 'getCameras', boxId: this.box}
      this.$socket.send(JSON.stringify(request))
    },

    askForConnexion: function (camera) {
      // window.location = 'https://camera-stream.tk:' + 3000 + '/v1/app/flux/' + this.box + '/' + camera
      this.$http.get('/flux/'+ this.box + '/' + camera).then(request => {
        this.url = request.data.url
      })
    },

    askForKill: function (camera) {
      var request = {msg: 'kill', boxId: this.box, cameraId: camera}
      this.$socket.send(JSON.stringify(request))
      this.url = null
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
