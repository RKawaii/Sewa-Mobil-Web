# endpoint list

list end point untuk memakai endpoint harus terlebih dahulu melakukan post request ke /api/login

### login

- GET /api/login
- POST /api/login

### mobil

- GET /api/mobil
- GET /api/mobil/[id]
- POST /api/mobil
- PUT /api/mobil/[id]
- DELETE /api/mobil/[id]

### jenis kendaraan

- GET /api/jenis
- GET /api/jenis/[id]
- POST /api/jenis
- PUT /api/jenis/[id]
- DELETE /api/jenis/[id]

### sewa (WIP)

- GET /api/sewa
- GET /api/sewa/[id]
- POST /api/sewa
- PUT /api/sewa
- DELETE /api/sewa

### user

- GET /api/user
- GET /api/user/[id]
- POST /api/user
- PUT /api/user/[id]
- DELETE /api/user/[id]

### transaksi (WIP)

- GET /api/transaksi
- GET /api/transaksi/[id](WIP)
- POST /api/transaksi
- PUT /api/transaksi (WIP)
- DELETE /api/transaksi (WIP)

### staff

- GET /api/staff
- GET /api/staff/[id]
- POST /api/staff
- PUT /api/staff/[id]
- DELETE /api/staff/[id]

### riwayat (WIP)

- GET /api/riwayat
- GET /api/riwayat/[id](WIP)
- POST /api/riwayat
- PUT /api/riwayat (WIP)
- DELETE /api/riwayat (WIP)

### supir

- GET /api/supir
- GET /api/supir/[id]
- POST /api/supir
- PUT /api/supir/[id]
- DELETE /api/supir/[id]

# input schemalist

bila tidak sesuai schema maka akan ditolak

0. login

```
{
  role: 'string (admin/staff/user)',
  username: 'string',
  password: 'string'
}
```

1. mobil

```
{
  id_jenis: number,
  plat: 'string',
  kursi: integer,
  harga: number,
  status: 'string'
}
```

2. staff

```
{
  kode: 'string max:10',
  nama: 'string',
  username: 'string',
  password: 'string'
}
```

3. riwayat

```
{
  id: 'string',
  status: 'string'
}
```

4. user

```
{
  UID: 'string',
  telepon: 'number',
  username: 'string',
  password: 'string',
  email: 'email string'
}
```

5. supir

```
{
  nama: 'string',
  alamat: 'string',
  telpon: 'string',
  status: 'string'
}
```

6. transaksi

```
{

}
```

7. jenis_kendaraan

```
{
  jenis_mobil: 'string'
}
```

8. sewa

```
{
  id_user: number,
  id_jenis: number,
  penggunaan_supir: number (0/1),
  mulai_sewa: 'string format: YYYY-MM-DD HH:mm:SS',
  akhir_sewa: 'string',
  lokasi_pickup: 'string',
  lokasi_destinasi: 'string'

}
```

# output schemalist

penamaan output schema sama seperti output database
