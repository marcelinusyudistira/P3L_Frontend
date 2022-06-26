import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path) {
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/admin',
            meta: { title: 'Admin Page' },
            component: importComponent('AdminPage'),
            children: [
                {
                    path: '/admindb',
                    name: 'Dashboard',
                    meta: { title: 'Dashboard Page' },
                    component: importComponent('DashboardPage'),
                },
                {
                    path: '/pegawai',
                    name: 'Pegawai',
                    meta: { title: 'Daftar Pegawai AJR' },
                    component: importComponent('DataMaster/PegawaiPage'),
                },
                {
                    path: '/mobil',
                    name: 'Mobil',
                    meta: { title: 'Daftar Mobil AJR' },
                    component: importComponent('DataMaster/MobilPage'),
                },
                {
                    path: '/driver',
                    name: 'Driver',
                    meta: { title: 'Daftar Driver AJR' },
                    component: importComponent('DataMaster/DriverPage'),
                },
                {
                    path: '/mitra',
                    name: 'Mitra',
                    meta: { title: 'Daftar Mitra AJR' },
                    component: importComponent('DataMaster/MitraPage'),
                },
                {
                    path: '/dedline',
                    name: 'Dedline',
                    meta: { title: 'Dedline Kontrak' },
                    component: importComponent('DataMaster/DedlineKontrak'),
                },
            ],
        },

        {
            path: '/manager',
            meta: { title: 'Manager Page' },
            component: importComponent('ManagerPage'),
            children: [
                {
                    path: '/managerdb',
                    name: 'Dashboard',
                    meta: { title: 'Dashboard Page' },
                    component: importComponent('DashboardPage'),
                },
                {
                    path: '/jadwal',
                    name: 'JadwalPage',
                    meta: { title: 'Jadwal Admin AJR' },
                    component: importComponent('DataMaster/JadwalPage'),
                },
                {
                    path: '/jadwalCs',
                    name: 'JadwalCsPage',
                    meta: { title: 'Jadwal Customer Servis AJR' },
                    component: importComponent('DataMaster/JadwalPageCs'),
                },
                {
                    path: '/promo',
                    name: 'Promo',
                    meta: { title: 'Promo AJR' },
                    component: importComponent('DataMaster/PromoPage'),
                },
            ],
        },

        {
            path: '/customerService',
            meta: { title: 'Customer Service Page' },
            component: importComponent('CustomerService'),
            children: [
                {
                    path: '/csdb',
                    name: 'Dashboard',
                    meta: { title: 'Dashboard Page' },
                    component: importComponent('DashboardPage'),
                },
                {
                    path: '/user',
                    name: 'Customer',
                    meta: { title: 'Customer Page' },
                    component: importComponent('DataMaster/CustomerPage'),
                },
                {
                    path: '/peminjamanCs',
                    name: 'Peminjaman Cs',
                    meta: { title: 'Peminjaman CS Page' },
                    component: importComponent('DataMaster/PeminjamanCS'),
                },
            ],
        },

        {
            path: '/home/:email?',
            name: 'Home',
            meta: { title: 'Home'},
            component: importComponent('HomePage'),
            children: [
                {
                    path: '/homedb',
                    name: 'HomeDb',
                    meta: { title: 'Atma Jaya Rental' },
                    component: importComponent('DataMaster/HomeDashboard'),
                },
                {
                    path: '/profil',
                    name: 'Profil',
                    meta: { title: 'Profile Customer' },
                    component: importComponent('DataMaster/ProfilePage'),
                },
                {
                    path: '/peminjaman',
                    name: 'Peminjaman',
                    meta: { title: 'Peminjaman' },
                    component: importComponent('DataMaster/PeminjamanPage'),
                },
                {
                    path: '/nota',
                    name: 'Nota',
                    meta: { title: 'Generate Nota AJR' },
                    component: importComponent('DataMaster/NotaPage'),
                },
            ],
        },

        // Login
        {
            path: '/login',
            name: 'Login',
            meta: { title: 'Login AJR'},
            component: importComponent('LoginPage'),
        },
        // Register
        {
            path: '/register',
            name: 'Register',
            meta: { title: 'Register AJR'},
            component: importComponent('RegisterPage'),
        },
        {
            path: '*',
            redirect: '/login'
        },
    ],
});

//Set judul
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});

export default router;