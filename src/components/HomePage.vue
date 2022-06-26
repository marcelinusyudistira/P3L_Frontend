<template>
  <div class="dashboard">
    <v-navigation-drawer v-model="drawer" class="fullheight" width="256" app color="green darken-2">
        <v-list-item class="orange darken-2">
            <v-list-item-content class="orange darken-2">
                <v-list-item-title class="title" > Atma Jaya Rental </v-list-item-title>
                <v-list-item-subtitle> Rent Easily </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav>
            <v-list-item
              v-for="item in items"
              :key="item.title"
              link
              align="left"
              tag="router-link"
              :to="item.to">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon> 
              <v-list-item-content >
                <v-list-item-title >{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-app-bar app fixed height="68px" color="green darken-2">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <VSpacer />
      <v-toolbar-items>
        <v-btn text router><v-icon @click="dialogConfirm=true">mdi-power</v-icon></v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <div class="fullheight pa-5">
        <router-view></router-view>
    </div>
    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning</span>
                </v-card-title>
                <v-card-text>Anda Yakin ingin Logout?</v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogConfirm = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="logout">YES</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      drawer: true,
      dialogConfirm: false,
      emailUser: localStorage.getItem('email'),
      items: [
        { title: 'Home', icon: 'mdi-view-dashboard',  to: 'homeDb' },
        { title: 'Profile', icon: 'mdi-account',  to: 'profil' },
        { title: 'Melakukan Peminjaman', icon: 'mdi-car-key',  to: 'peminjaman' },
        { title: 'Generate Nota', icon: 'mdi-note-outline',  to: 'nota' },
      ],
    };
  },
  methods: {
    logout(){
      localStorage.setItem("id","");
      localStorage.setItem("token","");
      localStorage.setItem("role","");
      localStorage.setItem("email","");
      this.$router.push({
        name: 'Login',
      });
    }
  },
};
</script>

<style scoped>
.fullheight {
  min-height: 100vh !important;
}

.router{
  text-decoration: none;
  color: black;
}
</style>