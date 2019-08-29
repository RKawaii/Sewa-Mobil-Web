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
                  <th scope="col">User</th>
                  <th scope="col">Plat Mobil</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(sewa, index) in sewa" :key="sewa.id">
                  <td scope="col">{{ index + 1 }}</td>
                  <td scope="col">{{ sewa.email }}</td>
                  <td scope="col">{{ sewa.jenis_mobil }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-info"
                      data-toggle="modal"
                      data-target="#modalDetail1"
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
                      <p class="card-text">Kode Pelanggan : PL101</p>
                      <p class="card-text">Nama : Mathias</p>
                      <p class="card-text">Telepon : 08999000697</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12 col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Info Mobil</h5>
                      <p class="card-text">Kode Mobil : MB101</p>
                      <p class="card-text">Nomor Plat : B2024TFT</p>
                      <p class="card-text">Jenis : Avanza</p>
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
                      <p class="card-text">Kode Sewa : SW101</p>
                      <p class="card-text">Tanggal Penyewaan : 20 Agustus 2019</p>
                      <p class="card-text">Lama Penyewaan : 12 jam</p>
                      <p class="card-text">Tujuan : Bekasi Timur</p>
                      <p class="card-text">Supir : --</p>
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

      <!-- modal detail 2 -->
      <div
        class="modal fade"
        id="modalDetail2"
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
                      <p class="card-text">Kode Pelanggan : PL102</p>
                      <p class="card-text">Nama : Alvin</p>
                      <p class="card-text">Telepon : 08999000112</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12 col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Info Mobil</h5>
                      <p class="card-text">Kode Mobil : MB102</p>
                      <p class="card-text">Nomor Plat : B2000TFT</p>
                      <p class="card-text">Jenis : Ayla</p>
                      <p class="card-text">Merk : Suzuki</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12 col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Info Penyewaan</h5>
                      <p class="card-text">Kode Sewa : SW102</p>
                      <p class="card-text">Tanggal Penyewaan : 20 Juli 2019</p>
                      <p class="card-text">Lama Penyewaan : 8 jam</p>
                      <p class="card-text">Tujuan : Bogor</p>
                      <p class="card-text">Supir : Pakai</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12 col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Info Supir</h5>
                      <p class="card-text">Kode Sewa : SP101</p>
                      <p class="card-text">Nama Supir : Andi</p>
                      <p class="card-text">Telepon : 08999758</p>
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
      apiToken: ""
    };
  },
  created() {
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
  components: {
    Navbar
  }
};
</script>