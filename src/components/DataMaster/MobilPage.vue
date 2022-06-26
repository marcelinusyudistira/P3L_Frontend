<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5> Mobil</h3>

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

                <v-btn color="success" dark @click="dialogKategori = true"> Tambah </v-btn>

            </v-card-title>
            <v-data-table dark class="headerTable" :headers="headers" :items="mobils" :search="search">
                <template v-slot:[`item.foto`]="{ item }">
                    <img v-bind:src="('https://api.atmajayarental-0378.xyz/public/images/') + item.foto" class="white--text align-end" height="80px" width="130px">
                </template>
                <template v-slot:[`item.kategori_aset`]="{ item }">
                    <div v-if="item.kategori_aset === 1">Mitra</div>
                    <div v-else>Perusahaan</div>
                </template>
                <template v-slot:[`item.actions`]="{ item }" >
                    <v-btn small class="mr-2" @click="editHandler(item)">edit</v-btn>
                    <v-btn small class="mr-2" @click="deleteHandler(item.id_mobil)">delete</v-btn>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <v-span class="headline">{{ formTitle }} Mobil</v-span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form v-model="valid" ref="form">
                        <v-text-field v-model="form.nama_mobil" label="Nama Mobil" :rules="namaRules" required dense outlined></v-text-field>
                        <v-text-field v-model="form.plat_nomor" label="Plat Nomor" :rules="platRules" required dense outlined></v-text-field>
                        <v-text-field v-model="form.tipe_mobil" label="Tipe Mobil" :rules="tipeRules" required dense outlined></v-text-field>
                        <v-text-field v-model="form.transmisi" label="Transmisi" :rules="transmisiRules" required dense outlined></v-text-field>
                        <v-text-field v-model="form.jenis_bbm" label="Jenis BBM" :rules="bbmRules" required dense outlined></v-text-field>
                        <v-text-field v-model="form.volume_bbm" label="Volume BBM" :rules="volumeRules" required dense outlined></v-text-field>
                        <v-text-field v-model="form.warna_mobil" label="Warna Mobil" :rules="warnaRules" required dense outlined></v-text-field>
                        <v-text-field v-model="form.kapasitas" label="Kapasitas" :rules="kapasitasRules" required dense outlined></v-text-field>
                        <template>
                            <v-file-input
                                v-model="photo"
                                label="Pilih Gambar"
                                @change="upload"
                                outlined
                                dense
                                :rules="fotoRules"
                            ></v-file-input>
                        </template>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="form.fasilitas" label="Fasilitas" :rules="fasilitasRules" required dense outlined></v-text-field>
                        <v-menu
                            ref="menu1"
                            v-model="menu1"
                            :close-on-content-click="false"
                            :return-value.sync="dateServis"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }" >
                                <v-text-field
                                    v-model="dateServis"
                                    label="Tanggal Servis"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    dense outlined
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="dateServis" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.menu1.save(dateServis)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                        <v-text-field v-model="form.harga_sewa" label="Harga Sewa" :rules="hargaRules" required dense outlined></v-text-field>
                        <v-text-field v-model="form.no_stnk" label="Nomor STNK" :rules="stnkRules" required dense outlined></v-text-field>
                        </v-form>
                    </v-container>
                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="setForm(0)">Save</v-btn>
                    </v-card-action>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogMitra" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <v-span class="headline">{{ formTitle }} Mobil</v-span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form v-model="valid" ref="form">
                        <v-text-field v-model="form.id_mitra" label="ID Mitra" :rules="mitraRules" required dense outlined></v-text-field>
                        <v-text-field v-model="form.nama_mobil" label="Nama Mobil" :rules="namaRules" required dense outlined></v-text-field>
                        <v-text-field v-model="form.plat_nomor" label="Plat Nomor" :rules="platRules" required dense outlined></v-text-field>
                        <v-text-field v-model="form.tipe_mobil" label="Tipe Mobil" :rules="tipeRules" required dense outlined></v-text-field>
                        <v-text-field v-model="form.transmisi" label="Transmisi" :rules="transmisiRules" required dense outlined></v-text-field>
                        <v-text-field v-model="form.jenis_bbm" label="Jenis BBM" :rules="bbmRules" required dense outlined></v-text-field>
                        <v-text-field v-model="form.volume_bbm" label="Volume BBM" :rules="volumeRules" required dense outlined></v-text-field>
                        <v-text-field v-model="form.warna_mobil" label="Warna Mobil" :rules="warnaRules" required dense outlined></v-text-field>
                        <v-text-field v-model="form.kapasitas" label="Kapasitas" :rules="kapasitasRules" required dense outlined></v-text-field>
                        <template>
                            <v-file-input
                                v-model="photo"
                                label="Pilih Gambar"
                                @change="upload"
                                outlined
                                dense
                                :rules="fotoRules"
                            ></v-file-input>
                        </template>
                        <v-text-field v-model="form.fasilitas" label="Fasilitas" :rules="fasilitasRules" required dense outlined></v-text-field>
                        <v-menu
                            ref="menu2"
                            v-model="menu2"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }" >
                                <v-text-field
                                    v-model="dateServis"
                                    label="Tanggal Servis"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    dense outlined
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="dateServis" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.menu2.save(dateServis)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                        <v-text-field v-model="form.harga_sewa" label="Harga Sewa" :rules="hargaRules" required dense outlined></v-text-field>
                        <v-text-field v-model="form.no_stnk" label="Nomor STNK" :rules="stnkRules" required dense outlined></v-text-field>
                        <v-menu
                            ref="menu3"
                            v-model="menu3"
                            :close-on-content-click="false"
                            :return-value.sync="dateKMulai"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                            v-if="this.inputType == 'Tambah'"
                        >
                            <template v-slot:activator="{ on, attrs }" >
                                <v-text-field
                                    v-model="dateKMulai"
                                    label="Kontrak Mulai"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    dense outlined
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="dateKMulai" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu3 = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.menu3.save(dateKMulai)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                        <v-menu
                            ref="menu4"
                            v-model="menu4"
                            :close-on-content-click="false"
                            :return-value.sync="dateKSelesai"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                            v-if="this.inputType == 'Tambah'"
                        >
                            <template v-slot:activator="{ on, attrs }" >
                                <v-text-field
                                    v-model="dateKSelesai"
                                    label="Kontrak Selesai"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    dense outlined
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="dateKSelesai" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu4 = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.menu4.save(dateKSelesai)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                        </v-form>
                    </v-container>
                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="setForm(1)">Save</v-btn>
                    </v-card-action>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning</span>
                </v-card-title>
                <v-card-text>Anda Yakin ingin menghapus Mobil ini?</v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogConfirm = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogKategori" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Tambah Aset</span>
                </v-card-title>
                <v-card-text>Anda ingin menambahkan Mobil dengan Kategori Apa??</v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = true">Aset Perusahaan</v-btn>
                    <v-btn color="blue darken-1" text @click="dialogMitra = true">Kontrak dengan Mitra</v-btn>
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
            dateServis: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            dateKMulai: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            dateKSelesai: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            perpanjangK: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            load: false,
            menu1: false,
            menu2: false,
            menu3: false,
            menu4: false,
            menu5: false,
            photo: '',
            dateConvertServis: null,
            dateConvertMulai: null,
            dateConvertSelesai: null,
            snackbar: false,
            error_message: '',
            selected: '',
            cekKategori: '',
            dateNow: '',
            color: '',
            kategori: null,
            search: null,
            dialog: false,
            dialogMitra: false,
            dialogKategori: false,
            dialogConfirm: false,
            headers: [
                { text: "ID Mobil", align: "start", sortable: true, value: "id_mobil"},
                { text: "ID Mitra", value: 'id_mitra'},
                { text: "Nama Mobil", value: 'nama_mobil'},
                { text: "Plat Nomor", value: 'plat_nomor'},
                { text: "Tipe Mobil", value: 'tipe_mobil'},
                { text: "Transmisi", value: 'transmisi'},
                { text: "Jenis BBM", value: 'jenis_bbm'},
                { text: "Volume BBM", value: 'volume_bbm'},
                { text: "Warna Mobil", value: 'warna_mobil'},
                { text: "Kapasitas", value: 'kapasitas'},
                { text: "Foto", value: 'foto'},
                { text: "Fasilitas", value: 'fasilitas'},
                { text: "Tanggal Servis", value: 'tanggal_servis'},
                { text: "Harga Sewa", value: 'harga_sewa'},
                { text: "Nomor STNK", value: 'no_stnk'},
                { text: "Kategori Aset", value: 'kategori_aset'},
                { text: "Kontrak Mulai", value: 'kontrak_mulai'},
                { text: "Kontrak Selesai", value: 'kontrak_selesai'},
                { text: "Actions", value: 'actions'},
            ],
            mobil: new FormData,
            mobils: [],
            form: {
                id_mobil: null,
                id_mitra: null,
                nama_mobil: null,
                plat_nomor: null,
                tipe_mobil: null,
                transmisi: null,
                jenis_bbm: null,
                volume_bbm: null,
                warna_mobil: null,
                kapasitas: null,
                foto: null,
                fasilitas: null,
                tanggal_servis: null,
                harga_sewa: null,
                no_stnk: null,
                kategori_aset: null,
                kontrak_mulai: null,
                kontrak_selesai: null,
            },
            deleteId: '',
            editId: '',
            mitraRules: [
                (v) => !!v || 'ID Mitra tidak boleh kosong',
            ],
            namaRules: [
                (v) => !!v || 'Nama Mobil tidak boleh kosong',
            ],
            platRules: [
                (v) => !!v || 'Nomor Plat tidak boleh kosong',
            ],
            tipeRules: [
                (v) => !!v || 'Tipe Mobil tidak boleh kosong',
            ],
            transmisiRules: [
                (v) => !!v || 'Jenis Transmisi tidak boleh kosong',
            ],
            bbmRules: [
                (v) => !!v || 'Jenis BBM tidak boleh kosong',
            ],
            volumeRules: [
                (v) => !!v || 'Volume BBM tidak boleh kosong',
            ],
            warnaRules: [
                (v) => !!v || 'Warna Mobil tidak boleh kosong',
            ],
            kapasitasRules: [
                (v) => !!v || 'Kapasitas tidak boleh kosong',
            ],
            fotoRules: [
                (v) => !!v || 'Data Foto tidak boleh kosong',
            ],
            fasilitasRules: [
                (v) => !!v || 'Fasilitas Mobil tidak boleh kosong',
            ],
            hargaRules: [
                (v) => !!v || 'Harga Sewa tidak boleh kosong',
            ],
            stnkRules: [
                (v) => !!v || 'Nomor STNK tidak boleh kosong',
            ],
        };
    },
    methods: {
        upload(e){
            let files = e.target.files[0];
            this.photo = files;
        },

        setForm(angka){
            this.cekKategori = angka;
            if(this.inputType !== 'Tambah'){
                this.update();
            }else if(this.inputType == 'Tambah'){
                if(this.cekKategori == 0){
                    this.saveAset0();
                }else{
                    this.saveAset1();
                }
            }else{this.snackbar = true;}
        },
        //Read Data Mobil
        readData() {
            var url = this.$api + '/mobil';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.mobils = response.data.data;
            })
        },
        //Simpan data Mobil
        saveAset0() {
            if(this.$refs.form.validate()) {
            this.mobil.append('nama_mobil', this.form.nama_mobil);
            this.mobil.append('plat_nomor', this.form.plat_nomor);
            this.mobil.append('tipe_mobil', this.form.tipe_mobil);
            this.mobil.append('transmisi', this.form.transmisi);
            this.mobil.append('jenis_bbm', this.form.jenis_bbm);
            this.mobil.append('volume_bbm', this.form.volume_bbm);
            this.mobil.append('warna_mobil', this.form.warna_mobil);
            this.mobil.append('kapasitas', this.form.kapasitas);
            this.mobil.append('foto', this.photo);
            this.mobil.append('fasilitas', this.form.fasilitas);
            this.mobil.append('tanggal_servis', this.dateServis);
            this.mobil.append('harga_sewa', this.form.harga_sewa);
            this.mobil.append('no_stnk', this.form.no_stnk);
            this.mobil.append('kategori_aset', 0);

            var url0 = this.$api + '/mobil'
            this.load = true;
            this.$http.post(url0, this.mobil, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.dialogKategori= false;
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

        saveAset1(){
            if(this.$refs.form.validate()) {
            this.mobil.append('id_mitra', this.form.id_mitra);
            this.mobil.append('nama_mobil', this.form.nama_mobil);
            this.mobil.append('plat_nomor', this.form.plat_nomor);
            this.mobil.append('tipe_mobil', this.form.tipe_mobil);
            this.mobil.append('transmisi', this.form.transmisi);
            this.mobil.append('jenis_bbm', this.form.jenis_bbm);
            this.mobil.append('volume_bbm', this.form.volume_bbm);
            this.mobil.append('warna_mobil', this.form.warna_mobil);
            this.mobil.append('kapasitas', this.form.kapasitas);
            this.mobil.append('foto', this.photo);
            this.mobil.append('fasilitas', this.form.fasilitas);
            this.mobil.append('tanggal_servis', this.dateServis);
            this.mobil.append('harga_sewa', this.form.harga_sewa);
            this.mobil.append('no_stnk', this.form.no_stnk);
            this.mobil.append('kategori_aset', 1);
            this.mobil.append('kontrak_mulai', this.dateKMulai);
            this.mobil.append('kontrak_selesai', this.dateKSelesai);

            var url1 = this.$api + '/mobil'
            this.load = true;
            this.$http.post(url1, this.mobil, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.dialogKategori= false;
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
        //Ubah data Mobil
        update() {
            if(this.form.kategori_aset == 0){
                if(this.$refs.form.validate()) {
                let newData = {
                    id_mitra : null,
                    nama_mobil : this.form.nama_mobil,
                    plat_nomor : this.form.plat_nomor,
                    tipe_mobil : this.form.tipe_mobil,
                    transmisi : this.form.transmisi,
                    jenis_bbm : this.form.jenis_bbm,
                    volume_bbm : this.form.volume_bbm,
                    warna_mobil : this.form.warna_mobil,
                    kapasitas : this.form.kapasitas,
                    fasilitas : this.form.fasilitas,
                    foto :this.photo,
                    tanggal_servis : this.dateServis,
                    harga_sewa : this.form.harga_sewa,
                    no_stnk : this.form.no_stnk,
                    kategori_aset : this.form.kategori_aset,
                    // kontrak_mulai : null,
                    // kontrak_selesai : null,
                };

                var url0 = this.$api + '/mobil/' + this.editId;
                this.load = true;
                this.$http.put(url0, newData, {
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
            }}else{
                if(this.$refs.form.validate()) {
                let newData = {
                    id_mitra : this.form.id_mitra,
                    nama_mobil : this.form.nama_mobil,
                    plat_nomor : this.form.plat_nomor,
                    tipe_mobil : this.form.tipe_mobil,
                    transmisi : this.form.transmisi,
                    jenis_bbm : this.form.jenis_bbm,
                    volume_bbm : this.form.volume_bbm,
                    warna_mobil : this.form.warna_mobil,
                    kapasitas : this.form.kapasitas,
                    foto : this.form.foto,
                    fasilitas : this.form.fasilitas,
                    tanggal_servis : this.dateServis,
                    harga_sewa : this.form.harga_sewa,
                    no_stnk : this.form.no_stnk,
                    kategori_aset : this.form.kategori_aset,
                    // kontrak_mulai : this.dateKMulai,
                    // kontrak_selesai : this.dateKSelesai,
                };
                var url1 = this.$api + '/mobil/' + this.editId;
                this.load = true;
                this.$http.put(url1, newData, {
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
            }}
        },
        //Hapus data Mobil
        deleteData() {
            //menghapus data
            var url = this.$api + '/mobil/' + this.deleteId;
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
            this.dateNow = new Date();

            this.editId = item.id_mobil;
            this.form.id_mitra = item.id_mitra;
            this.form.nama_mobil = item.nama_mobil;
            this.form.plat_nomor = item.plat_nomor;
            this.form.tipe_mobil = item.tipe_mobil;
            this.form.transmisi = item.transmisi;
            this.form.jenis_bbm = item.jenis_bbm;
            this.form.volume_bbm = item.volume_bbm;
            this.form.warna_mobil = item.warna_mobil;
            this.form.kapasitas = item.kapasitas;
            this.photo = item.foto;
            this.form.fasilitas = item.fasilitas;
            this.dateServis = item.tanggal_servis
            this.form.harga_sewa = item.harga_sewa;
            this.form.no_stnk = item.no_stnk;
            this.form.kategori_aset = item.kategori_aset;
            // this.form.kontrak_mulai = this.dateNow;
            // this.form.kontrak_selesai = this.dateNow;
            
            if(item.kategori_aset == 0){
                this.dialog = true;  
            }else{
                this.dialogMitra = true;
            }
        },
        deleteHandler(id) {
            this.deleteId = id;
            this.dialogConfirm = true;
        },
        close() {
            this.dialog = false;
            this.dialogMitra = false;
            this.inputType = 'Tambah';
            this.dialogConfirm = false;
            this.readData();
            this.dateServis = null;
            this.dateKMulai = null;
            this.dateKSelesai = null;
        },
        cancel() {
            this.dialog = false;
            this.dialogEdit = false;
            this.dialogConfirm = false;
            this.dialogKategori = false;
            this.dialogMitra = false;
            this.dialogKontrak = false;
            this.inputType = 'Tambah';
            this.$refs.form.reset()
            this.resetForm();
        },
        resetForm() {
            this.form = {
                id_mitra : null,
                nama_mobil : null,
                plat_nomor : null,
                tipe_mobil : null,
                transmisi : null,
                jenis_bbm : null,
                volume_bbm : null,
                warna_mobil : null,
                kapasitas : null,
                foto : null,
                fasilitas : null,
                tanggal_servis : null,
                harga_sewa : null,
                kategori_aset : null,
                kontrak_mulai : null,
                kontrak_selesai : null,
                dateServis : null,
                dateKMulai : null,
                dateKSelesai : null,
                perpanjangK : null
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