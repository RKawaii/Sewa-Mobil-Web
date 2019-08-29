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
            <p class="text-success">Hijau = Pakai supir</p>
            <p class="text-danger">Merah = Tidak pakai supir</p>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Nomor</th>
                  <th scope="col">Kode Transaksi</th>
                  <th scope="col">Kode Sewa</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-danger">
                  <th scope="row">1</th>
                  <td>TR101</td>
                  <td>SW101</td>
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
                      class="btn btn-success"
                      data-toggle="modal"
                      data-target="#modalSelesaikan"
                    >
                      <i class="fas fa-check"></i> Selesaikan
                    </button>
                  </td>
                </tr>
                <tr class="text-success">
                  <th scope="row">2</th>
                  <td>TR102</td>
                  <td>SW102</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-info"
                      data-toggle="modal"
                      data-target="#modalDetail2"
                    >
                      <i class="fas fa-info"></i> Detail
                    </button>
                    <button
                      type="button"
                      class="btn btn-success disabled"
                      data-toggle="modal"
                      data-target="#modalSelesaikan"
                    >
                      <i class="fas fa-check"></i> Selesaikan
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
              <h5 class="modal-title" id="exampleModalLabel">Detail Transaksi</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Struk Tagihan</h5>
                      <p class="card-text">Kode Sewa : SW101</p>
                      <p class="card-text">Kode Transaksi : TR101</p>
                      <p class="card-text">Rincian Biaya :</p>
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Nomor</th>
                            <th scope="col">Keterangan</th>
                            <th scope="col">Biaya</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>12 jam sewa</td>
                            <td>Rp 350.000</td>
                          </tr>
                        </tbody>
                      </table>
                      <p class="card-text">
                        <strong>Total : Rp 350.000</strong>
                      </p>
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
              <h5 class="modal-title" id="exampleModalLabel">Detail Transaksi</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Struk Tagihan</h5>
                      <p class="card-text">Kode Sewa : SW102</p>
                      <p class="card-text">Kode Transaksi : TR102</p>
                      <p class="card-text">Rincian Biaya :</p>
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Nomor</th>
                            <th scope="col">Keterangan</th>
                            <th scope="col">Biaya</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>8 jam sewa</td>
                            <td>Rp 250.000</td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>Supir</td>
                            <td>Rp 50.000</td>
                          </tr>
                        </tbody>
                      </table>
                      <p class="card-text">
                        <strong>Total : Rp 300.000</strong>
                      </p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </navbar>
</template>

<script>
import Navbar from "@/components/Template/Navbar";
export default {
  components: {
    Navbar
  }
};
</script>