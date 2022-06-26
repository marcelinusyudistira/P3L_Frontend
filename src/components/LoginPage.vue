<template>
    <main>
        <v-container fluid fill-height class="posisinya">
            <v-layout flex align-center justify-center>
                <v-flex xs12 sm6 elevation-6>
                    <v-toolbar class="blue darken-3">
                         <v-toolbar-title class="white--text">
                            <h1>Monggo Login</h1>
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card>
                        <v-card-text class="pt-4">
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
                                    <v-text-field label="Password" v-model="password" type="password" min="8" :rules="passwordRules" counter required></v-text-field>
                                    <v-layout justify-end>
                                        <v-btn class="mr-2" @click="submit" :class=" { 'grey darken-1 white--text' : valid, disabled: !valid }">Go</v-btn>
                                        <v-btn @click="clear" class="blue darken-3 white--text">Clear</v-btn>
                                    </v-layout>
                                    <p>Belum memiliki akun? Silahkan<v-btn v-on:click="regPage" color="primary" text x-small>Registrasi</v-btn></p> 
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
        top: 20px;
        left: 0;
        right: 0;
    }
</style>

<script>
    export default {
        name: "LoginPage",
        data() {
            return {
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                valid: false,
                password: '',
                cekJabatan: '',
                passwordRules: [
                    (v) => !!v || 'Password tidak boleh kosong :(',
                ],
                email: '',
                emailRules: [
                    (v) => !!v || 'Email tidak boleh kosong :(',
                ]
            };
        },
        methods: {
            submit() {
                if(this.$refs.form.validate()) {
                    //cek validasi data yang terkirim
                    this.load = true;
                    this.$http.post(this.$api + '/login', {
                        email: this.email,
                        password: this.password
                    }).then(response => {
                        //simpan data id user yang diinput
                        localStorage.setItem('id', response.data.user.id);
                        localStorage.setItem('email', response.data.user.email);
                        localStorage.setItem('role', response.data.user.jabatan);
                        localStorage.setItem('token', response.data.access_token);
                        this.error_message = response.data.message;
                        this.error_message = "Berhasil Login";
                        this.color = "green";
                        this.snackbar = true;
                        this.load = false;
                        this.clear();
                        this.cekJabatan = localStorage.getItem('role');
                        if(this.cekJabatan == 0){
                            this.$router.push({
                            name: 'Home',
                         });
                        }else if(this.cekJabatan == 1){
                            this.$router.push({
                             path: '/manager',
                         });
                        }else if(this.cekJabatan == 2){
                            this.$router.push({
                             path: '/admin',
                         });
                        }else if(this.cekJabatan == 3){
                            this.$router.push({
                             path: '/customerService',
                         });
                        }
                    }).catch(error => {
                        console.log(error.response)
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        localStorage.removeItem('token');
                        this.load = false;
                    })
                }
            },

           clear() {
               this.$refs.form.reset() //clear form login
           },
           
           regPage() {
               this.load=true;
               this.$router.push({
                    name: 'Register',
                });
           }
        },
    };
</script>
