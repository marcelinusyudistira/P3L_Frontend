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
                0 ></v-carousel-item>
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
                        Morbi mattis ullamcorper velit. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Fusce convallis metus id felis luctus adipiscing. Aenean massa. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus.
                        Nulla consequat massa quis enim. Praesent venenatis metus at tortor pulvinar varius. Donec venenatis vulputate lorem. Phasellus accumsan cursus velit. Pellentesque ut neque.
                        Nulla consequat massa quis enim. Praesent venenatis metus at tortor pulvinar varius. Donec venenatis vulputate lorem. Phasellus accumsan cursus velit. Pellentesque ut neque.
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
                            Morbi mattis ullamcorper velit. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Fusce convallis metus id felis luctus adipiscing. Aenean massa. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus.
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
                    src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                },
            ],
            cards: [
                { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3 },
                { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
                { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
                { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
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
