<template>
    <main>
        <v-container fluid fill-height class="posisinya">
            <v-layout flex align-center justify-center>
                <v-flex xs12 sm6 elevation-6>
                    <v-toolbar class="grey darken-3">
                         <v-toolbar-title class="grey--text">
                            <h1>Registrasi User</h1>
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card>
                        <v-card-text class="pt-4">
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field label="Nama Customer" v-model="name" :rules="nameRules" dense outlined required></v-text-field>
                                    <v-menu
                                        ref="menu"
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        :return-value.sync="date"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }" >
                                            <v-text-field
                                                v-model="date"
                                                label="Tanggal Lahir"
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                dense outlined
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="date" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                    <v-select
                                        v-model="genderSelected"
                                        label="Gender"
                                        :items="jenisKelamin"
                                        dense outlined
                                        :rules="genderRules"
                                    />
                                    <v-text-field v-model="alamat" label="Alamat" :rules="alamatRules" required dense outlined></v-text-field>
                                    <v-text-field v-model="nomor_telepon" label="Nomor Telepon" :rules="no_telpRules" required dense outlined></v-text-field>
                                    <v-text-field v-model="email" label="Email" :rules="emailRules" required dense outlined></v-text-field>
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
                                            v-model="ktp"
                                            label="KTP"
                                            @change="uploadKtp"
                                            outlined
                                            dense
                                            :rules="ktpRules"
                                        ></v-file-input>
                                    </template>
                                    <template>
                                        <v-file-input
                                            v-model="sim"
                                            label="SIM"
                                            @change="uploadSim"
                                            outlined
                                            dense
                                            :rules="simRules"
                                        ></v-file-input>
                                    </template>
                                    <v-layout justify-end>
                                        <v-btn class="mr-2" @click="submit" :class=" { 'grey darken-1 white--text' : valid, disabled: !valid }">Register</v-btn>
                                        <v-btn @click="clear" class="grey darken-3 white--text">Clear</v-btn>
                                    </v-layout>
                                    <p>Sudah memiliki akun? Silahkan<v-btn v-on:click="logPage" color="primary" text x-small>Login</v-btn></p>
                                </v-form>
                            </div>
                        </v-card-text>
                    </v-card>
                    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
                </v-flex>
            </v-layout>
        </v-container>
    </main>
</template>

<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto");
    .grey--text{
        font-family: "Roboto";
    }

    .posisinya{
        position: absolute;
        top: 5px;
        left: 0;
        right: 0;
    }
</style>

<script>
    export default {
        name: "RegisterPage",
        data() {
            return {
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                menu: '',
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                dateNow: new Date().toISOString().substr(0, 10),
                valid: false,
                user: new FormData,
                gender:'',
                alamat:'',
                cekUsia:'',
                nomor_telepon:'',
                photo: '',
                ktp: '',
                sim: '',
                genderSelected: '',
                jenisKelamin: ['Laki-laki','Perempuan'],
                email: '',
                emailRules: [
                    (v) => !!v || 'Email tidak boleh kosong',
                ],
                name: '',
                nameRules: [
                    (v) => !!v || 'Nama tidak boleh kosong',
                ],
                genderRules: [
                (v) => !!v || 'Gender tidak boleh kosong ',
                ],
                alamatRules: [
                    (v) => !!v || 'Alamat tidak boleh kosong ',
                ],
                no_telpRules: [
                    (v) => !!v || 'Nomor Telepon tidak boleh kosong ',
                ],
                fotoRules: [
                    (v) => !!v || 'Data Foto tidak boleh kosong ',
                ],
                ktpRules: [
                    (v) => !!v || 'Data KTP tidak boleh kosong ',
                ],
                simRules: [
                    (v) => !!v || 'Data SIM tidak boleh kosong ',
                ],
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
            uploadKtp(e){
                let files = e.target.files[0];
                this.ktp = files;
            },
            submit() {
                if(this.$refs.form.validate()) {
                    this.date1 = new Date(this.date).getFullYear();
                    this.date2 = new Date(this.dateNow).getFullYear();
                        
                    this.cekUsia = this.date2 - this.date1;
                    if(this.cekUsia >= 17){
                        this.user.append('nama_customer', this.name);
                        this.user.append('tanggal_lahir', this.date);
                        this.user.append('gender', this.genderSelected);
                        this.user.append('alamat', this.alamat);
                        this.user.append('nomor_telepon', this.nomor_telepon);
                        this.user.append('foto', this.photo);
                        this.user.append('ktp', this.ktp);
                        this.user.append('sim', this.sim);
                        this.user.append('email', this.email);

                        var url = this.$api + '/register'
                        this.load = true;
                        this.$http.post(url, this.user, {
                            headers: {
                                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                            }
                        }).then(response => {
                            this.error_message = response.data.message;
                            this.color = "green";
                            this.snackbar = true;
                            this.load = true;
                            this.clear();
                            this.$router.push({
                                name: 'Login',
                            });
                        }).catch(error => {
                            console.log(error.response)
                            this.error_message = error.response.data.message;
                            this.color = "red";
                            this.snackbar = true;
                            this.load = false;
                        })
                    }else{
                        this.error_message = "Usia minimal 17 Tahun";
                        this.color = "red";
                        this.snackbar = true;
                    } 
                }
            },
            clear() {
               this.$refs.form.reset() //clear form login
           },
           logPage() {
               this.load=true;
               this.$router.push({
                    name: 'Login',
                });
           }
        },
    };
</script>