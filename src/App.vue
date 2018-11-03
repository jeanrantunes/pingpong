<template>
  <v-app>
    <v-toolbar app align-content-space-between clipped-left>
      <v-toolbar-title class="headline text-uppercase">
        <span>Ping Pong</span> 
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
          <v-btn flat to="/gamers" v-show="$store.state.btnRanking">Ranking</v-btn>
          <v-btn flat @click="getout" to="/" v-show="$store.state.btnGetOut"><v-icon>exit_to_app</v-icon></v-btn>
      </v-toolbar-items>

    </v-toolbar>

    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      //
    };
  },
  methods: {
    getout() {
      let state = this.$store.state;
      let newState = {};

      Object.keys(state).forEach(key => {
        newState[key] = null; // or = initialState[key]
      });

      this.$store.replaceState(newState);
    }
  }
};
</script>
