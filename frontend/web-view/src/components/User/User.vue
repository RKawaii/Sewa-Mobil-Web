<template>
  <navbar>
    <div class="container">
      <h3 class="mt-5">DATA USER</h3>
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
                  <th scope="col">Kode</th>
                  <th scope="col">Telepon</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(usr, index) in user" :key="usr.id">
                  <th scope="row">{{ index + 1 }}</th>
                  <td v-if="usr.UID === ''">---</td>
                  <td v-else>{{ usr.UID }}</td>
                  <td>{{ usr.telepon }}</td>
                  <td>{{ usr.username }}</td>
                  <td>{{ usr.email }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-warning"
                      data-toggle="modal"
                      data-target="#modalUbah"
                    >
                      <i class="fas fa-edit"></i> Ubah
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger ml-2"
                      data-toggle="modal"
                      data-target="#modalKonfirmasi"
                      @click="dataDelete(usr, usr.id)"
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
              <button type="button" class="btn btn-success" @click="hapusUser(dataHapus, user_id)">
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
              <h5 class="modal-title" id="exampleModalLabel">Form Ubah Pelanggan</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="kode">Kode</label>
                <input type="text" name="kode" class="form-control" id="kode" value="PL101" />
              </div>
              <div class="form-group">
                <label for="nama">Nama</label>
                <input type="text" name="nama" class="form-control" id="nama" value="Mathias" />
              </div>
              <div class="form-group">
                <label for="alamat">Alamat</label>
                <textarea name="alamat" class="form-control" id="alamat" rows="3">Kelapa Gading</textarea>
              </div>
              <div class="form-group">
                <label for="telepon">Telepon</label>
                <input
                  type="number"
                  name="telepon"
                  class="form-control"
                  id="telepon"
                  value="08999000697"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                <i class="fas fa-undo"></i>
                Kembali
              </button>
              <button type="button" class="btn btn-success">
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
      user: [],
      apiToken: "",
      dataHapus: {},
      user_id: ""
    };
  },
  created() {
    this.apiToken = localStorage.getItem("user-token");

    axios
      .get("http://localhost:5000/api/user", {
        headers: {
          Authorization: "Bearer " + this.apiToken
        }
      })
      .then(response => {
        this.user = response.data;
      });
  },
  methods: {
    dataDelete(dataHapus, id) {
      this.dataHapus = dataHapus;
      this.user_id = id;
    },
    hapusUser(dataHapus, id) {
      axios
        .delete("http://localhost:5000/api/user/" + id, {
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