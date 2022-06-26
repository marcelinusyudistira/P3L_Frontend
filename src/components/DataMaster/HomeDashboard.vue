<template>
    <v-main class="list">
        <!-- <v-card
            class="cardClass flex"
            flat
            tile
            >
            <v-card-title class="teal">
                <v-col cols="8">
                    <strong class="subheading ml-16">Selamat Datang {{  }}</strong>
                </v-col>
            </v-card-title>
        </v-card> -->
        <v-container width="400">
            <v-carousel hide-delimiters cycle height="400">
                <v-carousel-item
                    v-for="(item,i) in items"
                    :key="i"
                    :src="item.src"
                 ></v-carousel-item>
            </v-carousel>
            <v-card
                class="mx-auto mt-4"
                width="1200"
            >
                <v-card-title class="title">
                    <h3>Atma Jaya Rental</h3>
                </v-card-title>

                <v-card-subtitle class="subtitle" align="justify">
                    <p class="mt-1 subtitle">
                        Atma Jaya Rental merupakan sebuah rental mobil terpercaya yang mengedepankan kualitas pelayanan,
                        kemudahan syarat penyewaan, harga murah, serta keramahan. Terdapat berbagai jenis mobil yang dapat disewa melalui servis
                        rental mobil ini, tentunya dengan harga yang lebih terjangkau. Disediakan Driver-driver handal untuk menemani perjalanan Anda
                        dalam menggunakan armada kami. Kondisi yang bersih, mesin yang sehat, dan ketersediaan safety riding pada armada kami membuat
                        kenyamanan anda dalam berkendara semakin baik. Atma Jaya Rental merupakan satu-satunya rental mobil yang menjamin kulaitas serta
                        kuantitas dari pelayanan-pelayanan yang diberikan. Atma Jaya Rental "Rent Easily".
                        
                    </p>
                </v-card-subtitle>
            </v-card>
            <p class="title2">Keuntungan menggunakan AJR</p>
            <v-container fluid class="mx-auto "
                max-width="1200">
                <v-row dense>
                    <v-col
                    v-for="card in cards"
                    :key="card.title"
                    :cols="card.flex"
                    >
                    <v-card class="mr-4">
                        <v-img
                        :src="card.src"
                        class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        height="200px"
                        ></v-img>

                        <v-card-title v-text="card.title">
                        </v-card-title>

                        <v-card-subtitle align="justify">
                           {{card.isi}}
                        </v-card-subtitle>
                    </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-container>
        <v-footer
            dark
            padless
        >
            <v-card
            class="flex"
            flat
            tile
            >
            <v-card-title class="teal">
                <v-col cols="8">
                    <strong class="subheading ml-16">Get connected with us on social networks!</strong>
                    <p class="subtitle2">
                        Morbi mattis ullamcorper velit. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Fusce convallis metus id felis luctus adipiscing. Aenean massa. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus.
                    </p>

                <v-spacer></v-spacer>
                </v-col>
                <v-col cols="4">
                    <v-container class="con">
                        <v-row > 
                            <v-icon size="24px">
                                mdi-facebook
                            </v-icon>
                            <v-text class="about"><p class="about ml-1">atmaJayaRental</p></v-text>
                        </v-row>
                    </v-container>
                    <v-container class="con">
                        <v-row> 
                            <v-icon size="24px">
                                mdi-instagram
                            </v-icon>
                            <v-text class="about"><p class="about ml-1">atmajaya.rentalAJR</p></v-text>
                        </v-row>
                    </v-container>
                    <v-container class="con">
                        <v-row> 
                            <v-icon size="24px">
                                mdi-whatsapp
                            </v-icon>
                            <v-text class="about"><p class="about ml-1">+62 878-1422-5410</p></v-text>
                        </v-row>
                    </v-container>
                </v-col>
            </v-card-title>

            <v-card-text class="py-2 white--text text-center">
                {{ new Date().getFullYear() }} — <strong>Atma Jaya Rental</strong>
            </v-card-text>
            </v-card>
        </v-footer>
    </v-main>
</template>

<script>
  export default {
    data () {
        return {
            items: [
                {
                    src: 'https://www.gardaoto.com/wp-content/uploads/2022/02/Ingin-Buka-Usaha-Rental-Mobil-Ini-Syarat-Kelengkapannya.jpg',
                },
                {
                    src: 'https://asset.kompas.com/crops/OHf2diiOQzCFzaFZoTdWbOJmNNg=/0x0:1000x667/750x500/data/photo/2018/06/14/283583017.jpg',
                },
                {
                    src: 'https://imgx.gridoto.com/crop/0x0:0x0/700x465/filters:watermark(file/2017/gridoto/img/watermark.png,5,5,60)/photo/gridoto/2018/06/11/281223284.jpg',
                },
            ],
            cards: [
                { 
                    title: 'Pelayanan Ramah', 
                    src: 'https://awsimages.detik.net.id/content/2010/09/11/766/jabat-tangan-depan-thinkstock.jpg', 
                    isi: 'Atma Jaya Rental mengedepankan prinsip dimana customer harus dapat pelayanan yang baik, sehingga para pegawai AJR diharuskan memiliki skill komunikasi yang baik agar customer menjadi lebih nyaman',
                    flex: 3 
                },
                { 
                    title: 'Perjalanan Nyaman', 
                    src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', 
                    isi: 'Dengan tersedianya driver handal dan ramah, customer dapat melakukan perjalanan dengan nyaman dan rileks sehingga dapat sampai tujuan dengan keadaan yang selamat, aman, sejahtera, dan bahagia',
                    flex: 3 
                },
                { 
                    title: 'Harga Terjangkau', 
                    src: 'https://rollingstone.co.id/wp-content/uploads/2020/04/Harganya-Lebih-Murah.png', 
                    isi: 'Atma Jaya Rental merupakan rental mobil dengan harga yang pas dikantong customer dengan pelayanan yang baik, armada yang lengkap, serta driver yang handal menjadi nilai plus dari rental mobil ini',
                    flex: 3 
                },
                { 
                    title: 'Armada Berkualitas', 
                    src: 'http://lotus-trans.com/wp-content/uploads/2018/04/Rental-Mobil-Purbalingga.jpg', 
                    isi: 'Mengedepankan kualitas dan kuantitas, dengan semboyannya "Rent Easily", armada yang disediakan oleh AJR sangat beragam, dan dijamin safetynya karena rutin melakukan servis dan pemeriksaan mesin disetiap bulan',
                    flex: 3 
                },
            ],
            icons: [
                'mdi-facebook',
                'mdi-twitter',
                'mdi-linkedin',
                'mdi-instagram',
            ],
        }
    },
  }
</script>

<style>
.title {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-weight: bold;
  color: black;
}
.subtitle {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: normal;
  font-size: 15px;
  color: black;
}
.subtitle2 {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: normal;
  font-size: 15px;
  color: white;
  margin-left: 100px;
  margin-top: 10px;
  margin-bottom: -50px;
}
.title2{
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 20px;
  color: black;
  margin-top: 40px;
  margin-bottom: 10px;
}
.about{
    font-size: 17px;
    margin-top: 10px;
}
.con{
    margin-top:-30px;
    margin-bottom:-30px;
    margin-left: 100px;
}
.cardClass{
    margin-top: 30px;
}
</style>
