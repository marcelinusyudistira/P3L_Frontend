<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5> Transaksi </h3>

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

            </v-card-title>
            <v-data-table :headers="headers" :items="transaksis" :search="search">
            <template v-slot:[`item.nama_driver`]="{ item }">
                    <div v-if="item.nama_driver === null">-</div>
                    <div v-else>{{item.nama_driver}}</div>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2 mt-2" @click="infoHandler(item)">Detail</v-btn>
                    <v-btn small class="mr-2 mt-2" @click="deleteHandler(item.id_transaksi)">delete</v-btn>
                    <v-btn small class="mr-2 mt-2" @click="verifSewaHandler(item.id_transaksi)">Verif Penyewaan</v-btn>
                    <v-btn small class="mr-2 mt-2" @click="verifBayarHandler(item.id_transaksi)">Verif Pembayaran</v-btn>
                    <v-btn small @click="pembayaranHandler(item.id_transaksi)">Input Tanggal Kembali</v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialogKembali" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <v-span class="headline">Masukkan Tanggal Pengembalian</v-span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6">
                            <v-menu
                                ref="menu5"
                                v-model="menu5"
                                :close-on-content-click="false"
                                :return-value.sync="dateKembali"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }" >
                                    <v-text-field
                                        v-model="dateKembali"
                                        label="Tanggal Kembali"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="dateKembali" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu5 = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.menu5.save(dateKembali)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="12" sm="6">
                            <v-menu
                                ref="menu6"
                                v-model="menu6"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="time3"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="time3"
                                    label="Waktu Kembali"
                                    prepend-icon="mdi-clock-time-four-outline"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-time-picker
                                    v-model="time3"
                                    full-width
                                    format="24hr"
                                    use-seconds
                                    @click:minute="$refs.menu6.save(time3)"
                                ></v-time-picker>
                            </v-menu>
                            </v-col>
                        </v-row>                       
                    </v-container>
                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="pembayaran">OK</v-btn>
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
                    <v-row v-if="verifTransaksiCek()">
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

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning</span>
                </v-card-title>
                <v-card-text>Anda Yakin ingin menghapus Transaksi ini?</v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogConfirm = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogVerifSewa" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning</span>
                </v-card-title>
                <v-card-text>Anda Yakin ingin Memverifikasi Transaksi ini?</v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogVerifSewa = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="verifSewa">Verif</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogVerifBayar" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning</span>
                </v-card-title>
                <v-card-text>Anda Yakin ingin Memverifikasi Transaksi ini?</v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogVerifBayar = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="verifBayar">Verif</v-btn>
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
            dateKembali: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            inputType: 'Tambah',
            load: false,
            snackbar: false,
            error_message: '',
            emailUser: localStorage.getItem('email'),
            menu5: false,
            menu6: false,
            time3: null,
            dateTimeKembali: '',
            color: '',
            search: null,
            dialog: false,
            dialogKembali: false,
            dialogConfirm: false,
            dialogVerifSewa: false,
            dialogVerifBayar: false,
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
            verifId: '',
            mobil:[],
            driver:[],
            promo:[]
        };
    },
    methods: {
        //Read Data Promo
        readData() {
            var url = this.$api + '/showTransaksi/';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.transaksis = response.data.data;
            })
        },
        //Simpan data Promo
        pembayaran(){
            this.dateTimeKembali = this.dateKembali + ' ' + this.time3;

            let newData = {
                tanggal_kembali : this.dateTimeKembali
            };

            var url = this.$api + '/updateTransaksi/' + this.editId;

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
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        verifSewa(){
            var url = this.$api + '/verifikasiPenyewaan/' + this.verifId;
            this.load = true;
            this.$http.put(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.error_message = 'Berhasil Memverifikasi Data Penyewaan';
                this.color = "green";
                this.snackbar = true;
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
        verifBayar(){
            var url = this.$api + '/verifikasiPembayaran/' + this.verifId;
            this.load = true;
            this.$http.put(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.error_message = 'Berhasil Memverifikasi Data Pembayaran';
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
        },
        pembayaranHandler(item){
            this.editId = item;
            this.dialogKembali = true;
        },
        //Hapus data Promo
        deleteData() {
            //menghapus data
            var url = this.$api + '/deleteTransaksi/' + this.deleteId;
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
        deleteHandler(id) {
            this.deleteId = id;
            this.dialogConfirm = true;
        },
        verifSewaHandler(id) {
            this.verifId = id;
            this.dialogVerifSewa = true;
        },
        verifBayarHandler(id) {
            this.verifId = id;
            this.dialogVerifBayar = true;
        },
        verifTransaksiCek(){
            if(this.form.status_transaksi != "Belum Diverifikasi")
                return true;
            else return false;
        },
        close() {
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogInfo = false;
            this.dialogKembali = false;
            this.dateMulai = null;
            this.dateSelesai = null;
            this.dateKembali = null;
            this.dialogConfirm = false;
            this.dialogVerifSewa = false;
            this.dialogVerifBayar = false;
            this.deleteId = null;
            this.readData();
        },
        cancel() {
            this.resetForm();
            this.dialog = false;
            this.dialogInfo = false;
            this.dialogKembali = false;
            this.dialogConfirm = false;
            this.dialogVerifSewa = false;
            this.dialogVerifBayar = false;
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
    },
};
</script>