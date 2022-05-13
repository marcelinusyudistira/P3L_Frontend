<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5> Promo </h3>

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
            <v-data-table :headers="headers" :items="promos" :search="search">
                <template v-slot:[`item.status_promo`]="{ item }">
                    <div v-if="item.status_promo === 1">Aktif</div>
                    <div v-else>Tidak Aktif</div>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" @click="editHandler(item)">edit</v-btn>
                    <v-btn small @click="deleteHandler(item.id_promo)">delete</v-btn>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <v-span class="headline">{{ formTitle }} Promo</v-span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field v-model="form.kode_promo" label="Kode Promo" required dense outlined></v-text-field>
                        <v-text-field v-model="form.jenis_promo" label="Jenis Promo" required dense outlined></v-text-field>
                        <v-text-field v-model="form.keterangan" label="Keterangan" required dense outlined></v-text-field>
                        <v-text-field v-model="form.potongan_harga" label="Potongan Harga" required dense outlined></v-text-field>
                        <v-select
                            item-text="name"
                            item-value="id"
                            v-model="selectStatus"
                            label="Status Promo"
                            :items="statusPromo"
                            dense outlined
                        />
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
                <v-card-text>Anda Yakin ingin menghapus Promo ini?</v-card-text>
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
            selectStatus: '',
            color: '',
            search: null,
            dialog: false,
            dialogConfirm: false,
            headers: [
                { text: "Kode Promo", align: "start", sortable: true, value: "kode_promo"},
                { text: "Jenis Promo", value: 'jenis_promo'},
                { text: "Keterangan", value: 'keterangan'},
                { text: "Potongan Harga", value: 'potongan_harga'},
                { text: "Status Promo", value: 'status_promo'},
                { text: "Actions", value: 'actions'},
            ],
            promo: new FormData,
            promos: [],
            form: {
                kode_promo: null,
                jenis_promo: null,
                keterangan: null,
                potongan_harga: null,
                status_promo: null,
            },
            deleteId: '',
            editId: '',
            statusPromo: [
                {
                    name: "Aktif",
                    id: "1"
                },
                {
                    name: "Tidak Aktif",
                    id: "0"
                }
            ],
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
        //Read Data Promo
        readData() {
            var url = this.$api + '/promo';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.promos = response.data.data;
            })
        },
        //Simpan data Promo
        save() {
            this.promo.append('kode_promo', this.form.kode_promo);
            this.promo.append('jenis_promo', this.form.jenis_promo);
            this.promo.append('keterangan', this.form.keterangan);
            this.promo.append('potongan_harga', this.form.potongan_harga);
            this.promo.append('status_promo', this.selectStatus);

            var url = this.$api + '/promo'
            this.load = true;
            this.$http.post(url, this.promo, {
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
        //Ubah data Promo
        update() {
            let newData = {
                kode_promo : this.form.kode_promo,
                jenis_promo : this.form.jenis_promo,
                keterangan : this.form.keterangan,
                potongan_harga : this.form.potongan_harga,
                status_promo : this.selectStatus,
            };
            var url = this.$api + '/promo/' + this.editId;
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
        //Hapus data Promo
        deleteData() {
            //menghapus data
            var url = this.$api + '/promo/' + this.deleteId;
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
            this.editId = item.id_promo;
            this.form.kode_promo = item.kode_promo;
            this.form.jenis_promo = item.jenis_promo;
            this.form.keterangan = item.keterangan;
            this.form.potongan_harga = item.potongan_harga;
            this.form.status_promo = item.status_promo;
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
                kode_promo: null,
                jenis_promo: null,
                keterangan: null,
                potongan_harga: null,
                status_promo: null,
                selectStatus: '',
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