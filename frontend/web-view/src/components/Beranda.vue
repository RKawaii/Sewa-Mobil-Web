<template>
  <navbar>
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-md-3 col-sm-12">
          <div class="card">
            <div class="card-body">
              <div class="media">
                <i class="fas fa-user fa-5x mr-4"></i>
                <div class="media-body">
                  <h5>PELANGGAN</h5>
                  <h3>20</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-12">
          <div class="card">
            <div class="card-body">
              <div class="media">
                <i class="fas fa-car fa-5x mr-4"></i>
                <div class="media-body">
                  <h5>MOBIL</h5>
                  <h3>20</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-12">
          <div class="card">
            <div class="card-body">
              <div class="media">
                <i class="fas fa-users fa-5x mr-4"></i>
                <div class="media-body">
                  <h5>STAFF</h5>
                  <h3>20</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-12">
          <div class="card">
            <div class="card-body">
              <div class="media">
                <i class="fas fa-hand-pointer fa-5x mr-4"></i>
                <div class="media-body">
                  <h5>PENYEWAAN</h5>
                  <h3>20</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- panel profil -->
      <div class="row mt-5">
        <div class="col-md-12 col-sm-12">
          <div class="card mb-3 card-profile">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img src="@/assets/images/dummy.jpg" class="card-img img-fluid" alt="User Image" />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h3 class="card-title">Mathias</h3>
                  <p class="card-text">Admin</p>
                  <p class="card-text">Terdaftar tanggal 19 Agustus 2019</p>
                  <router-link to="/profil" class="btn btn-primary">Lihat Profil</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- tabel -->
      <div class="row mt-5">
        <div class="col-md-12 col-sm-12">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Nomor</th>
                  <th scope="col">Kode Transaksi</th>
                  <th scope="col">Status</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(riwayat, index) in riwayat" :key="riwayat.id">
                  <td scope="row">{{ index + 1 }}</td>
                  <td>{{ riwayat.id_transaksi }}</td>
                  <td v-if="riwayat.status_riwayat == 1">Selesai</td>
                  <td>
                    <router-link to="/riwayat" class="btn btn-primary">Lihat</router-link>
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
      apiToken: ""
    };
  },
  created() {
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
  components: {
    Navbar
  }
};
</script>