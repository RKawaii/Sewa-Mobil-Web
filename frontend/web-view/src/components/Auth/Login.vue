<template>
  <!-- content -->
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5 col-sm-12">
        <!-- form card -->
        <div class="card shadow-lg">
          <div class="card-body">
            <img src="@/assets/images/logo.png" alt="Logo Arphat" class="mx-auto d-block img-fluid" />
            <div v-if="wrongLogin" class="alert alert-danger alert-dismissible show" role="alert">
              <strong>Gagal Login!</strong> periksa username atau password Anda.
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                class="form-control"
                v-model="loginInput.username"
                id="username"
                placeholder="Masukkan Username . . ."
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                v-model="loginInput.password"
                id="password"
                placeholder="Masukkan Password . . ."
              />
            </div>
            <div class="form-group">
              <label for="role">Masuk Sebagai</label>
              <select class="form-control" id="role" v-model="loginInput.role">
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </select>
            </div>
            <button class="btn btn-primary btn-block" @click="login">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loginInput: {
        username: "",
        password: "",
        role: ""
      },
      wrongLogin: null,
      loginToken: ""
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:5000/api/login", this.loginInput)
        .then(request => {
          this.loginToken = request.data.Token;

          localStorage.setItem("user-token", this.loginToken);

          this.$router.push("/beranda");
        })
        .catch(error => {
          this.wrongLogin = true;
        });
    }
  }
};
</script>