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
            component: importComponent('AdminPage'),
            children: [
                {
                    path: '/pegawai',
                    name: 'Pegawai',
                    meta: { title: 'Pegawai' },
                    component: importComponent('DataMaster/PegawaiPage'),
                },
                {
                    path: '/mobil',
                    name: 'Mobil',
                    meta: { title: 'Mobil' },
                    component: importComponent('DataMaster/MobilPage'),
                },
                {
                    path: '/driver',
                    name: 'Driver',
                    meta: { title: 'Driver' },
                    component: importComponent('DataMaster/DriverPage'),
                },
                {
                    path: '/mitra',
                    name: 'Mitra',
                    meta: { title: 'Mitra' },
                    component: importComponent('DataMaster/MitraPage'),
                },
                {
                    path: '/dedline',
                    name: 'Dedline',
                    meta: { title: 'Dedline' },
                    component: importComponent('DataMaster/DedlineKontrak'),
                },
            ],
        },

        {
            path: '/manager',
            component: importComponent('ManagerPage'),
            children: [
                {
                    path: '/jadwal',
                    name: 'JadwalPage',
                    meta: { title: 'JadwalPage' },
                    component: importComponent('DataMaster/JadwalPage'),
                },
                {
                    path: '/jadwalCs',
                    name: 'JadwalCsPage',
                    meta: { title: 'JadwalCsPage' },
                    component: importComponent('DataMaster/JadwalPageCs'),
                },
                {
                    path: '/promo',
                    name: 'Promo',
                    meta: { title: 'Promo' },
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
                    path: '/user',
                    name: 'Customer',
                    meta: { title: 'Customer Page' },
                    component: importComponent('DataMaster/CustomerPage'),
                },
                {
                    path: '/peminjamanCs',
                    name: 'Peminjaman Cs',
                    meta: { title: 'Peminjaman Cs' },
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
                    meta: { title: 'HomeDb' },
                    component: importComponent('DataMaster/HomeDashboard'),
                },
                {
                    path: '/profil',
                    name: 'Profil',
                    meta: { title: 'Profil' },
                    component: importComponent('DataMaster/ProfilePage'),
                },
                {
                    path: '/peminjaman',
                    name: 'Peminjaman',
                    meta: { title: 'Peminjaman' },
                    component: importComponent('DataMaster/PeminjamanPage'),
                },
            ],
        },

        // Login
        {
            path: '/login',
            name: 'Login',
            meta: { title: 'Login'},
            component: importComponent('LoginPage'),
        },
        // Register
        {
            path: '/register',
            name: 'Register',
            meta: { title: 'Register'},
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