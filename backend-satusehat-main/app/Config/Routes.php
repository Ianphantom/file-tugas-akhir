<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
// The Auto Routing (Legacy) is very dangerous. It is easy to create vulnerable apps
// where controller filters or CSRF protection are bypassed.
// If you don't want to define all routes, please use the Auto Routing (Improved).
// Set `$autoRoutesImproved` to true in `app/Config/Feature.php` and set the following to true.
// $routes->setAutoRoute(false);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Home::index');
$routes->get('/pasien', 'PasienCtl::index');
$routes->post('/pasien', 'PasienCtl::create');
$routes->post('/pasien/login', 'PasienCtl::login');
$routes->get('/pasien/(:any)', 'PasienCtl::show/$1');
$routes->post('/pasien/(:any)', 'PasienCtl::update/$1');

// dokter routes
$routes->post('/dokter', 'DokterCtl::create');
$routes->get('/dokter', 'DokterCtl::index');
$routes->get('/dokter/(:any)', 'DokterCtl::show/$1');

// Petugas RS
$routes->post('/petugasrs', 'PetugasRSCtl::create', ['filter' => 'levelThree']);
$routes->get('/petugasrs', 'PetugasRSCtl::index');
$routes->get('/petugasrs/klinik/(:any)', 'PetugasRSCtl::petugasKlinik/$1');
$routes->get('/petugasrs/(:any)', 'PetugasRSCtl::show/$1');
$routes->post('/petugasrs/login', 'PetugasRSCtl::login');

//perizinan
$routes->get('/perizinan', 'PerizinanCtl::index', ['filter' => 'onlyMe']);
$routes->post('/perizinan', 'PerizinanCtl::create', ['filter' => 'levelTwo']);
$routes->get('/perizinan/rs', 'PerizinanCtl::petugasRS_index', ['filter' => 'levelTwo']);
$routes->get('/perizinan/(:any)', 'PerizinanCtl::show/$1', ['filter' => 'onlyMe']);
$routes->post('/perizinan/update/(:any)', 'PerizinanCtl::update/$1');


//rekam medis
$routes->get('/rekammedis/list/(:any)', 'RekamMedisCtl::index/$1');
$routes->get('/rekammedis/specific/(:any)', 'RekamMedisCtl::show/$1', ['filter' => 'onlyMe']);
$routes->post('/rekammedis', 'RekamMedisCtl::create', ['filter' => 'levelTwo']);
$routes->get('/rekammedis/patient/list/(:any)', 'RekamMedisCtl::getPatientListRME/$1', ['filter' => 'levelTwo']);
$routes->get('/rekammedis/patient/(:any)', 'RekamMedisCtl::getPatientRME/$1', ['filter' => 'levelTwo']);



/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (is_file(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
