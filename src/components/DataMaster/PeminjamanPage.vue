<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5> Transaksi</h3>

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

                <v-btn color="success" dark @click="dialog = true"> Tambah Transaksi </v-btn>

            </v-card-title>
            <v-data-table :headers="headers" :items="transaksis" :search="search">
            <template v-slot:[`item.nama_driver`]="{ item }">
                    <div v-if="item.nama_driver === null">-</div>
                    <div v-else>{{item.nama_driver}}</div>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" @click="infoHandler(item)">Info</v-btn>
                    <v-btn small @click="pembayaranHandler(item.id_transaksi)">Pembayaran</v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <v-span class="headline">{{ formTitle }} Transaksi Penyewaan</v-span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6">
                            <v-menu
                                ref="menu1"
                                v-model="menu1"
                                :close-on-content-click="false"
                                :return-value.sync="dateMulai"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }" >
                                    <v-text-field
                                        v-model="dateMulai"
                                        label="Tanggal Mulai"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="dateMulai" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.menu1.save(dateMulai)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="12" sm="6">
                            <v-menu
                                ref="menu2"
                                v-model="menu2"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="time1"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="time1"
                                    label="Waktu Peminjaman Mulai"
                                    prepend-icon="mdi-clock-time-four-outline"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-time-picker
                                    v-model="time1"
                                    full-width
                                    format="24hr"
                                    use-seconds
                                    @click:minute="$refs.menu2.save(time1)"
                                ></v-time-picker>
                            </v-menu>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6">
                            <v-menu
                                ref="menu3"
                                v-model="menu3"
                                :close-on-content-click="false"
                                :return-value.sync="dateSelesai"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }" >
                                    <v-text-field
                                        v-model="dateSelesai"
                                        label="Tanggal Selesai"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="dateSelesai" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.menu3.save(dateSelesai)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="12" sm="6">
                            <v-menu
                                ref="menu4"
                                v-model="menu4"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="time2"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="time2"
                                    label="Waktu Peminjaman Selesai"
                                    prepend-icon="mdi-clock-time-four-outline"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-time-picker
                                    v-model="time2"
                                    full-width
                                    format="24hr"
                                    use-seconds
                                    @click:minute="$refs.menu4.save(time2)"
                                ></v-time-picker>
                            </v-menu>
                            </v-col>
                        </v-row>                       
                    </v-container>
                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="readMobil">OK</v-btn>
                    </v-card-action>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogMobil" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <v-span class="headline">Data Mobil dan Promo</v-span>
                </v-card-title>
                <v-card-text>
                    <v-container>            
                        <v-select
                            item-text="nama_mobil"
                            item-value="id_mobil"
                            v-model="selectMobil"
                            label="Mobil"
                            :items="mobil"
                            dense outlined
                        />
                        <v-select
                            item-text="nama_driver"
                            item-value="id_driver"
                            v-model="selectDriver"
                            label="Driver"
                            :items="driver"
                            dense outlined
                        />
                        <v-select
                            item-text="jenis_promo"
                            item-value="id_promo"
                            v-model="selectPromo"
                            label="Promo"
                            :items="promo"
                            dense outlined
                        />

                    </v-container>
                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="cekPromo">OK</v-btn>
                    </v-card-action>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogBayar" persistent max-width="600px">
        <v-card>
                <v-card-title>
                    <v-span class="headline">Pembayaran</v-span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                       <v-select
                            v-model="selectBayar"
                            label="Metode Pembayaran"
                            :items="metodeBayar"
                            dense outlined
                        />
                        <template>
                            <v-file-input
                                v-model="buktiBayar"
                                label="Bukti Pembayaran"
                                @change="upload"
                                outlined
                                dense
                            ></v-file-input>
                        </template>
                    </v-container>
                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="pembayaran2">OK</v-btn>
                    </v-card-action>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogInfo" persistent max-width="800px" transition="dialog-bottom-transition">
            <v-card>
                <v-card-title class="orange">
                    <v-span class="headline">Detail Transaksi</v-span>
                </v-card-title>
                <v-container fluid>
                    <v-row>
                        <v-col align="start" class="ms-6" cols="12" sm="6">  {{editId}}</v-col>
                        <v-col align="end" cols="12" sm="5">{{form.created_at}}</v-col>
                    </v-row>
                    <v-row>
                        <v-col align="start" class="ms-6" cols="12" sm="3">Nama Customer</v-col>
                        <v-col align="start" cols="12" sm="5">: {{form.nama_customer}}</v-col>
                    </v-row>
                    <v-row v-if="verifTransaksi()">
                        <v-col align="start" class="ms-6" cols="12" sm="3">Nama Pegawai</v-col>
                        <v-col align="start" cols="12" sm="5">: {{form.nama_pegawai}}</v-col>
                    </v-row>
                    <v-row>
                        <v-col align="start" class="ms-6" cols="12" sm="3">Tanggal Mulai Sewa</v-col>
                        <v-col align="start" cols="12" sm="5">: {{form.tanggal_mulai}}</v-col>
                    </v-row>
                    <v-row>
                        <v-col align="start" class="ms-6" cols="12" sm="3">Tanggal Selesai Sewa</v-col>
                        <v-col align="start" cols="12" sm="5">: {{form.tanggal_selesai}}</v-col>
                    </v-row>
                    <v-row v-if="cekBayar()">
                        <v-col align="start" class="ms-6" cols="12" sm="3">Tanggal Kembali Sewa</v-col>
                        <v-col align="start" cols="12" sm="5">: {{form.tanggal_kembali}}</v-col>
                    </v-row>
                    <v-row>
                        <v-col align="start" class="ms-6" cols="12" sm="3">Nama Mobil</v-col>
                        <v-col align="start" cols="12" sm="5">: {{form.nama_mobil}}</v-col>
                    </v-row>
                    <v-row>
                        <v-col align="start" class="ms-6" cols="12" sm="3">Harga Mobil</v-col>
                        <v-col align="start" cols="12" sm="5">: Rp. {{form.harga_sewa}},00</v-col>
                    </v-row>
                    <v-row v-if="cekNoDriver()">
                        <v-col align="start" class="ms-6" cols="12" sm="3">Nama Driver</v-col>
                        <v-col align="start" cols="12" sm="5">: {{form.nama_driver}}</v-col>
                    </v-row>
                    <v-row v-if="cekNoDriver()">
                        <v-col align="start" class="ms-6" cols="12" sm="3">Harga Driver</v-col>
                        <v-col align="start" cols="12" sm="5">: Rp. {{form.harga_driver}},00</v-col>
                    </v-row>
                    <v-row v-if="cekNoPromo()">
                        <v-col align="start" class="ms-6" cols="12" sm="3">Promo</v-col>
                        <v-col align="start" cols="12" sm="5">: {{form.kode_promo}}</v-col>
                    </v-row>
                    <v-row>
                        <v-col align="start" class="ms-6" cols="12" sm="3">Durasi Sewa</v-col>
                        <v-col align="start" cols="12" sm="5">: {{form.hari}} Hari</v-col>
                    </v-row>
                    <v-row>
                        <v-col align="start" class="ms-6" cols="12" sm="3">Status Transaksi</v-col>
                        <v-col align="start" cols="12" sm="5">: {{form.status_transaksi}}</v-col>
                    </v-row>
                    <v-row v-if="verifPembayaran()">
                        <v-col align="start" class="ms-6" cols="12" sm="3">Metode Pembayaran</v-col>
                        <v-col align="start" cols="12" sm="5">: {{form.metode_pembayaran}}</v-col>
                    </v-row>
                    <v-row v-if="cekBayar()">
                        <v-col align="start" class="ms-6" cols="12" sm="3">Denda</v-col>
                        <v-col align="start" cols="12" sm="5">: Rp. {{form.denda}},00</v-col>
                    </v-row>
                    <v-row v-if="cekBayar()">
                        <v-col align="start" class="ms-6" cols="12" sm="3">Diskon</v-col>
                        <v-col align="start" cols="12" sm="5">: Rp. {{form.diskon}},00</v-col>
                    </v-row>
                    <v-row v-if="cekBayar()">
                        <v-col align="start" class="ms-6" cols="12" sm="3">Sub Total</v-col>
                        <v-col align="start" cols="12" sm="5">: Rp. {{form.sub_total}},00</v-col>
                    </v-row>
                    <v-row v-if="cekBayar()">
                        <v-col align="start" class="ms-6" cols="12" sm="3">Total Harga</v-col>
                        <v-col align="start" cols="12" sm="5">: Rp. {{form.total_biaya}},00</v-col>
                    </v-row>                    
                </v-container>
    
                <v-card-text> </v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-3" text @click="cancel">Close</v-btn>
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
            tglMulai:'',
            dateMulai: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            dateSelesai: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            dateKembali: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            inputType: 'Tambah',
            load: false,
            snackbar: false,
            cekPromoCst: null,
            error_message: '',
            selectPromo: '',
            selectMobil: '',
            selectDriver: '',
            selectBayar: '',
            emailUser: localStorage.getItem('email'),
            menu1: false,
            menu2: false,
            menu3: false,
            menu4: false,
            time1: null,
            time2: null,
            time3: null,
            dateTimeMulai: '',
            dateTimeSelesai: '',
            dateTimeKembali: '',
            color: '',
            search: null,
            dialog: false,
            dialogMobil: false,
            dialogInfo: false,
            dialogKembali: false,
            dialogBayar:false,
            headers: [
                { text: "ID Transaksi", align: "start", sortable: true, value: "id_transaksi"},
                { text: "Tanggal Mulai", value: 'tanggal_mulai'},
                { text: "Tanggal Selesai", value: 'tanggal_selesai'},
                { text: "Nama Mobil", value: 'nama_mobil'},
                { text: "Nama Driver", value: 'nama_driver'},
                { text: "Tanggal Transaksi", value: 'created_at'},
                { text: "Status Transaksi", value: 'status_transaksi'},
                { text: "Actions", value: 'actions'},
            ],
            transaksi: new FormData,
            // transaksiPembayaran: new FormData,
            transaksis: [],
            form: {
                id_transaksi: null,
                nama_customer: null,
                nama_pegawai: null,
                tanggal_mulai: null,
                tanggal_selesai: null,
                tanggal_kembali: null,
                nama_mobil: null,
                nama_driver: null,
                created_at: null,
                status_transaksi: null,
                kode_promo: null,
                denda: null,
                diskon: null,
                sub_total: null,
                hari: null,
                harga_sewa: null,
                harga_driver: null,
                total_biaya: null,
                metode_pembayaran: null,
            },
            deleteId: '',
            editId: '',
            mobil:[],
            driver:[],
            promo:[],
            metodeBayar:['Cash','Transfer'],
            buktiBayar:'',
        };
    },
    methods: {
        upload(e){
            let files = e.target.files[0];
            this.buktiBayar = files;
        },
        setForm(){
            if(this.inputType !== 'Tambah'){
                this.update();
            }else if(this.inputType == 'Tambah'){
                this.save();
            }else{this.snackbar = true;}
        },
        readMobil(){
            this.dateTimeMulai = this.dateMulai + ' ' + this.time1;
            this.dateTimeSelesai = this.dateSelesai + ' ' + this.time2;
            var url = this.$api + '/showMobil/' + this.dateTimeMulai + '/' + this.dateTimeSelesai;
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.mobil = response.data.data;
            })

            var url2 = this.$api + '/showDriver/' + this.dateTimeMulai + '/' + this.dateTimeSelesai;
            this.$http.get(url2, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.driver = response.data.data;
            })

            this.dialog = false;
            this.dialogMobil = true;
        },
        readDriver(){
            var url = this.$api + '/showTransaksi/' + this.dateMulai;
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.transaksis = response.data.data;
            })
        },
        readPromo(){
            var url = this.$api + '/showPromo';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.promo = response.data.data;
            })
        },
        //Read Data Promo
        readData() {
            var url = this.$api + '/showByEmail/' + this.emailUser;
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.transaksis = response.data.data;
            })
        },
        cekPromo(){
            this.dateTimeMulai = this.dateMulai + ' ' + this.time1;
            this.dateTimeSelesai = this.dateSelesai + ' ' + this.time2;

            if(this.selectPromo == '')
                this.selectPromo = 0;

            var url = this.$api + '/cekPromo/' + this.dateMulai + '/' + this.dateSelesai + '/' + this.emailUser + '/' + this.selectPromo
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                    'Accept': 'application/json',
                }
            }).then(response => {
                this.cekPromoCst = response.data.data;
                this.error_message = 'Anda memenuhi ketentuan Promo';
                this.color = 'green';
                this.snackbar = true;
                this.save();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.error_message = 'Anda tidak memenuhi ketentuan Promo';
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });

        },
        //Simpan data
        save() {
            if(this.selectPromo == 0){
                this.selectPromo = '';
            }

            this.dateTimeMulai = this.dateMulai + ' ' + this.time1;
            this.dateTimeSelesai = this.dateSelesai + ' ' + this.time2;
            this.transaksi.append('tanggal_mulai', this.dateTimeMulai);
            this.transaksi.append('tanggal_selesai', this.dateTimeSelesai);
            this.transaksi.append('id_mobil', this.selectMobil);
            this.transaksi.append('id_promo', this.selectPromo);

            if(this.selectDriver == null){
                var url = this.$api + '/storeTransaksi/' + this.emailUser
                this.load = true;
                this.$http.post(url, this.transaksi, {
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
                    this.selectDriver = null;
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                    this.close();
                    this.selectDriver = null;
                });
            }else{
                this.transaksi.append('id_driver', this.selectDriver);

                var url2 = this.$api + '/storeWithDriver/' + this.emailUser
                this.load = true;
                this.$http.post(url2, this.transaksi, {
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
                    this.selectDriver = null;
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                    this.close();
                    this.selectDriver = null;
                });
            }   
        },

        pembayaran(){
            // this.dateTimeKembali = this.dateKembali + ' ' + this.time3;

            let newData = {
                metode_pembayaran : this.selectBayar,
                bukti_pembayaran : this.buktiBayar
            };

            var url = this.$api + '/uploadBuktiBayar/' + this.editId;

            this.load = true;
            this.$http.put(url, newData, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.error_message = "Berhasil Melakukan Pembayaran"
                this.snackbar = true;
                this.load = false;
                this.dialogBayar = false;
                this.close();
                this.readData(); // baca data
                this.resetForm();
            }).catch(error => {
                console.log(newData.bukti_pembayaran);
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },

        pembayaran2(){
            // this.dateTimeKembali = this.dateKembali + ' ' + this.time3;
            let transaksi2 = new FormData();

            transaksi2.append('metode_pembayaran',this.selectBayar)
            transaksi2.append('bukti_pembayaran',this.buktiBayar)

            var url = this.$api + '/uploadBuktiBayar/' + this.editId +'?_method=PUT';

            this.load = true;
            this.$http.post(url,transaksi2, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.error_message = "Berhasil Melakukan Pembayaran"
                this.snackbar = true;
                this.load = false;
                this.dialogBayar = false;
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
    
        pembayaranHandler(item){
            this.editId = item;
            this.dialogBayar = true;
        },

        infoHandler(item) {
            this.editId = item.id_transaksi;
            this.form.nama_customer = item.nama_customer;
            this.form.nama_pegawai = item.nama_pegawai;
            this.form.tanggal_mulai = item.tanggal_mulai;
            this.form.tanggal_selesai = item.tanggal_selesai;
            this.form.tanggal_kembali = item.tanggal_kembali;
            this.form.nama_mobil = item.nama_mobil;
            this.form.nama_driver = item.nama_driver;
            this.form.created_at = item.created_at;
            this.form.status_transaksi = item.status_transaksi;
            this.form.kode_promo = item.kode_promo;
            this.form.sub_total = item.sub_total;
            this.form.hari = item.hari;
            this.form.harga_sewa = item.harga_sewa;
            this.form.harga_driver = item.harga_driver;
            this.form.denda = item.denda;
            this.form.diskon = item.diskon;
            this.form.total_biaya = item.total_biaya,
            this.form.metode_pembayaran = item.metode_pembayaran,
            this.cekNoDriver();
            this.cekNoPromo();
            this.cekBayar();
            this.verifPembayaran();
            this.dialogInfo = true;
        },
        cekNoDriver(){
            if(this.form.nama_driver != null)
                return true;
            else return false;
        },
        cekNoPromo(){
            if(this.form.kode_promo != null)
                return true;
            else return false;
        },
        cekBayar(){
            if(this.form.tanggal_kembali != null)
                return true;
            else return false;
        },
        verifPembayaran(){
            if(this.form.metode_pembayaran != null)
                return true;
            else return false;
        },
        verifTransaksi(){
            if(this.form.status_transaksi != "Belum Diverifikasi")
                return true;
            else return false;
        },
        deleteHandler(id) {
            this.deleteId = id;
            this.dialogConfirm = true;
        },
        close() {
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogInfo = false;
            this.dialogMobil = false;
            this.dialogKembali = false;
            this.dateMulai = null;
            this.dateSelesai = null;
            this.dateKembali = null;
            this.selectPromo = null;
            this.selectDriver = null;
            this.selectMobil = null;
            this.selectBayar = null;
            this.buktiBayar = '';
            this.readData();
        },
        cancel() {
            this.resetForm();
            this.dialog = false;
            this.dialogEdit = false;
            this.dialogInfo = false;
            this.dialogMobil = false;
            this.dialogBayar = false;
            this.inputType = 'Tambah';
        },
        resetForm() {
            this.form = {
                id_transaksi: null,
                nama_customer: null,
                nama_pegawai: null,
                tanggal_mulai: null,
                tanggal_selesai: null,
                nama_mobil: null,
                nama_driver: null,
                created_at: null,
                status_transaksi: null,
                kode_promo: null,
                sub_total: null,
                hari: null,
                harga_sewa: null,
                harga_driver: null,
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
        this.readPromo();
        this.selectDriver = null;
    },
};
</script>