# Backend SatuSehat

Dokumentasi ini akan memberikan panduan tentang proyek backend satusehat yang dibangun dengan menggunakan CodeIgniter4

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal beberapa prasyarat berikut ini:

- composer: [Download Composer](https://getcomposer.org/).
- php: menggunakan versi minimal php7.4 dan enable intl ext
- Database: SQL Server

Jika menggunakan XAMPP, lakukan setting dibawah ini

- Buka file `xampp/php/php.ini`
- hapus `;` dari code `;extension=php_intl.dll`

## Instalasi

Berikut adalah langkah-langkah untuk menjalankan proyek menggunakan CodeIgniter

```bash
# Install Depedencies
composer install --no-dev
```

setelah melakukan instalasi tersebut, buat folder baru yang bernama `.env` yang berisi data data berikut ini

```php
CI_ENVIRONMENT = development

# Masukkan kode token yang mau dibuat
TOKEN_SECRET = abcdefg

# Masukkan alamat kode blockchain network
BLOCKCHAIN_NETWORK = abcdefg

TOKEN_ACCESS = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6InNhdHVzZWhhdHNlcnZlciIsImlhdCI6MTUxNjIzOTAyMn0.6X5O2kybJnHxIoV31596YAuZrG-7fxk8_ZulugQvW8Q

# Lakukan Setting Database mengikuti format database server masing masing
database.default.hostname = localhost
database.default.database = satusehat
database.default.username = root
database.default.password =
database.default.DBDriver = MySQLi
database.default.DBPrefix =
database.default.port = 3306
```

Untuk menggunakan proyek, jalankan kode berikut ini:

```bash
php spark serve
```
