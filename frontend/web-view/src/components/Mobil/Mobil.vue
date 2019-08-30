<template>
  <!-- sidebar -->
  <navbar>
    <!-- content -->
    <div class="container">
      <h3 class="mt-5">DATA MOBIL</h3>
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
          <router-link to="/tambah-mobil" class="btn btn-primary float-right mr-3">
            <i class="fas fa-plus"></i>
            Tambah
            Mobil
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
                  <th scope="col">Nomor Plat</th>
                  <th scope="col">Jenis</th>
                  <th scope="col">Kapasitas</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Status</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(mobil, index) in mobil" :key="mobil.id">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ mobil.plat }}</td>
                  <td>{{ mobil.jenis_mobil }}</td>
                  <td>{{ mobil.kursi }}</td>
                  <td>{{ mobil.harga }}</td>
                  <td v-if="mobil.status == '1'">Sedang Dipakai</td>
                  <td v-else>Tidak Dipakai</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-warning"
                      data-toggle="modal"
                      data-target="#modalUbah"
                      @click="getMobil(mobil)"
                    >
                      <i class="fas fa-edit"></i> Ubah
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger ml-2"
                      data-toggle="modal"
                      data-target="#modalKonfirmasi"
                      @click="dataHapusMobil(mobil, mobil.main_id)"
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
                @click="hapusMobil(dataHapus, mobil_id)"
                type="button"
                class="btn btn-success"
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
              <h5 class="modal-title" id="exampleModalLabel">Form Ubah Mobil</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <!-- form -->
              <div class="form-group">
                <label for="jenis">Jenis</label>
                <select class="form-control" id="jenis" v-model="dataUbah.id_jenis_mobil">
                  <option
                    v-for="jenis in jenisMobil"
                    :key="jenis.id"
                    :value="jenis.id"
                  >{{ jenis.jenis_mobil }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="plat">Nomor Plat</label>
                <input type="text" v-model="dataUbah.plat" class="form-control" id="plat" />
              </div>
              <div class="form-group">
                <label for="kursi">Kapasitas</label>
                <input type="number" v-model="dataUbah.kursi" class="form-control" id="kursi" />
              </div>
              <div class="form-group">
                <label for="harga">Harga</label>
                <input type="number" v-model="dataUbah.harga" class="form-control" id="harga" />
              </div>
              <div class="form-group">
                <label for="status">Status Pemakaian</label>
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
                @click="ubahMobil(dataUbah, dataUbah.main_id)"
                type="button"
                class="btn btn-success"
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
      mobil: [],
      apiToken: "",
      dataHapus: {},
      dataUbah: {},
      ubah: {
        id_jenis_mobil: "",
        plat: "",
        kursi: "",
        harga: "",
        status: ""
      },
      jenisMobil: [],
      mobil_id: ""
    };
  },
  created() {
    this.apiToken = localStorage.getItem("user-token");

    axios
      .get("http://localhost:5000/api/mobil", {
        headers: {
          Authorization: "Bearer " + this.apiToken
        }
      })
      .then(response => {
        this.mobil = response.data;
      });

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
    getMobil(dataUbah) {
      this.dataUbah = dataUbah;
    },
    ubahMobil(dataUbah, id) {
      this.ubah.id_jenis_mobil = dataUbah.id_jenis_mobil;
      this.ubah.plat = dataUbah.plat;
      this.ubah.kursi = dataUbah.kursi;
      this.ubah.harga = dataUbah.harga;
      this.ubah.status = dataUbah.status;
      this.mobil_id = id;

      axios.put("http://localhost:5000/api/mobil/" + this.mobil_id, this.ubah, {
        headers: {
          Authorization: "Bearer " + this.apiToken
        }
      });

      window.location.reload();
    },
    dataHapusMobil(dataHapus, id) {
      this.dataHapus = dataHapus;
      this.mobil_id = id;
    },
    hapusMobil(dataHapus, id) {
      axios
        .delete("http://localhost:5000/api/mobil/" + this.mobil_id, {
          headers: {
            Authorization: "Bearer " + this.apiToken
          }
        })
        .then(response => {
          this.dataHapus.splice(index, 1);
        });

      window.location.reload();
    }
  },
  components: {
    Navbar
  }
};
</script>