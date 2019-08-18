const joi = require('@hapi/joi');

const mobil = joi.object({
  nama: joi
    .string()
    .required()
    .error(() => {
      return '400';
    }),
  jenis: joi
    .string()
    .required()
    .error(() => {
      return '400';
    }),
  merek: joi
    .string()
    .required()
    .error(() => {
      return '400';
    }),
  kursi: joi
    .number()
    .required()
    .error(() => {
      return '400';
    }),
  tahun: joi
    .number()
    .required()
    .error(() => {
      return '400';
    })
});
const staff = joi.object({
  kode: joi
    .string()
    .max(5)
    .required()
    .error(() => {
      return '400';
    }),
  nama: joi
    .string()
    .required()
    .error(() => {
      return '400';
    }),
  alamat: joi
    .string()
    .required()
    .error(() => {
      return '400';
    }),
  telepon: joi
    .number()
    .required()
    .error(() => {
      return '400';
    }),
  username: joi
    .string()
    .required()
    .error(() => {
      return '400';
    }),
  password: joi
    .string()
    .required()
    .error(() => {
      return '400';
    })
});
const riwayat = joi.object({
  id_transaksi: joi
    .string()
    .required()
    .error(() => {
      return '400';
    }),
  status: joi
    .string()
    .required()
    .error(() => {
      return '400';
    })
});
const sewa = joi.object({
  id_user: joi
    .number()
    .required()
    .error(() => {
      return '400';
    }),
  id_mobil: joi
    .number()
    .required()
    .error(() => {
      return '400';
    }),
  tanggal_sewa: joi
    .date()
    .required()
    .error(() => {
      return '400';
    })
});
const transaksi = joi.object({
  kode_transaksi: joi
    .string()
    .required()
    .error(() => {
      return '400';
    }),
  id_sewa: joi
    .number()
    .required()
    .error(() => {
      return '400';
    }),
  biaya: joi
    .number()
    .required()
    .error(() => {
      return '400';
    })
});
const user = joi.object({
  nama: joi
    .string()
    .required()
    .error(() => {
      return '400';
    }),
  alamat: joi
    .string()
    .required()
    .error(() => {
      return '400';
    }),
  telepon: joi
    .number()
    .required()
    .error(() => {
      return '400';
    }),
  username: joi
    .string()
    .required()
    .error(() => {
      return '400';
    }),
  password: joi
    .string()
    .required()
    .error(() => {
      return '400';
    }),
  email: joi
    .string()
    .email()
    .required()
    .error(() => {
      return '400';
    })
});
module.exports = {
  mobil: mobil,
  staff: staff,
  riwayat: riwayat,
  sewa: sewa,
  transaksi: transaksi,
  user: user
};
