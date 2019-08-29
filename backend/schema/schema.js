const joi = require('@hapi/joi');

const mobil = joi.object({
  harga: joi
    .number()
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
  plat: joi
    .string()
    .required()
    .error(() => {
      return '400';
    }),
  id_jenis_mobil: joi
    .number()
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
const staff = joi.object({
  kode: joi
    .string()
    .max(10)
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
  id_jenis_mobil: joi
    .number()
    .required()
    .error(() => {
      return '400';
    }),
  penggunaan_supir: joi
    .number()
    .required()
    .error(() => {
      return '400';
    }),
  mulai_sewa: joi
    .string()
    .required()
    .error(() => {
      return '400';
    }),
  akhir_sewa: joi
    .string()
    .required()
    .error(() => {
      return '400';
    }),
  lokasi_pickup: joi
    .string()
    .required()
    .error(() => {
      return '400';
    }),
  lokasi_destinasi: joi
    .string()
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
    }),
  status_transaksi: joi
    .string()
    .required()
    .error(() => {
      return '400';
    })
});
const user = joi.object({
  UID: joi
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
  alamat: joi
    .string()
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
const login = joi.object({
  role: joi
    .string()
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
const supir = joi.object({
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
  telpon: joi
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
const id = joi.object({
  id: joi
    .number()
    .required()
    .error(() => {
      return '400';
    })
});
const jenis = joi.object({
  jenis_mobil: joi
    .string()
    .required()
    .error(() => {
      return '400';
    })
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
