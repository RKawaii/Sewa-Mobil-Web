<template>
  <navbar>
    <div class="container">
      <div class="row justify-content-center mt-5">
        <!-- form -->
        <div class="col-md-12">
          <div class="card mb-5">
            <div class="card-header text-center">
              <img
                src="@/assets/images/dummy.jpg"
                alt="User Profile"
                class="img-fluid rounded-circle"
                width="300"
              />
            </div>
            <div class="card-body">
              <h3 class="card-title">Nama : Mathias Yeremia Aryadi</h3>
              <p class="card-text">Terdaftar tanggal 19 Agustus 2019</p>
              <h3 class="card-text mb-5">Username: mathiasy123</h3>
              <router-link to="/ubah-user" class="btn btn-lg btn-primary btn-block">
                <i class="fas fa-edit"></i> GANTI PROFIL
              </router-link>
              <button type="button" @click="logout" class="btn btn-lg btn-danger btn-block">LOGOUT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </navbar>
</template>

<script>
import Navbar from "@/components/Template/Navbar";
export default {
  data() {
    return {
      apiToken: ""
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("user-token");
      this.$router.push("/");
    }
  },
  components: {
    Navbar
  }
};
</script>