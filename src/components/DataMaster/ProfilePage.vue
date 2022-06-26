<template>
    <v-main>
    <template>
      <v-card
        class="mx-auto"
        max-width="1200"
      >
        <div v-for="item in profile" :key="item.id">
          <v-img
          class="white--text align-end"
          height="250px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-avatar
            class="profile"
            color="red"
            size="164"
            style="position:absolute; top: 20px; left: 50px;"
          >
            <v-img v-bind:src="('https://api.atmajayarental-0378.xyz/public/images/') + item.foto"></v-img>
          </v-avatar>
          <v-card-title class="ml-5">{{item.nama_customer}}</v-card-title>
        </v-img>
        <v-card-title class="ml-5">ID Customer   : {{item.id_customer}}</v-card-title>
        <v-card-title class="ml-5">Tanggal Lahir : {{item.tanggal_lahir}}</v-card-title>
        <v-card-title class="ml-5">Gender        : {{item.gender}}</v-card-title>
        <v-card-title class="ml-5">Alamat        : {{item.alamat}}</v-card-title>
        <v-card-title class="ml-5">Nomor Telepon : {{item.nomor_telepon}}</v-card-title>
        <v-card-actions>
          <v-btn
            depressed
            color="primary"
            style="left: 1055px;"
            @click="editHandler(item)"
          >
            Edit Profile
          </v-btn>
        </v-card-actions>
        </div>        
      </v-card>
    </template>
    <v-dialog v-model="dialogEdit" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-span class="headline">{{ formTitle }} Edit Customer</v-span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form v-model="valid" ref="form">
            <v-text-field v-model="form.nama_customer" label="Nama Customer" :rules="namaRules" required dense outlined></v-text-field>
            <v-select
              item-text="name"
              item-value="name"
              v-model="selectGender"
              label="Gender"
              :items="jenisKelamin"
              dense outlined
              :rules="genderRules"
            />
            <v-text-field v-model="form.alamat" label="Alamat" :rules="alamatRules" required dense outlined></v-text-field>
            <v-text-field v-model="form.nomor_telepon" label="Nomor Telepon" :rules="no_telpRules" required dense outlined></v-text-field>
            <template>
              <v-file-input
                v-model="photo"
                label="Foto "
                @change="upload"
                outlined
                dense
                :rules="fotoRules"
              ></v-file-input>
            </template>
            <template>
              <v-file-input
                v-model="sim"
                label="SIM "
                @change="uploadSim"
                outlined
                dense
                :rules="simRules"
              ></v-file-input>
            </template>  
            </v-form>                        
          </v-container>
          <v-card-action>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="update">Save</v-btn>
          </v-card-action>
        </v-card-text>
      </v-card>
    </v-dialog>

    </v-main>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      drawer: true,
      dialogConfirm: false,
      emailUser: localStorage.getItem('email'),
      selectGender:'',
      profil: new FormData,
      profile:{},
      form: {
        nama_customer: null,
        gender: null,
        alamat: null,
        nomor_telepon: null,
        foto: null,
        sim: null,
      },
      jenisKelamin: [
        {
          name: "Laki-laki",
        },
        {
          name: "Perempuan",
        },
      ],
      photo:null,
      sim:null,
      editId:'',
      timer:'',
      namaRules: [
        (v) => !!v || 'Nama tidak boleh kosong',
      ],
      genderRules: [
        (v) => !!v || 'Jenis Kelamin tidak boleh kosong',
      ],
      alamatRules: [
        (v) => !!v || 'Alamat tidak boleh kosong',
      ],
      no_telpRules: [
        (v) => !!v || 'Nomor Telepon tidak boleh kosong',
      ],
      fotoRules: [
        (v) => !!v || 'Data Foto tidak boleh kosong',
      ],
      simRules: [
        (v) => !!v || 'Data SIM tidak boleh kosong',
      ]
    };
  },
  methods: {
    upload(e){
      let files = e.target.files[0];
      this.photo = files;
    },
    uploadSim(e){
      let files = e.target.files[0];
      this.sim = files;
    },
    readData() {
      var url = this.$api + '/showProfile/' + this.emailUser;
      this.$http.get(url, {
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
      }).then(response => {
        this.profile = response.data.data;
      })
    },
    update() {
      if(this.$refs.form.validate()) {
      let newData = {
        nama_customer : this.form.nama_customer,
        gender : this.selectGender,
        alamat : this.form.alamat,
        nomor_telepon : this.form.nomor_telepon,
        foto : this.photo,
        sim : this.sim,
      };
      var url = this.$api + '/customer/' + this.editId;
      this.load = true;
      this.$http.put(url, newData, {
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
      }).then(response => {
        this.timer = setInterval(this.readData, 5000);
        this.error_message = response.data.message;
        this.error_message = "Berhasil Edit Profile";
        this.color = "green";
        this.snackbar = true;
        this.load = false;
        this.dialogEdit = false;
        this.close();
        this.readData(); // baca data
        this.resetForm();
      }).catch(error => {
        this.error_message = error.response.data.message;
        this.color = "red";
        this.snackbar = true;
        this.load = false;
      });
    }},
    editHandler(item) {
      this.editId = item.id_customer;
      this.form.nama_customer = item.nama_customer;
      this.form.gender = item.gender;
      this.form.alamat = item.alamat;
      this.form.nomor_telepon = item.nomor_telepon;
      this.form.foto = item.foto;
      this.form.sim = item.sim;
      this.dialogEdit = true;
    },
    logout(){
      localStorage.setItem("id","");
      localStorage.setItem("token","");
      localStorage.setItem("role","");
      localStorage.setItem("email","");
      this.$router.push({
        name: 'Login',
      });
    },
    cancel() {
      this.resetForm();
      this.dialogEdit = false;
      this.$refs.form.reset();
    },
    resetForm() {
      this.form = {
      nama_customer: null,
      gender: null,
      alamat: null,
      nomor_telepon: null,
      foto: null,
      sim: null,
      selectGender: '',
      };
    },
  },
  mounted() {
        this.readData();
    },
};

</script>

<style>
.compAv{

}
</style>