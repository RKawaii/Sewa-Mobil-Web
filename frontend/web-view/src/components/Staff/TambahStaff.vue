<template>
  <navbar>
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-12 col-sm-12">
          <div class="card mb-5">
            <div class="card-header">
              <div class="row">
                <div class="col-md-8 col-sm-12">
                  <h3 class="text-left">FORM TAMBAH STAFF</h3>
                </div>
                <div class="col-md-4 col-sm-12">
                  <router-link to="/staff" class="btn btn-secondary float-right">
                    <i class="fas fa-undo"></i>
                    Kembali
                  </router-link>
                </div>
              </div>
            </div>
            <div
              v-show="statusPassword"
              class="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong>Invalid!</strong> Password dan konfirmasi password harus sama
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label for="kode">Kode</label>
                <input type="text" v-model="dataStaff.kode" class="form-control" id="kode" />
              </div>
              <div class="form-group">
                <label for="nama">Nama</label>
                <input type="text" v-model="dataStaff.nama" class="form-control" id="nama" />
              </div>
              <div class="form-group">
                <label for="username">Username</label>
                <input type="text" v-model="dataStaff.username" class="form-control" id="username" />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  v-model="dataStaff.password"
                  class="form-control"
                  id="password"
                />
              </div>
              <div class="form-group">
                <label for="konfirmasi-password">Konfirmasi Password</label>
                <input
                  type="password"
                  v-model="konfirmasiPassword"
                  class="form-control"
                  id="konfirmasi-password"
                />
              </div>
              <button @click="addStaff" class="float-right btn btn-success">
                <i class="fas fa-plus"></i>
                Tambah
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </navbar>
</template>

<script>
import Navbar from "@/components/Template/Navbar";
import axios from "axios";

export default {
  data() {
    return {
      dataStaff: {
        kode: "",
        nama: "",
        username: "",
        password: ""
      },
      konfirmasiPassword: "",
      apiToken: "",
      statusPassword: ""
    };
  },
  methods: {
    addStaff() {
      if (this.konfirmasiPassword != this.dataStaff.password) {
        this.statusPassword = true;
      } else {
        this.statusPassword = false;

        this.apiToken = localStorage.getItem("user-token");

        axios
          .post("http://localhost:5000/api/staff", this.dataStaff, {
            headers: {
              Authorization: "Bearer " + this.apiToken
            }
          })
          .then(response => {
            this.$router.push("/staff");
          });
      }
    }
  },
  components: {
    Navbar
  }
};
</script>