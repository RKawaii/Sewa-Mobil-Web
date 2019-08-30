<template>
  <navbar>
    <div class="container">
      <h3 class="mt-5">DATA SUPIR</h3>
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
          <router-link to="/tambah-supir" class="btn btn-primary float-right mr-3">
            <i class="fas fa-plus"></i>
            Tambah
            Supir
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
                  <th scope="col">Nama</th>
                  <th scope="col">Alamat</th>
                  <th scope="col">Telepon</th>
                  <th scope="col">Status</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(supir, index) in supir" :key="supir.id">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ supir.nama }}</td>
                  <td>{{ supir.alamat }}</td>
                  <td>{{ supir.telepon }}</td>
                  <td v-if="supir.status == '1'">Sedang Dipakai</td>
                  <td v-else>Tidak Dipakai</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-warning"
                      data-toggle="modal"
                      data-target="#modalUbah"
                      @click="getSupir(supir)"
                    >
                      <i class="fas fa-edit"></i> Ubah
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger ml-2"
                      data-toggle="modal"
                      data-target="#modalKonfirmasi"
                      @click="dataHapusSupir(supir, supir.id)"
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

      <!-- modal konfirmasi -->
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
                @click="hapusSupir(dataHapus, supir_id)"
              >
                <i class="fas fa-check-circle"></i>
                Ya
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- modal ubah -->
      <div
        class="modal fade"
        id="modalUbah"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Form Ubah Supir</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <!-- form -->
              <div class="form-group">
                <label for="nama">Nama</label>
                <input
                  type="text"
                  v-model="dataUbah.nama"
                  class="form-control"
                  id="nama"
                  value="Andi"
                />
              </div>
              <div class="form-group">
                <label for="alamat">Alamat</label>
                <textarea v-model="dataUbah.alamat" class="form-control" id="alamat" rows="3"></textarea>
              </div>
              <div class="form-group">
                <label for="telepon">Telepon</label>
                <input type="number" v-model="dataUbah.telepon" class="form-control" id="telepon" />
              </div>
              <div class="form-group">
                <label for="status">Status</label>
                <select class="form-control" id="status" v-model="dataUbah.status">
                  <option value="0">Tidak Dipakai</option>
                  <option value="1">Sedang Dipakai</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                <i class="fas fa-undo"></i>
                Kembali
              </button>
              <button
                type="button"
                class="btn btn-success"
                @click="ubahSupir(dataUbah, dataUbah.id)"
              >
                <i class="fas fa-edit"></i> Ubah
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
      supir: [],
      apiToken: "",
      dataHapus: {},
      dataUbah: {},
      ubah: {
        nama: "",
        alamat: "",
        telepon: "",
        status: ""
      },
      supir_id: ""
    };
  },
  created() {
    this.apiToken = localStorage.getItem("user-token");

    axios
      .get("http://localhost:5000/api/supir", {
        headers: {
          Authorization: "Bearer " + this.apiToken
        }
      })
      .then(response => {
        this.supir = response.data;
      });
  },
  methods: {
    getSupir(dataUbah) {
      this.dataUbah = dataUbah;
    },
    ubahSupir(dataUbah, id) {
      this.ubah.nama = dataUbah.nama;
      this.ubah.alamat = dataUbah.alamat;
      this.ubah.telepon = dataUbah.telepon;
      this.ubah.status = dataUbah.status;
      this.staff_id = id;

      axios.put("http://localhost:5000/api/supir/" + this.staff_id, this.ubah, {
        headers: {
          Authorization: "Bearer " + this.apiToken
        }
      });

      window.location.reload();
    },
    dataHapusSupir(dataHapus, id) {
      this.dataHapus = dataHapus;
      this.supir_id = id;
    },
    hapusSupir(dataHapus, id) {
      axios
        .delete("http://localhost:5000/api/supir/" + id, {
          headers: {
            Authorization: "Bearer " + this.apiToken
          }
        })
        .then(response => {
          this.dataHapus.splice(index, 1);
          console.log("berhasil hapus");
        });

      window.location.reload();
    }
  },
  components: {
    Navbar
  }
};
</script>