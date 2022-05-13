<template>
    <v-main class="list">
        <v-container class="grey lighten-5">
            <v-toolbar class="mb-2" color="indigo darken-5" dark flat>
                <v-toolbar-title>Jadwal Admin</v-toolbar-title>
                <v-text-field
                    class="btnSearch"
                    v-model="search"
                    label="Search"
                    single-line
                    hide-details>
                </v-text-field>
                <v-btn class="ml-4" color="success" dark @click="readDataSearch"> Cari </v-btn>
                <v-btn class="ml-4" color="success" dark @click="dialogAdm = true"> Tambah </v-btn>
                <!-- <v-btn class="btnAdd" color="success" dark @click="dialogAdm = true"> Tambah </v-btn> -->
            </v-toolbar>
                
            <v-card elevation="5">
                <v-row no-gutters>
                <v-col cols="12" sm="4">
                    <v-simple-table class="headerTable" >
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-center">Selasa</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in pegawaisAdmSelasa" :key="item.nama_pegawai">
                                    <td class="text-left">Shift {{item.shift}} - {{ item.nama_pegawai }}</td>
                                    <v-btn class="ml-1" outlined fab color="teal" x-small @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn class="ml-1" outlined fab color="indigo" x-small @click="deleteHandler(item.id_detail)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-center">Rabu</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in pegawaisAdmRabu" :key="item.nama_pegawai">
                                    <td class="text-left">Shift {{item.shift}} - {{ item.nama_pegawai }}</td>
                                    <v-btn class="ml-1" outlined fab color="teal" x-small @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn class="ml-1" outlined fab color="indigo" x-small @click="deleteHandler(item.id_detail)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-center">Kamis</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in pegawaisAdmKamis" :key="item.nama_pegawai">
                                    <td class="text-left">Shift {{item.shift}} - {{ item.nama_pegawai }}</td>
                                    <v-btn class="ml-1" outlined fab color="teal" x-small @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn class="ml-1" outlined fab color="indigo" x-small @click="deleteHandler(item.id_detail)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>

                <v-col cols="12" sm="4">
                    <v-simple-table class="mt-5">
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-center">Jumat</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in pegawaisAdmJumat" :key="item.nama_pegawai">
                                    <td class="text-left">Shift {{item.shift}} - {{ item.nama_pegawai }}</td>
                                    <v-btn class="ml-1" outlined fab color="teal" x-small @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn class="ml-1" outlined fab color="indigo" x-small @click="deleteHandler(item.id_detail)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>  
                <v-col cols="12" sm="4">
                    <v-simple-table class="mt-5">
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-center">Sabtu</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in pegawaisAdmSabtu" :key="item.nama_pegawai">
                                    <td class="text-left">Shift {{item.shift}} - {{ item.nama_pegawai }}</td>
                                    <v-btn class="ml-1" outlined fab color="teal" x-small @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn class="ml-1" outlined fab color="indigo" x-small @click="deleteHandler(item.id_detail)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>  
                <v-col cols="12" sm="4">
                    <v-simple-table class="mt-5">
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-center">Minggu</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in pegawaisAdmMinggu" :key="item.nama_pegawai">
                                    <td class="text-left">Shift {{item.shift}} - {{ item.nama_pegawai }}</td>
                                    <v-btn class="ml-1" outlined fab color="teal" x-small @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn class="ml-1" outlined fab color="indigo" x-small @click="deleteHandler(item.id_detail)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>                
                </v-row>
            </v-card>
        </v-container>

        <v-dialog v-model="dialogAdm" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <v-span class="headline">{{ formTitle }} Jadwal</v-span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-select
                            item-text="nama_pegawai"
                            item-value="id_pegawai"
                            v-model="selectPegawai"
                            label="Nama Pegawai"
                            :items="listPegawaiAdm"
                            dense outlined
                        />
                        <v-select
                            :item-text="listShift =>`${listShift.hari} - ${listShift.shift}`" 
                            item-value="id"
                            v-model="selectShift"
                            label="Jadwal Shift"
                            :items="listShift"
                            dense outlined
                        >
                        </v-select>
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
                <v-card-text>Anda Yakin ingin menghapus Jadwal Pegawai ini?</v-card-text>
                <v-card-action class="btnConfirm">
                    <v-spacer></v-spacer>
                    <div class="btnConfirm">
                        <v-btn class="ml-4" color="blue darken-1" text @click="dialogConfirm = false">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
                    </div>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogSearch" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Hasil Pencarian</span>
                </v-card-title>
                <v-card-text>
                    <v-simple-table fixed-header>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-center">Nama Pegawai</th>
                                    <th class="text-center">Hari</th>
                                    <th class="text-center">Shift</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in searchPegawai" :key="item.nama_pegawai">
                                    <td>{{ item.nama_pegawai }}</td>
                                    <td>{{ item.hari }}</td>
                                    <td>{{ item.shift }}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn class="btnClose" color="blue darken-1" text @click="cancel">Close</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-snackbar
            v-model="snackbarTrue"
            :timeout="timeout"
            color="green"
        >{{error_message}}</v-snackbar>
        <v-snackbar
            v-model="snackbarFalse"
            :timeout="timeout"
            color="red"
        >{{error_message}}</v-snackbar>

    </v-main>
