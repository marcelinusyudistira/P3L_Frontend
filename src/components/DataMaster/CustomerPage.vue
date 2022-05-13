<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5> Customer </h3>

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
            <v-data-table :headers="headers" :items="customers" :search="search">
            </v-data-table>
        </v-card>
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
            color: '',
            search: null,
            customers: [],
            timer: "",
            headers: [
                { text: "ID Customer", align: "start", sortable: true, value: "id_customer"},
                { text: "Nama Customer", value: 'nama_customer'},
                { text: "Tanggal Lahir", value: 'tanggal_lahir'},
                { text: "Gender", value: 'gender'},
                { text: "Alamat", value: 'alamat'},
                { text: "Nomor Telepon", value: 'nomor_telepon'},
                { text: "Foto", value: 'foto'},
                { text: "KTP", value: 'ktp'},
                { text: "SIM", value: 'sim'},
                { text: "Email", value: 'email'},
            ],
        };
    },
    methods: {
        //Read Data Customer
        readData() {
            var url = this.$api + '/customer';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.customers = response.data.data;
            })
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