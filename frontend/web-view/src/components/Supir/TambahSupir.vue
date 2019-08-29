<template>
  <navbar>
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-12 col-sm-12">
          <div class="card mb-5">
            <div class="card-header">
              <div class="row">
                <div class="col-md-8 col-sm-12">
                  <h3 class="text-left">FORM TAMBAH SUPIR</h3>
                </div>
                <div class="col-md-4 col-sm-12">
                  <router-link to="/supir" class="btn btn-secondary float-right">
                    <i class="fas fa-undo"></i>
                    Kembali
                  </router-link>
                </div>
              </div>
            </div>
            <div class="card-body">
              <!-- form -->
              <div class="form-group">
                <label for="nama">Nama</label>
                <input type="text" v-model="dataSupir.nama" class="form-control" id="nama" />
              </div>
              <div class="form-group">
                <label for="alamat">Alamat</label>
                <textarea v-model="dataSupir.alamat" class="form-control" id="alamat" rows="3"></textarea>
              </div>
              <div class="form-group">
                <label for="telepon">Telepon</label>
                <input type="number" v-model="dataSupir.telepon" class="form-control" id="telepon" />
              </div>
              <div class="form-group">
                <label for="status">Status</label>
                <select class="form-control" id="status" v-model="dataSupir.status">
                  <option value="0">Tidak Dipakai</option>
                </select>
              </div>
              <button @click="addSupir" class="float-right btn btn-success">
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
      dataSupir: {
        nama: "",
        alamat: "",
        telepon: "",
        status: ""
      },
      apiToken: ""
    };
  },
  methods: {
    addSupir() {
      this.apiToken = localStorage.getItem("user-token");

      axios
        .post("http://localhost:5000/api/supir", this.dataSupir, {
          headers: {
            Authorization: "Bearer " + this.apiToken
          }
        })
        .then(response => {
          this.$router.push("/supir");
        });
    }
  },
  components: {
    Navbar
  }
};
</script>