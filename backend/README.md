# endpoint list

list end point untuk memakai endpoint harus terlebih dahulu melakukan post request ke arphat/api/login

## login

- GET arphat/api/login
- POST arphat/api/login

## mobil

- GET arphat/api/mobil
- GET arphat/api/mobil/[id](WIP)
- POST arphat/api/mobil
- PUT arphat/api/mobil (WIP)
- DELETE arphat/api/mobil (WIP)

## mobil

- GET arphat/api/mobil
- GET arphat/api/mobil/[id](WIP)
- POST arphat/api/mobil
- PUT arphat/api/mobil (WIP)
- DELETE arphat/api/mobil (WIP)

## sewa

- GET arphat/api/sewa
- GET arphat/api/sewa/[id](WIP)
- POST arphat/api/sewa
- PUT arphat/api/sewa (WIP)
- DELETE arphat/api/sewa (WIP)

## user

- GET arphat/api/user
- GET arphat/api/user/[id](WIP)
- POST arphat/api/user
- PUT arphat/api/user (WIP)
- DELETE arphat/api/user (WIP)

## transaksi

- GET arphat/api/transaksi
- GET arphat/api/transaksi/[id](WIP)
- POST arphat/api/transaksi
- PUT arphat/api/transaksi (WIP)
- DELETE arphat/api/transaksi (WIP)

## staff

- GET arphat/api/staff
- GET arphat/api/staff/[id](WIP)
- POST arphat/api/staff
- PUT arphat/api/staff (WIP)
- DELETE arphat/api/staff (WIP)

## riwayat

# schemalist

bila tidak sesuai schema maka akan ditolak

0. login schema

```
{
  role: 'string (admin/staff)',
  username: 'string',
  password: 'string'
}
```

1. mobil post

```
{
  nama: 'string',
  jenis: 'string',
  merek: 'string',
  kursi: integer,
  tahun: integer
}
```

2. staff post

```
{
  kode: 'string',
  nama: 'string',
  alamat: 'stirng',
  telepon: number,
  username: 'string',
  password: 'string'
}
```

3. riwayat post

```
{
  id_transaksi: 'string',
  status: 'string'
}
```

**_ sisanya liat di schema.js dulu nanti gw tambahin _**
