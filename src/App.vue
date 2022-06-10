<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://vecino.villaallende.gov.ar/App_Themes/images/GESTION%20vertical%202.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        @click.stop="drawer2 = !drawer2"
        style="margin-right: 1%"
      >
        <v-avatar>
          <v-img
            style="height: 55px; margin-top: 25px"
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://randomuser.me/api/portraits/women/81.jpg"
            width="100"
          />
        </v-avatar>
      </v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense style="text-align: left">
        <v-list-item>
          <v-list-item-title>Menú 1</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Menú 2</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Menú 3</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Menú 4</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer v-model="drawer2" absolute temporary right>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense> </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<style>
h1,
h2,
h3,
h4,
h5,
h6,
p,
span,
a,
div {
  word-break: break-word !important;
}
.block-ellipsis {
	display: block;
	display: -webkit-box;
	max-width: 100%;
	height: 43px;
	margin: 0 auto;
	font-size: 14px;
	line-height: 1;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}
.block-ellipsis3 {
	display: grid !important;
	display: -webkit-box;
	max-width: 100%;
	margin: 0 auto;
	font-size: 14px;
	line-height: 1;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
  height: 128px !important;
}
</style>
<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
    drawer2: false,
  }),
};
</script>
