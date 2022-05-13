<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5> Mitra </h3>

        <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details>
                </v-text-field>

                <v-spacer></v-spacer>

                <v-btn color="success" dark @click="dialog = true"> Tambah </v-btn>

            </v-card-title>
            <v-data-table :headers="headers" :items="mitras" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" @click="editHandler(item)">edit</v-btn>
                    <v-btn small @click="deleteHandler(item.id_mitra)">delete</v-btn>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <v-span class="headline">{{ formTitle }} Mitra</v-span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field v-model="form.nama_mitra" label="Nama Mitra" required dense outlined></v-text-field>
                        <v-text-field v-model="form.no_ktp" label="Nomor KTP" required dense outlined></v-text-field>
                        <v-text-field v-model="form.alamat" label="Alamat" required dense outlined></v-text-field>
                        <v-text-field v-model="form.nomor_telepon" label="Nomor Telepon" required dense outlined></v-text-field>
                    </v-container>
                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="setForm">Save</v-btn>
                    </v-card-action>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning</span>
                </v-card-title>
                <v-card-text>Anda Yakin ingin menghapus Mitra ini?</v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogConfirm = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>


        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </v-main>
</template>

<script>
export default {
    name: "ListData",
    data() {
        return {
            inputType: 'Tambah',
            load: false,
            snackbar: false,
            error_message: '',
            selected: '',
            color: '',
            search: null,
            dialog: false,
            dialogConfirm: false,
            headers: [
                { text: "ID Mitra", align: "start", sortable: true, value: "id_mitra"},
                { text: "Nama Mitra", value: 'nama_mitra'},
                { text: "Nomor KTP", value: 'no_ktp'},
                { text: "Alamat", value: 'alamat'},
                { text: "Nomor Telepon", value: 'nomor_telepon'},
                { text: "Actions", value: 'actions'},
            ],
            mitra: new FormData,
            mitras: [],
            form: {
                nama_mitra: null,
                no_ktp: null,
                alamat: null,
                nomor_telepon: null,
            },
            deleteId: '',
            editId: ''
        };
    },
    methods: {
        setForm(){
            if(this.inputType !== 'Tambah'){
                this.update();
            }else if(this.inputType == 'Tambah'){
                this.save();
            }else{this.snackbar = true;}
        },
        //Read Data Mitra
        readData() {
            var url = this.$api + '/mitra';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.mitras = response.data.data;
            })
        },
        //Simpan data Mitra
        save() {
            this.mitra.append('nama_mitra', this.form.nama_mitra);
            this.mitra.append('no_ktp', this.form.no_ktp);
            this.mitra.append('alamat', this.form.alamat);
            this.mitra.append('nomor_telepon', this.form.nomor_telepon);

            var url = this.$api + '/mitra'
            this.load = true;
            this.$http.post(url, this.mitra, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.close();
                this.readData(); // baca data
                this.resetForm();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        //Ubah data Mitra
        update() {
            let newData = {
                nama_mitra : this.form.nama_mitra,
                no_ktp : this.form.no_ktp,
                nomor_telepon : this.form.nomor_telepon,
                alamat : this.form.alamat,
            };
            var url = this.$api + '/mitra/' + this.editId;
            this.load = true;
            this.$http.put(url, newData, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.dialogEdit = false;
                this.close();
                this.readData(); // baca data
                this.resetForm();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        //Hapus data Mitra
        deleteData() {
            //menghapus data
            var url = this.$api + '/mitra/' + this.deleteId;
            this.load = true;
            this.$http.delete(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close(); 
                this.readData(); // baca data
                this.resetForm();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        editHandler(item) {
            this.inputType = "Ubah";
            this.editId = item.id_mitra;
            this.form.nama_mitra = item.nama_mitra;
            this.form.no_ktp = item.no_ktp;
            this.form.nomor_telepon = item.nomor_telepon;
            this.form.alamat = item.alamat;
            this.dialog = true;
        },
        deleteHandler(id) {
            this.deleteId = id;
            this.dialogConfirm = true;
        },
        close() {
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogConfirm = false;
            this.readData();
        },
        cancel() {
            this.resetForm();
            this.dialog = false;
            this.dialogEdit = false;
            this.dialogConfirm = false;
            this.inputType = 'Tambah';
        },
        resetForm() {
            this.form = {
                nama_mitra: null,
                no_ktp: null,
                alamat: null,
                nomor_telepon: null,
            };
        },
    },
    computed: {
        formTitle() {
            return this.inputType;
        },
    },
    mounted() {
        this.readData();
    },
};
</script>