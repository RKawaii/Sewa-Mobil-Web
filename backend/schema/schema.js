const joi = require('@hapi/joi');

const mobil = joi.object({
  harga: joi.number().required(),
  kursi: joi.number().required(),
  plat: joi.string().required(),
  id_jenis_mobil: joi.number().required(),
  status: joi.string().required()
});
const staff = joi.object({
  kode: joi
    .string()
    .max(10)
    .required(),
  nama: joi.string().required(),
  username: joi.string().required(),
  password: joi.string().required()
});
const riwayat = joi.object({
  id_transaksi: joi.string().required(),
  status: joi.string().required()
});
const sewa = joi.object({
  id_user: joi.number().error(() => {
    return '400';
  }),
  id_jenis_mobil: joi.number().required(),
  penggunaan_supir: joi.number().required(),
  mulai_sewa: joi.string().required(),
  akhir_sewa: joi.string().required(),
  lokasi_pickup: joi.string().required(),
  lokasi_destinasi: joi.string().required()
});
const transaksi = joi.object({
  kode_transaksi: joi.string().required(),
  id_sewa: joi.number().required(),
  biaya: joi.number().required(),
  status_transaksi: joi.string().required()
});
const user = joi.object({
  UID: joi.string().required(),
  telepon: joi.number().required(),
  alamat: joi.string().required(),
  username: joi.string().required(),
  password: joi.string().required(),
  email: joi
    .string()
    .email()
    .required()
});
const login = joi.object({
  role: joi.string().required(),
  username: joi.string().required(),
  password: joi.string().required()
});
const supir = joi.object({
  nama: joi.string().required(),
  alamat: joi.string().required(),
  telepon: joi.string().required(),
  status: joi.string().required()
});
const id = joi.object({
  id: joi.number().required()
});
const jenis = joi.object({
  jenis_mobil: joi.string().required()
});
const getting = joi.object({
  search: joi.string(),
  skip: joi.number()
});
module.exports = {
  mobil: mobil,
  staff: staff,
  riwayat: riwayat,
  sewa: sewa,
  transaksi: transaksi,
  user: user,
  login: login,
  supir: supir,
  id: id,
  jenis: jenis,
  getting: getting
};
