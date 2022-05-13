<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5> Daftar Dedline Kontrak </h3>

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
            <v-data-table dark :headers="headers" :items="mobils" :search="search" class="headerTable" >
                <template v-slot:[`item.foto`]="{ item }">
                    <img v-bind:src="('http://127.0.0.1:8000/images/') + item.foto" class="white--text align-end" height="80px" width="130px">
                </template>
                <template v-slot:[`item.kategori_aset`]="{ item }">
                    <div v-if="item.kategori_aset === 1">Mitra</div>
                    <div v-else>Perusahaan</div>
                </template>
                <template v-slot:[`item.actions`]="{ item }" >
                    <v-btn small @click="perpanjangK(item)" v-if="item.kategori_aset == 1">Perpanjang Kontrak</v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialogKontrak" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <v-span class="headline">{{ formTitle }} Perpanjang Kontrak</v-span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="datePerpanjang"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }" >
                                <v-text-field
                                    v-model="datePerpanjang"
                                    label="Kontrak Selesai"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    dense outlined
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="datePerpanjang" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.menu.save(datePerpanjang)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-container>
                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="saveKontrak">Save</v-btn>
                    </v-card-action>
                </v-card-text>
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
            snackbar: false,
            error_message: '',
            color: '',
            kategori: null,
            search: '',
            dialog: false,
            editId: '',
            dialogKontrak: false,
            mobils: [],
            datePerpanjang: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: '',
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
        };
    },
    methods: {
        //Read Data Customer
        readData(){
            var url = this.$api + '/showDedline';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.mobils = response.data.data;
            })
        },
        perpanjangK(item){
        this.editId = item.id_mobil; 
        this.dialogKontrak = true;
        },
        saveKontrak(){
            let newData = {
                    kontrak_selesai : this.datePerpanjang,
                };
                var url1 = this.$api + '/perpanjang/' + this.editId;
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
                    this.readData(); // baca data
                    this.inputType = 'Tambah';
                    this.dialogKontrak = false;
                    this.editId = null;
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
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
