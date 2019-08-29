<template>
  <navbar>
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-12 col-sm-12">
          <div class="card mb-5">
            <div class="card-header">
              <div class="row">
                <div class="col-md-8 col-sm-12">
                  <h3 class="text-left">FORM UBAH PROFIL</h3>
                </div>
                <div class="col-md-4 col-sm-12">
                  <router-link to="/user" class="btn btn-secondary float-right">
                    <i class="fas fa-undo"></i>
                    Kembali
                  </router-link>
                </div>
              </div>
            </div>
            <div class="card-body">
              <!-- form -->
              <form action method>
                <div class="form-group">
                  <label for="nama">Nama</label>
                  <input
                    type="text"
                    name="nama"
                    class="form-control"
                    id="nama"
                    value="Mathias Yeremia Aryadi"
                  />
                </div>
                <div class="form-group">
                  <label for="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    class="form-control"
                    id="username"
                    value="mathiasy123"
                  />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    class="form-control"
                    id="password"
                    value="mathias123"
                  />
                </div>
                <div class="form-group">
                  <label for="konfirm-password">Kofirmasi Password</label>
                  <input
                    type="konfirm-password"
                    name="konfirm-password"
                    class="form-control"
                    id="konfirm-password"
                  />
                </div>
                <div class="form-row">
                  <div class="form-group col-md-2">
                    <label>Picture</label>
                  </div>
                  <div class="form-group">
                    <div class="row">
                      <div class="col-sm-3">
                        <img
                          src="@/assets/images/dummy.jpg"
                          alt="User Profile"
                          class="img-thumbnail"
                        />
                      </div>
                      <div class="col-md-9">
                        <div class="custom-file">
                          <input type="file" class="custom-file-input" id="image" name="image" />
                          <label class="custom-file-label" for="image">Choose file</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" class="float-right btn btn-success">
                  <i class="fas fa-edit"></i>
                  Ubah
                </button>
              </form>
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