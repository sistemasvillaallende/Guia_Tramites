<template>
  <v-container v-if="desserts != null && desserts != 'undefined'">
    <v-row style="margin-top: 30px">
      <v-col cols="12" style="text-align: right">
        <v-btn
          @click="nuevaFicha()"
          style="background-color: #1c3e89 !important; color: white"
          >NUEVA UNIDAD ADMINISTRATIVA</v-btn
        >
      </v-col>
      <!-- <v-col cols="3">
        <v-card color="#385F73" dark style="border-radius: 15px; box-shadow: 5px 5px 9px 4px rgb(0 0 0 / 20%), 0px 20px 31px 3px rgb(0 0 0 / 14%), 0px 8px 38px 7px rgb(0 0 0 / 12%) !important;">
          <v-card-title class="text-h5 block-ellipsis3" style="text-align:center; display:block; margin-bottom:15px;"> Automotores </v-card-title>
          <v-card-subtitle style="display:block; text-align:center;"
            ><v-icon class="fa fa-car" style="font-size: 40px; border-radius: 15px;"></v-icon></v-card-subtitle
          >
          <v-card-actions style="text-align:center; display: block;">
            <v-btn class="ml-2 mt-5" style="margin-top: 0px !important; margin-bottom:20px;font-size: 18px; padding:20px;" outlined rounded small>
              CONSULTAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card color="rgb(186 62 104)" dark style="border-radius: 15px; box-shadow: 5px 5px 9px 4px rgb(0 0 0 / 20%), 0px 20px 31px 3px rgb(0 0 0 / 14%), 0px 8px 38px 7px rgb(0 0 0 / 12%) !important;">
          <v-card-title class="text-h5 block-ellipsis3" style="text-align:center; display:block; margin-bottom:15px;overflow-wrap: break-word;"> Cedulones Contribuciones y Tasas </v-card-title>
          <v-card-subtitle style="display:block; text-align:center;"
            ><v-icon class="fa fa-usd" style="font-size: 40px; border-radius: 15px;"></v-icon></v-card-subtitle
          >
          <v-card-actions style="text-align:center; display: block;">
            <v-btn class="ml-2 mt-5" style="margin-top: 0px !important; margin-bottom:20px;font-size: 18px; padding:20px;" outlined rounded small>
              CONSULTAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>    -->
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h3>Unidades Administrativas</h3>
          </v-card-title>
          <v-card-text>
            <table style="width: 100%">
              <Draggable :list="desserts" tag="tbody" @end="saveorden()">
                <tr v-for="(item, index) in desserts" :key="index"
                  :style="[
                            item.activa
                              ? { padding: '5px' }
                              : {
                                  'background-color': '#d3d3d359',
                                  opacity: '0.5',
                                },
                          ]">
                  <td style="width: 5%">
                    <v-icon
                      :class="'fa ' + item.icono"
                      :style="'color:' + item.color"
                    ></v-icon>
                  </td>
                  <td>{{ item.nombre }}</td>
                  <td>
                    <v-menu top :close-on-content-click="closeOnContentClick">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          text
                          v-bind="attrs"
                          v-on="on"
                          style="float: right"
                        >
                          <v-icon class="fa fa-bars"></v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item>
                          <v-btn
                            text
                            @click="
                              editaFicha(
                                item.id,
                                item.nombre,
                                item.icono,
                                item.color
                              )
                            "
                          >
                            <v-icon small> mdi-pencil </v-icon> Editar
                          </v-btn>
                        </v-list-item>
                        <v-list-item>
                          <v-btn
                            text
                            v-if="item.activa"
                            @click="activa_desactiva(item.id, false)"
                          >
                            <v-icon left class="fa fa-eye"></v-icon>
                            Desactivar
                          </v-btn>
                          <v-btn
                            text
                            v-else
                            @click="activa_desactiva(item.id, true)"
                          >
                            <v-icon left class="fa fa-eye-slash"></v-icon>
                            Activar
                          </v-btn>
                        </v-list-item>
                        <v-list-item>
                          <v-btn text @click="logicDelete(item.id, index)">
                            <v-icon small> mdi-delete </v-icon> Eliminar
                          </v-btn>
                        </v-list-item>
                        <v-list-item>
                          <v-btn text :href="'/SessionList/' + item.id">
                            <v-icon small> mdi-folder </v-icon> Tramites
                          </v-btn>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </td>
                </tr>
              </Draggable>
            </table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" style="text-align: right">
        <v-btn href="/TrackList">SALIR</v-btn>
      </v-col>
    </v-row>
    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      v-model="dialogError"
    >
      <template v-slot:default="dialogError">
        <v-card>
          <v-toolbar
            style="
              background-color: red !important;
              border-color: red !important;
            "
            dark
            >Error!</v-toolbar
          >
          <v-card-text>
            <div
              style="
                margin-top: 20px;
                text-align: center;
                color: black;
                font-size: 20px;
                font-family: 'DM Sans';
              "
            >
              {{ txtError }}
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialogError.value = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      v-model="dialogConfirma"
    >
      <template v-slot:default="dialogConfirma">
        <v-card>
          <v-toolbar
            style="
              background-color: red !important;
              border-color: red !important;
            "
            dark
          >
            <v-card-title>Confirmar</v-card-title>
          </v-toolbar>

          <v-card-text>
            <div
              style="
                margin-top: 20px;
                text-align: center;
                color: black;
                font-size: 20px;
                font-family: 'DM Sans';
              "
            >
              ¿Esta seguro de eliminar la unidad administrativa?
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialogConfirma.value = false">Cancelar</v-btn>
            <v-btn text @click="confirmaLogicDelete()">Eliminar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <v-dialog
      transition="dialog-top-transition"
      max-width="80%"
      style="overflow-y: hidden"
      v-model="dialogAdd"
    >
      <template v-slot:default="dialogAdd">
        <v-card>
          <v-toolbar
            style="
              background-color: #1c3e89 !important;
              border-color: #1c3e89 !important;
            "
            dark
          >
            <v-card-title>Nueva unidad administrativa</v-card-title>
          </v-toolbar>

          <v-card-text style="margin-top: 20px">
            <v-row>
              <v-col cols="9">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="nombre"
                      :rules="[rules.required]"
                      label="Nombre unidad administrativa"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row style="margin-top: 0">
                  <v-col cols="12">
                    <v-text-field
                      solo
                      label="Icono"
                      disabled
                      v-model="selected_icono"
                      :prepend-inner-icon="selected_icono"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row
                  v-if="iconos != null && iconos != 'undefined'"
                  style="overflow-y: scroll; height: 250px"
                >
                  <v-col
                    cols="1"
                    v-for="(icono, indice) in iconos"
                    :key="indice"
                  >
                    <v-btn
                      text
                      @click="asignaricono(icono.clase)"
                      style="
                        height: 50px;
                        min-width: 50px;
                        padding: 0 16px;
                        border: solid 1px lightgray;
                        border-radius: 10px;
                      "
                      ><v-icon
                        style="font-size: 16px"
                        :class="'fa ' + icono.clase"
                      ></v-icon
                    ></v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="3" style="padding-top: 0">
                <v-color-picker
                  dot-size="25"
                  mode="hexa"
                  v-model="color"
                  swatches-max-height="200"
                ></v-color-picker>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialogAdd.value = false">Cancelar</v-btn>
            <v-btn text @click="guardarUnidadAdministrativa()">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>
