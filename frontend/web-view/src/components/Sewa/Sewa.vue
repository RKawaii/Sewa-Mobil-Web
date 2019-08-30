<template>
  <navbar>
    <div class="container">
      <h3 class="mt-5">DATA SEWA</h3>
      <!-- field search -->
      <div class="row mt-3">
        <div class="col-md-6">
          <form action method>
            <div class="input-group mb-3">
              <div class="input-group mb-3">
                <input
                  type="text"
                  name="keyword"
                  class="form-control"
                  placeholder="Kata Kunci . . ."
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="submit" id="button-addon2">Pencarian</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-6">
          <router-link to="/beranda" class="btn btn-secondary float-right">
            <i class="fas fa-undo"></i>
            Kembali
          </router-link>
        </div>
      </div>
      <!-- tabel -->
      <div class="row mt-3">
        <div class="col-md-12 col-sm-12">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Nomor</th>
                  <th scope="col">Username User</th>
                  <th scope="col">Plat Mobil</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(sewa, index) in sewa" :key="sewa.main_id">
                  <td scope="col">{{ index + 1 }}</td>
                  <td scope="col">{{ sewa.username }}</td>
                  <td scope="col">{{ sewa.plat }}</td>
                  <td v-if="dataRole == 'admin'">
                    <button
                      type="button"
                      class="btn btn-info"
                      data-toggle="modal"
                      data-target="#modalDetail1"
                      @click="detailSewa(sewa, sewa.id)"
                    >
                      <i class="fas fa-info"></i> Detail
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger ml-2"
                      data-toggle="modal"
                      data-target="#modalKonfirmasi"
                    >
                      <i class="fas fa-edit"></i> Hapus
                    </button>
                  </td>
                  <td v-else>
                    <button
                      type="button"
                      class="btn btn-info"
                      data-toggle="modal"
                      data-target="#modalDetail1"
                      @click="detailSewa(sewa, sewa.id)"
                    >
                      <i class="fas fa-info"></i> Detail
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- pagination -->
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#">Previous</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">1</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">2</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">3</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- modal detail 1 -->
      <div
        class="modal fade"
        id="modalDetail1"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Detail Penyewaan</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Info Pelanggan</h5>
                      <p class="card-text">Email User : {{ dataDetailSewa.email }}</p>
                      <p class="card-text">Nama User : {{ dataDetailSewa.username }}</p>
                      <p class="card-text">Telepon User : {{ dataDetailSewa.telepon }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12 col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Info Mobil</h5>
                      <p class="card-text">Nomor Plat : {{ dataDetailSewa.plat }}</p>
                      <p class="card-text">Jenis : {{ dataDetailSewa.jenis_mobil }}</p>
                      <p class="card-text">Merk : Toyota</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12 col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Info Penyewaan</h5>
                      <p class="card-text">Tanggal Mulai Penyewaan : {{ dataDetailSewa.mulai_sewa }}</p>
                      <p class="card-text">Tanggal Akhir Penyewaan : {{ dataDetailSewa.akhir_sewa }}</p>
                      <p class="card-text">Lokai Jemput : {{ dataDetailSewa.lokasi_pickup }}</p>
                      <p class="card-text">Lokasi Tujuan : {{ dataDetailSewa.lokasi_destinasi }}</p>
                      <p class="card-text" v-if="dataDetailSewa.penggunaan_supir == 1">Supir : Pakai</p>
                      <p class="card-text" v-else>Supir : --</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                <i class="fas fa-undo"></i>
                Kembali
              </button>
              <a href="../form/ubah-sewa.html" class="btn btn-warning">
                <i class="fas fa-edit"></i> Ubah
              </a>
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
      sewa: [],
      apiToken: "",
      dataDetailSewa: {},
      sewa_id: "",
      dataRole: ""
    };
  },
  created() {
    this.dataRole = localStorage.getItem("user-role");
    this.apiToken = localStorage.getItem("user-token");

    axios
      .get("http://localhost:5000/api/sewa", {
        headers: {
          Authorization: "Bearer " + this.apiToken
        }
      })
      .then(response => {
        this.sewa = response.data;
      });
  },
  methods: {
    detailSewa(dataSewa, id) {
      this.dataDetailSewa = dataSewa;
      this.sewa_id = id;
    }
  },
  components: {
    Navbar
  }
};
</script>