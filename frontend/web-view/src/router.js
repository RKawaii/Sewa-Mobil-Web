import Vue from "vue";
import Router from "vue-router";
// import komponen halaman
import Beranda from "@/components/Beranda";
import User from "@/components/User/User";
import Profil from "@/components/User/Profil";
import Mobil from "@/components/Mobil/Mobil";
import Sewa from "@/components/Sewa/Sewa";
import Transaksi from "@/components/Sewa/Transaksi";
import Riwayat from "@/components/Sewa/Riwayat";
import Staff from "@/components/Staff/Staff";
import Supir from "@/components/Supir/Supir";
import Login from "@/components/Auth/Login";
import UbahUser from "@/components/User/UbahUser";
import TambahMobil from "@/components/Mobil/TambahMobil";
import TambahStaff from "@/components/Staff/TambahStaff";
import TambahSupir from "@/components/Supir/TambahSupir";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/beranda",
      name: "beranda",
      component: Beranda
    },
    {
      path: "/user",
      name: "user",
      component: User
    },
    {
      path: "/profil",
      name: "profil",
      component: Profil
    },
    {
      path: "/mobil",
      name: "mobil",
      component: Mobil
    },
    {
      path: "/sewa",
      name: "sewa",
      component: Sewa
    },
    {
      path: "/transaksi",
      name: "transaksi",
      component: Transaksi
    },
    {
      path: "/riwayat",
      name: "riwayat",
      component: Riwayat
    },
    {
      path: "/Staff",
      name: "staff",
      component: Staff
    },
    {
      path: "/supir",
      name: "supir",
      component: Supir
    },
    {
      path: "/ubah-user",
      name: "ubah-user",
      component: UbahUser
    },
    {
      path: "/tambah-mobil",
      name: "tambah-mobil",
      component: TambahMobil
    },
    {
      path: "/tambah-supir",
      name: "tambah-supir",
      component: TambahSupir
    },
    {
      path: "/tambah-staff",
      name: "tambah-staff",
      component: TambahStaff
    }
  ],
  mode: "history",
  linkActiveClass: "active"
});