<style scoped>
.v-dialog {
  width: 80% !important;
}
</style>
<script>
import Draggable from "vuedraggable";
export default {
  data: () => {
    return {
      color: "",
      selected_icono: "",
      idUnidadAdministrativa: 0,
      nombre: "",
      icono_unidad: "",
      dialogAdd: false,
      closeOnContentClick: false,
      search: "",
      headers: [
        { text: "Nombre", value: "nombre" },
        { text: "", value: "id" },
      ],
      rules: {
        required: (value) => !!value || "Campo requerido",
      },
      desserts: null,
      iconos: null,
      track: null,
      idUnidadAdministrativaDelete: null,
      dialogError: null,
      txtError: null,
      indice: null,
      dialogConfirma: false,
    };
  },
  components: {
    Draggable,
  },
  async mounted() {
    try {
      this.desserts = (await this.$http.get("/UnidadAdministrativa/read")).data;
      this.iconos = (await this.$http.get("/FontAwesome/read")).data;
    } catch (error) {}
  },
  methods: {
    async activa_desactiva(id, estado) {
         let post = {
          id: id,
          activa: estado,
        };
        this.desserts = (await this.$http.post("/UnidadAdministrativa/updateActiva", post)).data;      
    },    
    saveorden() {
      var post = "[";
      this.desserts.forEach((element) => {
        if (element != "undefined" && element != null)
          post += "{ 'id' : " + element.id + ", 'orden' : " + 0 + "},";
      });

      post = post.substring(0, post.length - 1);
      post += "]";

      this.$http.get("/UnidadAdministrativa/reordenar?json=" + post);
    },
    async guardarUnidadAdministrativa() {
      if (this.nombre == "") {
        this.txtError = "Por favor ingrese el nombre de la unidad organizativa";
        this.dialogError = true;
        return;
      }
      if (this.selected_icono == "") {
        this.txtError = "Por favor elija el icono de la unidad organizativa";
        this.dialogError = true;
        return;
      }
      if (this.color == "") {
        this.txtError = "Por favor elija el color de la unidad organizativa";
        this.dialogError = true;
        return;
      }
      if (this.idUnidadAdministrativa == 0) {
        let post = {
          nombre: this.nombre,
          icono: this.selected_icono,
          color: this.color,
        };
        this.desserts = (
          await this.$http.post("/UnidadAdministrativa/insert", post)
        ).data;
        this.dialogAdd = false;
      } else {
        let post = {
          nombre: this.nombre,
          icono: this.selected_icono,
          color: this.color,
          id: this.idUnidadAdministrativa,
        };
        this.desserts = (
          await this.$http.post("/UnidadAdministrativa/update", post)
        ).data;
        this.dialogAdd = false;
      }
    },
    asignaricono(ico) {
      this.selected_icono = ico;
    },
    logicDelete(id, index) {
      this.idUnidadAdministrativaDelete = id;
      this.indice = index;
      this.dialogConfirma = true;
    },
    confirmaLogicDelete() {
      this.$http.post("/UnidadAdministrativa/delete", {
        id: this.idUnidadAdministrativaDelete,
      });
      this.desserts.splice(this.indice, 1);
      this.dialogConfirma = false;
    },
    nuevaFicha() {
      this.dialogAdd = true;
      this.idUnidadAdministrativa = 0;
    },
    editaFicha(id, nombre, icono, color) {
      this.dialogAdd = true;
      this.idUnidadAdministrativa = id;
      this.nombre = nombre;
      this.color = color;
      this.selected_icono = icono;
    },
  },
};
</script>