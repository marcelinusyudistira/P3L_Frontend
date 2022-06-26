<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5> Pegawai</h3>

        <v-card dark class="mt-5">
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
            <v-data-table dark :headers="headers" :items="pegawais" :search="search">
                <template v-slot:[`item.id_role`]="{ item }">
                    <div v-if="item.id_role === 1">Manager</div>
                    <div v-else-if="item.id_role === 2">Administrasi</div>
                    <div v-else>Customer Service</div>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" @click="editHandler(item)">edit</v-btn>
                    <v-btn small @click="deleteHandler(item.id_pegawai)">delete</v-btn>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <v-span class="headline">{{ formTitle }} Pegawai</v-span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form v-model="valid" ref="form">
                        <v-text-field v-model="form.nama_pegawai" label="Nama Pegawai" :rules="namaRules" required dense outlined></v-text-field>
                        <v-select
                            item-text="name"
                            item-value="id"
                            v-model="defaultSelected"
                            label="Jabatan"
                            :items="role"
                            dense outlined
                            :rules="jabatanRules"
                        />
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
                            <v-date-picker
                            v-model="date"
                            no-title
                            scrollable
                            >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="menu = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn text
                                color="primary"
                                @click="$refs.menu.save(date)"
                            >
                                OK
                            </v-btn>
                            </v-date-picker>
                        </v-menu>
                        <v-select
                            v-model="genderSelected"
                            label="Gender"
                            :items="jenisKelamin"
                            dense outlined
                            :rules="genderRules"
                        />
                        <!-- <v-text-field v-model="form.gender" label="Gender" required dense outlined></v-text-field> -->
                        <v-text-field v-model="form.alamat" label="Alamat" :rules="alamatRules" required dense outlined></v-text-field>
                        <v-text-field v-model="form.nomor_telepon" label="Nomor Telepon" :rules="no_telpRules" required dense outlined></v-text-field>
                        <v-text-field v-model="form.email" label="Email" :rules="emailRules" required dense outlined></v-text-field>
                        </v-form>
                    </v-container>
                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-action>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogEdit" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <v-span class="headline">{{ formTitle }} Pegawai</v-span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form v-model="valid" ref="form">
                        <v-text-field v-model="form.nama_pegawai" label="Nama Pegawai" :rules="namaRules" required dense outlined></v-text-field>
                        <v-select
                            item-text="name"
                            item-value="id"
                            v-model="defaultSelected"
                            label="Jabatan"
                            :items="role"
                            dense outlined
                            :rules="jabatanRules"
                        />
                        <v-text-field v-model="form.alamat" label="Alamat" :rules="alamatRules" required dense outlined></v-text-field>
                        <v-text-field v-model="form.nomor_telepon" label="Nomor Telepon" :rules="no_telpRules" required dense outlined></v-text-field>
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

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning</span>
                </v-card-title>
                <v-card-text>Anda Yakin ingin menghapus Pegawai ini?</v-card-text>
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
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            dateNow: new Date().toISOString().substr(0, 10),
            cekUsia: '',
            date1: '',
            date2: '',
            load: false,
            snackbar: false,
            error_message: '',
            selected: '',
            color: '',
            search: null,
            defaultSelected: '',
            genderSelected: '',
            dialog: false,
            dialogConfirm: false,
            dialogEdit: false,
            headers: [
                { text: "ID Pegawai", align: "start", sortable: true, value: "id_pegawai"},
                { text: "Nama Pegawai", value: 'nama_pegawai'},
                { text: "Jabatan", value: 'id_role'},
                { text: "Tanggal Lahir", value: 'tanggal_lahir'},
                { text: "Gender", value: 'gender'},
                { text: "Alamat", value: 'alamat'},
                { text: "Nomor Telepon", value: 'nomor_telepon'},
                { text: "Email", value: 'email'},
                { text: "Actions", value: 'actions'},
            ],
            role: [
                {
                    name: "Manager",
                    id: "1"
                },
                {
                    name: "Administrasi",
                    id: "2"
                },
                {
                    name: "Customer Service",
                    id: "3"
                }
                ],
            jenisKelamin: ['Laki-laki','Perempuan'],
            pegawai: new FormData,
            pegawais: [],
            form: {
                nama_pegawai: null,
                id_role: null,
                alamat: null,
                nomor_telepon: null,
            },
            deleteId: '',
            editId: '',
            namaRules: [
                (v) => !!v || 'Nama Pegawai tidak boleh kosong',
            ],
            jabatanRules: [
                (v) => !!v || 'Jabatan tidak boleh kosong',
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
            emailRules: [
                (v) => !!v || 'Email tidak boleh kosong ',
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
        //Read Data Pegawai
        readData() {
            var url = this.$api + '/pegawai';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.pegawais = response.data.data;
            })
        },
        //Simpan data Pegawai
        save() {
            if(this.$refs.form.validate()) {
            this.date1 = new Date(this.date).getFullYear();
            this.date2 = new Date(this.dateNow).getFullYear();
                
            this.cekUsia = this.date2 - this.date1;

            if(this.cekUsia >= 17)
                {
                    this.pegawai.append('nama_pegawai', this.form.nama_pegawai);
                    this.pegawai.append('id_role', this.defaultSelected);
                    this.pegawai.append('tanggal_lahir', this.date);
                    this.pegawai.append('gender', this.genderSelected);
                    this.pegawai.append('alamat', this.form.alamat);
                    this.pegawai.append('nomor_telepon', this.form.nomor_telepon);
                    this.pegawai.append('email', this.form.email);

                    var url = this.$api + '/pegawai'
                    this.load = true;
                    this.$http.post(url, this.pegawai, {
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
                }else{
                    this.error_message = "Usia minimal 17 Tahun";
                    this.color = "red";
                    this.snackbar = true;
                }
            }
        },
        //Ubah data Pegawai
        update() {
            if(this.$refs.form.validate()) {
            let newData = {
                nama_pegawai : this.form.nama_pegawai,
                id_role : this.defaultSelected,
                nomor_telepon : this.form.nomor_telepon,
                alamat : this.form.alamat,
            };
            var url = this.$api + '/pegawai/' + this.editId;
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
        }},
        //Hapus data Pegawai
        deleteData() {
            //menghapus data
            var url = this.$api + '/pegawai/' + this.deleteId;
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
            this.editId = item.id_pegawai;
            this.form.nama_pegawai = item.nama_pegawai;
            this.form.id_role = item.id_role;
            this.form.nomor_telepon = item.nomor_telepon;
            this.form.alamat = item.alamat;
            this.dialogEdit = true;
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
            this.$refs.form.reset()
        },
        resetForm() {
            this.form = {
                nama_pegawai: null,
                id_role: null,
                tanggal_lahir: null,
                gender: null,
                alamat: null,
                nomor_telepon: null,
                email: null,
                genderSelected: '',
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