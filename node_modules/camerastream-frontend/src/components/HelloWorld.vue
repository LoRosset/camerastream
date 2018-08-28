<template>
  <v-app id="Hello">
  <template>
    <Navbar></Navbar>
  </template>

  <div class="title">
    <div>
      <h1 class="display-3">Welcome on Camera-Stream</h1>
      <p class="subtitle">Security camera streaming</p>
    </div>
  </div>
  <router-view></router-view>

  <template>
    <Foot></Foot>
  </template>

</v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Foot from '@/components/Foot'

export default {
  name: 'HelloWorld',
  components: {
    Navbar,
    Foot
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
