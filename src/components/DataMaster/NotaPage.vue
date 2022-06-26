<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5>Transaksi</h3>

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
                    <div v-if="item.nama_driver === null">Tanpa Driver</div>
                    <div v-else>{{item.nama_driver}}</div>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" @click="cetakHandler(item)">Generate Nota</v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Generate Nota</span>
                </v-card-title>
                <v-card-text>Anda Yakin untuk mengenerate Nota Transaksi ini?</v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogConfirm = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="generatePDF">OK</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </v-main>
</template>

<script>
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default {
    name: "ListData",
    data() {
        return {
            inputType: 'Tambah',
            load: false,
            snackbar: false,
            error_message: '',
            emailUser: localStorage.getItem('email'),
            color: '',
            search: null,
            dialogConfirm:false,
            subtotalDrv: null,
            subtotalMbl: null,
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
            transaksis: [
                // {
                //     id_transaksi: 'TRN123',
                //     nama_customer: 'Cahya',
                //     nama_pegawai: 'Riko',
                //     tanggal_mulai: '2001-05-18 12:12:12',
                //     tanggal_selesai: '2001-05-18 12:12:12',
                //     tanggal_kembali: '2001-05-18 12:12:12',
                //     nama_mobil: 'Avanza',
                //     nama_driver: null,
                //     created_at: '2001-05-01 12:12:12',
                //     status_transaksi: 'Selesai',
                //     kode_promo: 'PLI',
                //     denda: 0,
                //     diskon: 20000,
                //     sub_total: 500000,
                //     hari: 3,
                //     harga_sewa: 240000,
                //     harga_driver: null,
                //     total_biaya: 50000,
                // },
                // {
                //     id_transaksi: 'TRN124',
                //     nama_customer: 'Mil',
                //     nama_pegawai: 'Sul',
                //     tanggal_mulai: '2001-05-18 12:12:12',
                //     tanggal_selesai: '2001-05-18 12:12:12',
                //     tanggal_kembali: '2001-05-18 12:12:12',
                //     nama_mobil: 'Xenia',
                //     nama_driver: 'Jono',
                //     created_at: '2001-05-01 12:12:12',
                //     status_transaksi: 'Selesai',
                //     kode_promo: 'JKT',
                //     denda: 10000,
                //     diskon: 50000,
                //     sub_total: 750000,
                //     hari: 2,
                //     harga_sewa: 240000,
                //     harga_driver: 10000,
                //     total_biaya: 50000,
                // },
                // {
                //     id_transaksi: 'TRN125',
                //     nama_customer: 'Petra',
                //     nama_pegawai: 'Lopi',
                //     tanggal_mulai: '2001-05-18 12:12:12',
                //     tanggal_selesai: '2001-05-18 12:12:12',
                //     tanggal_kembali: '2001-05-18 12:12:12',
                //     nama_mobil: 'Avanza',
                //     nama_driver: 'Jono',
                //     created_at: '2001-05-01 12:12:12',
                //     status_transaksi: 'Selesai',
                //     kode_promo: 'MHS',
                //     denda: 0,
                //     diskon: 20000,
                //     sub_total: 500000,
                //     hari: 3,
                //     harga_sewa: 240000,
                //     harga_driver: null,
                //     total_biaya: 50000,
                // },
            ],
            
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
            moreText: [
                "This is another few sentences of text to look at it.",
                "Just testing the paragraphs to see how they format.",
                "jsPDF likes arrays for sentences.",
                "Do paragraphs wrap properly?",
                "Yes, they do!",
                "What does it look like?",
                "Not bad at all."
            ],
            heading: "Sample PDF Generator",
            cek: null,
        };
    },
    methods: {
        //Read Data
        readData() {
            var url = this.$api + '/showTransaksi/' + this.emailUser;
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.transaksis = response.data.data;
            })
        },
        cetakHandler(item) {
            this.editId = item.id_transaksi;
            this.form.id_transaksi = item.id_transaksi;
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
            this.dialogConfirm = true;
        },
        generatePDF() {
            const doc = new jsPDF({
                orientation: "portrait",
                unit: "in",
                format: "letter"
            });

            // baris 1
            doc.setLineWidth(0.01).line(0.5, 0.5, 8.0, 0.5);
            doc.setFontSize(14).setFont(undefined,'bold').text('Atma Rental', 3.7, 0.7).setFont(undefined,'normal');

            // baris 2
            doc.setFontSize(12).text(this.form.id_transaksi, 0.7, 0.9);
            doc.setFontSize(12).text(this.form.created_at, 6.2, 0.9);
            doc.setLineWidth(0.01).line(0.5, 1, 8.0, 1);

            //baris 3
            doc.setFontSize(12).text('Cust', 0.7, 1.2);
            doc.setFontSize(12).text(this.form.nama_customer, 2.5, 1.2);
            doc.setFontSize(12).text('PRO:', 4.5, 1.2);
            if(this.form.kode_promo != null){
                doc.setFontSize(12).text(this.form.kode_promo, 6.2, 1.2);
            }else{
                doc.setFontSize(12).text('-', 6.2, 1.2);
            }

            //baris vertical
            doc.line(0.5, 0.5, 0.5, 5.7);
            doc.line(8, 0.5, 8, 5.7);

            //baris 4
            doc.setFontSize(12).text('CS', 0.7, 1.4);
            doc.setFontSize(12).text(this.form.nama_pegawai, 2.5, 1.4);

            //baris 4
            if(this.form.nama_driver != null){
                doc.setFontSize(12).text('DRV', 0.7, 1.6);
                doc.setFontSize(12).text(this.form.nama_driver, 2.5, 1.6);
                doc.setLineWidth(0.01).line(0.5, 1.7, 8.0, 1.7);
            }else{
                doc.setFontSize(12).text('DRV', 0.7, 1.6);
                doc.setFontSize(12).text('-', 2.5, 1.6);
                doc.setLineWidth(0.01).line(0.5, 1.7, 8.0, 1.7);
            }
            
            //selingan
            doc.setLineWidth(0.01).line(0.5, 1.9, 2.5, 1.7);
            doc.setLineWidth(0.01).line(2.5, 1.9, 4.5, 1.7);
            doc.setLineWidth(0.01).line(4.5, 1.9, 6.2, 1.7);
            doc.setLineWidth(0.01).line(6.2, 1.9, 8.0, 1.7);
            doc.setLineWidth(0.01).line(0.5, 1.9, 8.0, 1.9);

            //baris 5
            doc.setFontSize(14).setFont(undefined,'bold').text('Nota Transaksi', 3.65, 2.1).setFont(undefined,'normal');
            doc.setLineWidth(0.01).line(0.5, 2.2, 8.0, 2.2);
            
            //baris 6
            doc.setFontSize(12).text('Tgl Mulai', 0.7, 2.4);
            doc.setFontSize(12).text(this.form.tanggal_mulai, 2.5, 2.4);
            doc.setLineWidth(0.01).line(0.5, 2.5, 8.0, 2.5);

            doc.setFontSize(12).text('Tgl Selesai', 0.7, 2.7);
            doc.setFontSize(12).text(this.form.tanggal_selesai, 2.5, 2.7);
            doc.setLineWidth(0.01).line(0.5, 2.8, 8.0, 2.8);

            doc.setFontSize(12).text('Tgl Pengembalian', 0.7, 3);
            doc.setFontSize(12).text(this.form.tanggal_kembali, 2.5, 3);
            doc.setLineWidth(0.01).line(0.5, 3.1, 8.0, 3.1);

            //baris 7
            doc.setFontSize(12).setFont(undefined,'bold').text('Item', 0.7, 3.3).setFont(undefined,'normal');
            doc.setFontSize(12).setFont(undefined,'bold').text('Satuan', 2.5, 3.3).setFont(undefined,'normal');
            doc.setFontSize(12).setFont(undefined,'bold').text('Durasi', 4.5, 3.3).setFont(undefined,'normal');
            doc.setFontSize(12).setFont(undefined,'bold').text('Sub total', 6.2, 3.3).setFont(undefined,'normal');
            doc.setLineWidth(0.01).line(0.5, 3.4, 8.0, 3.4);

            //baris 8
            this.subtotalMbl = this.form.hari * this.form.harga_sewa;
            doc.setFontSize(12).text(this.form.nama_mobil, 0.7, 3.6);
            doc.setFontSize(12).text('Rp. '+this.form.harga_sewa, 2.5, 3.6);
            doc.setFontSize(12).text(this.form.hari +' Hari', 4.5, 3.6);
            doc.setFontSize(12).text('Rp. '+this.subtotalMbl, 6.2, 3.6);
            doc.setLineWidth(0.01).line(0.5, 3.7, 8.0, 3.7);

            //baris 9
            if(this.form.nama_driver != null){
                this.subtotalDrv = this.form.hari * this.form.harga_driver;
                doc.setFontSize(12).text('Driver '+this.form.nama_driver, 0.7, 3.9);
                doc.setFontSize(12).text('Rp. '+this.form.harga_driver, 2.5, 3.9);
                doc.setFontSize(12).text(this.form.hari +' Hari', 4.5, 3.9);
                doc.setFontSize(12).text('Rp. '+this.subtotalDrv, 6.2, 3.9);
                doc.setLineWidth(0.01).line(0.5, 4, 8.0, 4);
            }else{
                doc.setFontSize(12).text('Driver -', 0.7, 3.9);
                doc.setFontSize(12).text('-', 2.5, 3.9);
                doc.setFontSize(12).text('Rp. -', 4.5, 3.9);
                doc.setFontSize(12).text('Rp. -', 6.2, 3.9);
                doc.setLineWidth(0.01).line(0.5, 4, 8.0, 4);
            }

            //baris 10
            doc.setFontSize(12).setFont(undefined,'bold').text('Rp. '+this.form.sub_total, 6.2, 4.2).setFont(undefined,'normal');
            doc.setLineWidth(0.01).line(0.5, 4.3, 8.0, 4.3);

            //selingan
            doc.setLineWidth(0.01).line(0.5, 4.5, 2.5, 4.3);
            doc.setLineWidth(0.01).line(2.5, 4.5, 4.5, 4.3);
            doc.setLineWidth(0.01).line(4.5, 4.5, 6.2, 4.3);
            doc.setLineWidth(0.01).line(6.2, 4.5, 8.0, 4.3);
            doc.setLineWidth(0.01).line(0.5, 4.5, 8.0, 4.5);

            //baris 11
            doc.setFontSize(12).text('Cust', 0.7, 4.7);
            doc.setFontSize(12).text('CS', 2.5, 4.7);
            doc.setFontSize(12).text('Disc', 4.5, 4.7);
            doc.setFontSize(12).text('Rp. '+this.form.diskon, 6.2, 4.7);
            doc.setLineWidth(0.01).line(4.5, 4.8, 8.0, 4.8);

            if(this.form.denda != null){
                doc.setFontSize(12).text('Denda', 4.5, 5);
                doc.setFontSize(12).text('Rp. '+this.form.denda, 6.2, 5);
                doc.setLineWidth(0.01).line(4.5, 5.1, 8.0, 5.1);
            }else{
                doc.setFontSize(12).text('Denda', 4.5, 5);
                doc.setFontSize(12).text('Rp. -', 6.2, 5);
                doc.setLineWidth(0.01).line(4.5, 5.1, 8.0, 5.1);
            }

            doc.setFontSize(12).text('Total', 4.5, 5.3);
            doc.setFontSize(12).setFont(undefined,'bold').text('Rp. '+this.form.total_biaya, 6.2, 5.3).setFont(undefined,'normal');
            doc.setLineWidth(0.01).line(4.5, 5.4, 8.0, 5.4);

            doc.setFontSize(12).text(this.form.nama_customer, 0.7, 5.6);
            doc.setFontSize(12).text(this.form.nama_pegawai, 2.5, 5.6);
            doc.setLineWidth(0.01).line(0.5, 5.7, 8.0, 5.7);
            doc.save(`${this.form.id_transaksi}.pdf`);
            
            this.dialogConfirm = false;
            this.error_message = 'Berhasil Men-generate Nota';
            this.color = 'green';
            this.snackbar = true;
            this.resetForm();
        },
        close() {
            this.dialogConfirm = false;
            this.readData();
        },
        resetForm() {
            this.subtotalDrv = null,
            this.subtotalMbl = null,
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
                diskon: null,
                tanggal_kembali: null,
                denda: null,
                total_biaya: null,

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