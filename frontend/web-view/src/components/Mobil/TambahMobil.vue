<template>
  <navbar>
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-12 col-sm-12">
          <div class="card mb-5">
            <div class="card-header">
              <div class="row">
                <div class="col-md-8 col-sm-12">
                  <h3 class="text-left">FORM TAMBAH MOBIL</h3>
                </div>
                <div class="col-md-4 col-sm-12">
                  <router-link to="/mobil" class="btn btn-secondary float-right">
                    <i class="fas fa-undo"></i>
                    Kembali
                  </router-link>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label for="jenis">Jenis</label>
                <select class="form-control" id="jenis" v-model="dataMobil.id_jenis_mobil">
                  <option
                    v-for="jenis in jenisMobil"
                    :key="jenis.id"
                    :value="jenis.id"
                  >{{ jenis.jenis_mobil }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="plat">Nomor Plat</label>
                <input type="text" v-model="dataMobil.plat" class="form-control" id="plat" />
              </div>
              <div class="form-group">
                <label for="kapasitas">Kapasitas</label>
                <input type="number" v-model="dataMobil.kursi" class="form-control" id="kapasitas" />
              </div>
              <div class="form-group">
                <label for="harga">Harga</label>
                <input type="number" v-model="dataMobil.harga" class="form-control" id="harga" />
              </div>
              <div class="form-group">
                <label for="status">Status Pemakaian</label>
                <select class="form-control" id="status" v-model="dataMobil.status">
                  <option value="0" selected>Tidak Dipakai</option>
                </select>
              </div>
              <button @click.prevent="addMobil" class="float-right btn btn-success">
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
      jenisMobil: [],
      dataMobil: {
        id_jenis_mobil: "",
        plat: "",
        kursi: "",
        harga: "",
        status: ""
      },
      apiToken: ""
    };
  },
  created() {
    this.apiToken = localStorage.getItem("user-token");

    axios
      .get("http://localhost:5000/api/jenis", {
        headers: {
          Authorization: "Bearer " + this.apiToken
        }
      })
      .then(response => {
        this.jenisMobil = response.data;
      });
  },
  methods: {
    addMobil() {
      this.apiToken = localStorage.getItem("user-token");

      axios
        .post("http://localhost:5000/api/mobil", this.dataMobil, {
          headers: {
            Authorization: "Bearer " + this.apiToken
          }
        })
        .then(response => {
          this.$router.push("/mobil");
        });
    }
  },
  components: {
    Navbar
  }
};
</script>