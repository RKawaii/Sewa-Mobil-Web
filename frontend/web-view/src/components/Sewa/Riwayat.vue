<template>
  <navbar>
    <div class="container">
      <h3 class="mt-5">DATA RIWAYAT</h3>
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
                  <th scope="col">Kode Transaksi</th>
                  <th scope="col">Status</th>
                  <div v-if="dataRole == 'admin'">
                    <th scope="col">Aksi</th>
                  </div>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(riwayat, index) in riwayat" :key="riwayat.id">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ riwayat.kode_transaksi }}</td>
                  <td v-if="riwayat.status_riwayat == 1">Selesai</td>
                  <div v-if="dataRole == 'admin'">
                    <td>
                      <button
                        type="button"
                        class="btn btn-danger"
                        data-toggle="modal"
                        data-target="#modalKonfirmasi"
                        @click="dataHapusRiwayat(riwayat, riwayat.id)"
                      >
                        <i class="fas fa-edit"></i> Hapus
                      </button>
                    </td>
                  </div>
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

      <div
        class="modal fade"
        id="modalKonfirmasi"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Konfirmasi Hapus</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <h6>Apakah Anda yakin ingin menghapus data ini?</h6>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                <i class="fas fa-times"></i>
                Tidak
              </button>
              <button
                type="button"
                class="btn btn-success"
                @click="hapusRiwayat(dataHapus, riwayat_id)"
              >
                <i class="fas fa-check-circle"></i>
                Ya
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
      riwayat: [],
      apiToken: "",
      dataHapus: {},
      riwayat_id: "",
      dataRole: ""
    };
  },
  created() {
    this.dataRole = localStorage.getItem("user-role");
    this.apiToken = localStorage.getItem("user-token");

    axios
      .get("http://localhost:5000/api/riwayat", {
        headers: {
          Authorization: "Bearer " + this.apiToken
        }
      })
      .then(response => {
        this.riwayat = response.data;
      });
  },
  methods: {
    dataHapusRiwayat(dataHapus, id) {
      this.dataHapus = dataHapus;
      this.riwayat_id = id;
    },
    hapusRiwayat(dataHapus, id) {
      axios
        .delete("http://localhost:5000/api/riwayat/" + id, {
          headers: {
            Authorization: "Bearer " + this.apiToken
          }
        })
        .then(response => {
          this.dataHapus.splice(index, 1);
          alert("berhasil hapus");
        });

      window.location.reload();
    }
  },
  components: {
    Navbar
  }
};
</script>