<template>
  <div class="about">
    <div class="greeting" v-if="user">
      <h2>Välkommen {{ user.name }}</h2>
      <p>Adress: {{ user.adress }}</p>
      <p>Postort: {{ user.zip + " " + user.city }}</p>
    </div>

    <div v-if="openModal" class="detail-modal">
      <XIcon :size="48" @click="openModal = !openModal" />
      <h2>Hyresföfrågan</h2>
      <br />

      <p><span class="rent-title">Maskin:</span> {{ openRent.machineType }}</p>
      <p><span class="rent-title">Datum:</span> {{ openRent.date }}</p>
      <p>
        <span class="rent-title">Status:</span> {{ openRent.acceptanceStatus }}
      </p>
      <div v-if="otherUser">
        <p><span class="rent-title">Motpart: </span>{{ otherUser.name }}</p>
        <p><span class="rent-title">Adress: </span>{{ otherUser.adress }}</p>
        <p>
          <span class="rent-title">Postort: </span
          >{{ otherUser.zip + " " + otherUser.city }}
        </p>
      </div>

      <div class="ans-buttons" v-if="openRent.owner == user._id">
        <button class="button" @click="ansYes">Acceptera</button>
        <button class="button" @click="ansNo">Tacka nej</button>
      </div>
    </div>

    <div class="divider"></div>
    <router-link to="/profile" class="linkbtn">Redigera profil</router-link>
    <router-link to="/machine" class="linkbtn">Mina maskiner</router-link>
    <div class="divider"></div>

    <div v-for="rentR in rentRequests" :key="rentR._id">
      <h2>Hyresöfrågan:</h2>
      <p>Datum: {{ rentR.date }}</p>
      <p>Maskin: {{ rentR.machineType }}</p>

      <button class="button" @click="openTheModal(rentR._id)">Detaljer</button>
    </div>

    <div v-if="!rentRequests">
      <h2>Inga kommande hyror funna</h2>
    </div>
    <div class="divider"></div>
    <h4>Pågående hyra:</h4>
    <div v-for="rentR in ongoing" :key="rentR._id">
      <p>Datum: {{ rentR.date }}</p>
      <p>Maskin: {{ rentR.machineType }}</p>
    </div>
    <div class="divider"></div>
    <h4>Historik:</h4>
    <div v-for="rentH in history" :key="rentH._id">
      <p>Datum: {{ rentH.date }}</p>
      <p>Maskin: {{ rentH.machineType }}</p>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import XIcon from "vue-material-design-icons/Close.vue";

export default {
  components: {
    XIcon,
  },
  data() {
    return {
      user: null,
      rents: [],
      openModal: false,
      openRent: null,
      otherUser: null,
    };
  },
  methods: {
    fetchMyProfile() {
      axios
        .get("https://grenty-api.herokuapp.com/profile/fetchMy", {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        })
        .then((response) => {
          this.user = response.data;
        });
    },
    fetchMyRents() {
      axios
        .get("https://grenty-api.herokuapp.com/renting/myrents", {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        })
        .then((response) => {
          this.rents = response.data;
        });
    },
    closeModal() {
      this.openModal = false;
    },
    openTheModal(rentId) {
      this.openModal = true;
      for (let i = 0; i < this.rentRequests.length; i++) {
        if (this.rentRequests[i]._id == rentId) {
          this.openRent = this.rentRequests[i];
        }
      }
      if (this.openRent.owner == this.user._id) {
        axios
          .get(
            "https://grenty-api.herokuapp.com/profile/fetchOther/" +
              this.openRent.renter,
            {
              headers: {
                Authorization: "Bearer " + localStorage.token,
              },
            }
          )
          .then((response) => {
            this.otherUser = response.data;
          });
      } else {
        axios
          .get(
            "https://grenty-api.herokuapp.com/profile/fetchOther/" +
              this.openRent.owner,
            {
              headers: {
                Authorization: "Bearer " + localStorage.token,
              },
            }
          )
          .then((response) => {
            this.otherUser = response.data;
          });
      }
    },
    ansYes() {
      axios
        .post(
          "https://grenty-api.herokuapp.com/renting/request/answer",
          {
            answer: "yes",
            ...this.openRent,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
          if (!response.data.err) {
            //lyckad transaktion ladda om sidan
          } else {
            //något gick fel
          }
        });
    },

    ansNo() {
      axios
        .post(
          "https://grenty-api.herokuapp.com/renting/request/answer",
          {
            answer: "no",
            ...this.openRent,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
          if (!response.data.err) {
            //lyckad transaktion ladda om sidan
          } else {
            //något gick fel
          }
        });
    },
  },
  mounted() {
    this.user = localStorage.user;
    this.fetchMyProfile();
    this.fetchMyRents();
  },
  computed: {
    rentRequests: function () {
      return this.rents.filter(
        (element) => element.acceptanceStatus == "requested"
      );
    },
    history: function () {
      return this.rents.filter(
        (element) => element.acceptanceStatus == "completed"
      );
    },
    ongoing: function () {
      return this.rents.filter(
        (element) => element.acceptanceStatus == "accepted"
      );
    },
  },
};
</script>


<style scoped>
.rent-title {
  font-weight: bold;
}
</style>