</template>

<script>
  export default {
    data: () => ({
      searchPegawai: [],
      timeout: 2000,
      pegawaisAdmSelasa: [],
      pegawaisAdmRabu: [],
      pegawaisAdmKamis: [],
      pegawaisAdmJumat: [],
      pegawaisAdmSabtu: [],
      pegawaisAdmMinggu: [],
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
      ],
      search: null,
      detail: new FormData,
      details: [],
      form: {
        id_pegawai: null,
        id_shift: null,
      },
      deleteId: '',
      timer:'',
      editId: '',
      dialogEdit: false,
      dialogConfirm: false,
      dialogAdm: false,
      dialogCs: false,
      dialogSearch: false,
      selectPegawai: null,
      selectShift: null,
      inputType: 'Tambah',
      snackbarTrue: false,
      snackbarFalse: false,
      error_message:'',
      color:'',
      listPegawaiAdm: [],
      listPegawaiCs:[],
      listShift: [
        {
            hari: "Selasa", id: 1, shift: "1",
        },
        {
            hari: "Selasa", id: 2, shift: "2",
        },
        {
            hari: "Rabu", id: 3, shift: "1",
        },
        {
            hari: "Rabu", id: 4, shift: "2",
        },
        {
            hari: "Kamis", id: 5, shift: "1",
        },
        {
            hari: "Kamis", id: 6, shift: "2",
        },
        {
            hari: "Jumat", id: 7, shift: "1",
        },
        {
            hari: "Jumat", id: 8, shift: "2",
        },
        {
            hari: "Sabtu", id: 9, shift: "1",
        },
        {
            hari: "Sabtu", id: 10, shift: "2",
        },
        {
            hari: "Minggu", id: 11, shift: "1",
        },
        {
            hari: "Minggu", id: 12, shift: "2",
        },
      ],
    }),
    methods: {
        setForm(){
            if(this.inputType !== 'Tambah'){
                this.update();
                this.cek = "masuk Update";
            }else{
                this.save();
                this.cek = "masuk Save";
            }
        },
        //Read Data Detail
        readData() {
            var url = this.$api + '/detailJadwal';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.details = response.data.data;
            })
        },
        readDataHari(hari) {
            var url = this.$api + '/indexHari/2/' + hari;
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                if(hari == "selasa")
                    this.pegawaisAdmSelasa = response.data.data;
                else if(hari == "rabu")
                    this.pegawaisAdmRabu = response.data.data;
                else if(hari == "kamis")
                    this.pegawaisAdmKamis = response.data.data;
                else if(hari == "jumat")
                    this.pegawaisAdmJumat = response.data.data;
                else if(hari == "sabtu")
                    this.pegawaisAdmSabtu = response.data.data;
                else if(hari == "minggu")
                    this.pegawaisAdmMinggu = response.data.data;
            })
        },
        readDataPegawai(role) {
            var url = this.$api + '/showPegawai/' + role;
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                if(role == 2)
                    this.listPegawaiAdm = response.data.data;
                else   
                    this.listPegawaiCs = response.data.data;
            })
        },
        readDataSearch() {
            var url = this.$api + '/searchJadwal/2/' + this.search;
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.searchPegawai = response.data.data;
                this.dialogSearch = true;
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.error_message = "Data tidak ditemukan";
                this.color = "red";
                this.snackbarFalse = true;
                this.searchPegawai = null;
                this.search = null;
            });
        },
        //Simpan data Detail
        save() {
            this.detail.append('id_pegawai', this.selectPegawai);
            this.detail.append('id_jadwal', this.selectShift);

            var url = this.$api + '/detailJadwal'
            this.load = true;
            this.$http.post(url, this.detail, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.error_message = "Berhasil Menambahkan Jadwal";
                this.color = "green";
                this.snackbarTrue = true;
                this.readAll();
                this.cancel();
                this.resetForm();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.error_message = "Jadwal Pegawai tidak boleh melebihi 6 Shift";
                this.color = "red";
                this.snackbarFalse = true;
                this.cancel();
                this.readAll();
            });
        },
        reloadPage() {
            window.location.reload();
        },
        //Ubah data Detail
        update() {
            let newData = {
                id_pegawai : this.selectPegawai,
                id_jadwal : this.selectShift,
            };
            var url = this.$api + '/detailJadwal/' + this.editId;
            this.load = true;
            this.$http.put(url, newData, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.error_message = "Berhasil Mengupdate Jadwal";
                this.color = "green";
                this.snackbarTrue = true;
                this.readAll();
                this.cancel(); 
                this.reloadPage();
                this.cek="sampe belakang timer";
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.error_message = "Gagal Mengupdate Jadwal";
                this.color = "red";
                this.snackbarFalse = true;
                this.cancel();
                this.readAll();
            });
        },
        //Hapus data Detail
        deleteData() {
            var url = this.$api + '/detailJadwal/' + this.deleteId;
            this.load = true;
            this.$http.delete(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.error_message = "Berhasil Menghapus Jadwal";
                this.color = "green";
                this.snackbarTrue = true;
                this.load = false;
                this.readAll(); // baca data
                this.cancel(); 
                this.resetForm();
                this.reloadPage();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.error_message = "Gagal menghapus Jadwal";
                this.color = "red";
                this.snackbarFalse = true;
                this.cancel();
                this.readAll();
            });
        },
        editHandler(item) {
            this.inputType = "Ubah";
            this.editId = item.id_detail;
            this.form.id_pegawai = item.id_pegawai;
            this.form.id_shift = item.id_shift;
            this.dialogAdm = true;
        },
        deleteHandler(id) {
            this.deleteId = id;
            this.dialogConfirm = true;
        },
        cancel() {
            this.resetForm();
            this.dialogAdm = false;
            this.dialogConfirm = false;
            this.dialogSearch = false;
            this.inputType = 'Tambah';
            this.search = null;
        },
        resetForm() {
            this.form = {
                id_pegawai: null,
                id_shift: null,
                selectPegawai: '',
                selectShift: '',
            };
        },
        readAll(){
            this.readDataHari("selasa");
            this.readDataHari("rabu");
            this.readDataHari("kamis");
            this.readDataHari("jumat");
            this.readDataHari("sabtu");
            this.readDataHari("minggu");
        }
    },
    computed: {
        formTitle() {
            return this.inputType;
        },
    },
    mounted() {
        this.readData();
        this.readAll();
        this.readDataPegawai(2);
    },
  }
</script>

<style>
.btnAdd{
    margin-left: 10px;
}

.btnSearch{
    margin-left: 510px;
}

.btnAddCs{
    margin-left: 795px;
}

.btnConfirm{
    margin-left: 190px;
}

.btnClose{
    margin-left: 480px
}
</style>