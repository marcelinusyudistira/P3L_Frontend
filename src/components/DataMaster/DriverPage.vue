<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5> Driver</h3>

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
            <v-data-table dark :headers="headers" :items="drivers" :search="search" class="headerTable">
                <template v-slot:[`item.foto`]="{ item }">
                    <img v-bind:src="('http://127.0.0.1:8000/images/') + item.foto" class="white--text align-end" height="80px" width="130px">
                </template>
                <template v-slot:[`item.status_driver`]="{ item }">
                    <div v-if="item.status_driver === 1">Available</div>
                    <div v-else>Unavailable</div>
                </template>
                <template v-slot:[`item.bahasa`]="{ item }">
                    <div v-if="item.bahasa === 1">Inggris/Indonesia</div>
                    <div v-else>Indonesia</div>
                </template>
                <!-- <template v-slot:[`item.sim_driver`]="{ item }">
                    <img v-bind:src="('http://127.0.0.1:8000/images/') + item.sim_driver" class="white--text align-end" height="80px" width="130px">
                </template>
                <template v-slot:[`item.surat_bebas_napza`]="{ item }">
                    <img v-bind:src="('http://127.0.0.1:8000/images/') + item.surat_bebas_napza" class="white--text align-end" height="80px" width="130px">
                </template>
                <template v-slot:[`item.surat_kesehatan_jasmani`]="{ item }">
                    <img v-bind:src="('http://127.0.0.1:8000/images/') + item.surat_kesehatan_jasmani" class="white--text align-end" height="80px" width="130px">
                </template>
                <template v-slot:[`item.surat_kesehatan_jiwa`]="{ item }">
                    <img v-bind:src="('http://127.0.0.1:8000/images/') + item.surat_kesehatan_jiwa" class="white--text align-end" height="80px" width="130px">
                </template>
                <template v-slot:[`item.skck`]="{ item }">
                    <img v-bind:src="('http://127.0.0.1:8000/images/') + item.skck" class="white--text align-end" height="80px" width="130px">
                </template> -->
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" @click="editHandler(item)">edit</v-btn>
                    <v-btn small @click="deleteHandler(item.id_driver)">delete</v-btn>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <v-span class="headline">{{ formTitle }} Driver</v-span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field v-model="form.nama_driver" label="Nama Driver" required dense outlined></v-text-field>
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
                        <v-text-field v-model="form.gender" label="Gender" required dense outlined></v-text-field>
                        <v-text-field v-model="form.alamat" label="Alamat" required dense outlined></v-text-field>
                        <v-text-field v-model="form.nomor_telepon" label="Nomor Telepon" required dense outlined></v-text-field>
                        <v-text-field v-model="form.email" label="Email" required dense outlined></v-text-field>
                        <template>
                            <v-file-input
                                v-model="photo"
                                label="Pilih Gambar"
                                @change="upload"
                                outlined
                                dense
                            ></v-file-input>
                        </template>
                        <v-text-field v-model="form.harga_driver" label="Harga" required dense outlined></v-text-field>
                        <v-select
                            item-text="name"
                            item-value="id"
                            v-model="selectStatus"
                            label="Status Driver"
                            :items="statusDrv"
                            dense outlined
                        />
                        <v-select
                            item-text="name"
                            item-value="id"
                            v-model="selectBahasa"
                            label="Kemampuan Bahasa"
                            :items="bahasaDrv"
                            dense outlined
                        />
                        <v-text-field v-model="form.rerata_rating" label="Rerata Rating" required dense outlined></v-text-field>
                        <template>
                            <v-file-input
                                v-model="sim"
                                label="SIM"
                                @change="uploadSim"
                                outlined
                                dense
                            ></v-file-input>
                        </template>
                        <template>
                            <v-file-input
                                v-model="sbn"
                                label="Surat Bebas Napza"
                                @change="uploadSbn"
                                outlined
                                dense
                            ></v-file-input>
                        </template>
                        <template>
                            <v-file-input
                                v-model="skji"
                                label="Surat Kesehatan Jiwa"
                                @change="uploadSkji"
                                outlined
                                dense
                            ></v-file-input>
                        </template>
                        <template>
                            <v-file-input
                                v-model="skja"
                                label="Surat Kesehatan Jasmani"
                                @change="uploadSkja"
                                outlined
                                dense
                            ></v-file-input>
                        </template>
                        <template>
                            <v-file-input
                                v-model="skck"
                                label="SKCK"
                                @change="uploadSkck"
                                outlined
                                dense
                            ></v-file-input>
                        </template>
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
                    <v-span class="headline">{{ formTitle }} Driver</v-span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field v-model="form.nama_driver" label="Nama Driver" required dense outlined></v-text-field>
                        <v-text-field v-model="form.gender" label="Gender" required dense outlined></v-text-field>
                        <v-text-field v-model="form.alamat" label="Alamat" required dense outlined></v-text-field>
                        <v-text-field v-model="form.nomor_telepon" label="Nomor Telepon" required dense outlined></v-text-field>
                        <v-text-field v-model="form.harga_driver" label="Harga" required dense outlined></v-text-field>
                        <v-select
                            item-text="name"
                            item-value="id"
                            v-model="selectStatus"
                            label="Status Driver"
                            :items="statusDrv"
                            dense outlined
                        />
                        <v-select
                            item-text="name"
                            item-value="id"
                            v-model="selectBahasa"
                            label="Kemampuan Bahasa"
                            :items="bahasaDrv"
                            dense outlined
                        />
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
                <v-card-text>Anda Yakin ingin menghapus Driver ini?</v-card-text>
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
            photo: '',
            sim: '',
            sbn: '',
            skji: '',
            skja: '',
            skck: '',
            menu: '',
            load: false,
            snackbar: false,
            error_message: '',
            selected: '',
            color: '',
            search: null,
            selectStatus: '',
            selectBahasa: '',
            dialog: false,
            dialogConfirm: false,
            dialogEdit: false,
            headers: [
                { text: "ID Driver", align: "start", sortable: true, value: "id_driver"},
                { text: "Nama Driver", value: 'nama_driver'},
                { text: "Tanggal Lahir", value: 'tanggal_lahir'},
                { text: "Gender", value: 'gender'},
                { text: "Alamat", value: 'alamat'},
                { text: "Nomor Telepon", value: 'nomor_telepon'},
                { text: "Email", value: 'email'},
                { text: "Foto", value: 'foto'},
                { text: "Harga", value: 'harga_driver'},
                { text: "Status", value: 'status_driver'},
                { text: "Bahasa", value: 'bahasa'},
                { text: "Rerata Rating", value: 'rerata_rating'},
                { text: "SIM", value: 'sim_driver'},
                { text: "Surat Bebas Napza", value: 'surat_bebas_napza'},
                { text: "Surat Keterangan Jiwa", value: 'surat_kesehatan_jiwa'},
                { text: "Surat Keterangan Jasmani", value: 'surat_kesehatan_jasmani'},
                { text: "SKCK", value: 'skck'},
                { text: "Actions", value: 'actions'},
            ],
            statusDrv: [
                {
                    name: "Available",
                    id: "1"
                },
                {
                    name: "Unavailable",
                    id: "0"
                }
            ],
            bahasaDrv: [
                {
                    name: "Inggris/Indonesia",
                    id: "1"
                },
                {
                    name: "Indonesia",
                    id: "0"
                }
            ],
            driver: new FormData,
            drivers: [],
            form: {
                nama_driver: null,
                tanggal_lahir: null,
                gender: null,
                alamat: null,
                nomor_telepon: null,
                email: null,
                foto: null,
                harga_driver: null,
                status_driver: null,
                bahasa: null,
                rerata_rating: null,
                sim_driver: null,
                surat_bebas_napza: null,
                surat_kesehatan_jiwa: null,
                surat_kesehatan_jasmani: null,
                skck: null,
            },
            deleteId: '',
            editId: ''
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
        uploadSbn(e){
            let files = e.target.files[0];
            this.sbn = files;
        },
        uploadSkji(e){
            let files = e.target.files[0];
            this.skji = files;
        },
        uploadSkja(e){
            let files = e.target.files[0];
            this.skja = files;
        },
        uploadSkck(e){
            let files = e.target.files[0];
            this.skck = files;
        },
        setForm(){
            if(this.inputType !== 'Tambah'){
                this.update();
            }else if(this.inputType == 'Tambah'){
                this.save();
            }else{this.snackbar = true;}
        },
        //Read Data Driver
        readData() {
            var url = this.$api + '/driver';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.drivers = response.data.data;
            })
        },
        //Simpan data Drievr
        save() {
            this.date1 = new Date(this.date).getFullYear();
            this.date2 = new Date(this.dateNow).getFullYear();
                
            this.cekUsia = this.date2 - this.date1;

            if(this.cekUsia >= 17)
                {
                    this.driver.append('nama_driver', this.form.nama_driver);
                    this.driver.append('tanggal_lahir', this.date);
                    this.driver.append('gender', this.form.gender);
                    this.driver.append('alamat', this.form.alamat);
                    this.driver.append('nomor_telepon', this.form.nomor_telepon);
                    this.driver.append('foto', this.photo);
                    this.driver.append('email', this.form.email);
                    this.driver.append('harga_driver', this.form.harga_driver);
                    this.driver.append('status_driver', this.selectStatus);
                    this.driver.append('bahasa', this.selectBahasa);
                    this.driver.append('rerata_rating', this.form.rerata_rating);
                    this.driver.append('sim_driver', this.sim);
                    this.driver.append('surat_bebas_napza', this.sbn);
                    this.driver.append('surat_kesehatan_jiwa', this.skji);
                    this.driver.append('surat_kesehatan_jasmani', this.skja);
                    this.driver.append('skck', this.skck);

                    var url = this.$api + '/driver'
                    this.load = true;
                    this.$http.post(url, this.driver, {
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
        },
        //Ubah data Driver
        update() {
            let newData = {
                nama_driver : this.form.nama_driver,
                gender : this.form.gender,
                alamat : this.form.alamat,
                nomor_telepon : this.form.nomor_telepon,
                status_driver : this.selectStatus,
                bahasa : this.selectBahasa,
                harga_driver : this.form.harga_driver,
                rerata_rating : this.form.rerata_rating,
                
            };
            var url = this.$api + '/driver/' + this.editId;
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
        //Hapus data Driver
        deleteData() {
            //menghapus data
            var url = this.$api + '/driver/' + this.deleteId;
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
            this.editId = item.id_driver;
            this.form.nama_driver = item.nama_driver;
            this.form.gender = item.gender;
            this.form.nomor_telepon = item.nomor_telepon;
            this.form.alamat = item.alamat;
            this.form.status = item.status;
            this.form.bahasa = item.bahasa;
            this.form.harga_driver = item.harga_driver;
            this.form.rerata_rating = item.rerata_rating;
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
        },
        resetForm() {
            this.form = {
                nama_pegawai: null,
                tanggal_lahir: null,
                gender: null,
                alamat: null,
                nomor_telepon: null,
                email: null,
                selectStatus: '',
                selectBahasa: '',
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

<style>
.headerTable {
    white-space: nowrap;
}
</style>