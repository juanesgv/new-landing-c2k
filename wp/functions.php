<?php

function astra_child_enqueue_styles() {
    wp_enqueue_style(
        'astra-parent-style',
        get_template_directory_uri() . '/style.css'
    );

    wp_enqueue_style(
        'astra-child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array('astra-parent-style'), 
        wp_get_theme()->get('Version')
    );
}
add_action('wp_enqueue_scripts', 'astra_child_enqueue_styles');



function enqueue_bootstrap() {
    wp_enqueue_style(
        'bootstrap-css',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
        array(),
        '5.3.2'
    );

    wp_enqueue_script(
        'bootstrap-js',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
        array('jquery'),
        '5.3.2',
        true
    );
}
add_action('wp_enqueue_scripts', 'enqueue_bootstrap');


function clave2000_enqueue_pqr_form_js() {

    if (!is_page('pqr')) {
        return;
    }

    wp_enqueue_script(
        'pqr-form',
        get_stylesheet_directory_uri() . '/js/pqr-form.js',
        array('bootstrap-js'),
        filemtime(get_stylesheet_directory() . '/js/pqr-form.js'),
        true
    );
}

add_action('wp_enqueue_scripts', 'clave2000_enqueue_pqr_form_js', 20);


function clave2000_enqueue_credito_form_js() {

    if (!is_page('credito_conductores')) {
        return;
    }

    wp_enqueue_script(
        'credito-conductores-form',
        get_stylesheet_directory_uri() . '/js/credito-conductores-form.js',
        array('bootstrap-js'),
        filemtime(get_stylesheet_directory() . '/js/credito-conductores-form.js'),
        true
    );
}

add_action('wp_enqueue_scripts', 'clave2000_enqueue_credito_form_js', 20);

function clave2000_enqueue_propietarios_form_js() {

    if (!is_page('credito_propietarios')) {
        return;
    }

    wp_enqueue_script(
        'credito-propietarios-form',
        get_stylesheet_directory_uri() . '/js/credito-propietarios-form.js',
        array('bootstrap-js'),
        filemtime(get_stylesheet_directory() . '/js/credito-propietarios-form.js'),
        true
    );
}

add_action('wp_enqueue_scripts', 'clave2000_enqueue_propietarios_form_js', 20);

function clave2000_enqueue_emprendedores_form_js() {

    if (!is_page('credito_emprendedores')) {
        return;
    }

    wp_enqueue_script(
        'credito-emprendedores-form',
        get_stylesheet_directory_uri() . '/js/credito-emprendedores-form.js',
        array('bootstrap-js'),
        filemtime(get_stylesheet_directory() . '/js/credito-emprendedores-form.js'),
        true
    );
}

add_action('wp_enqueue_scripts', 'clave2000_enqueue_emprendedores_form_js', 20);

function clave2000_enqueue_landing_forms() {
    $landing_forms = array(
        'credito-para-taxistas' => 'landing-form.js',
        'credito-para-taxistas-bogota' => 'credito-para-taxistas-bogota.js',
        'credito-para-taxistas-cali' => 'credito-para-taxistas-cali.js',
        'credito-para-taxistas-medellin' => 'credito-para-taxistas-medellin.js',
        'clave2000' => 'formulario-organico-home.js',
    );

    foreach ($landing_forms as $page_slug => $script_file) {
        if (is_page($page_slug)) {
            wp_enqueue_script(
                'landing-form-' . sanitize_key($page_slug),
                get_stylesheet_directory_uri() . '/js/' . $script_file,
                array('bootstrap-js'),
                filemtime(get_stylesheet_directory() . '/js/' . $script_file),
                true
            );
        }
    }
}
add_action('wp_enqueue_scripts', 'clave2000_enqueue_landing_forms', 20);

function clave2000_enqueue_new_landing_forms() {
    $landing_forms = array(
        'credito-para-taxistas-copy' => 'landing-form-bogota.js',
    );

    foreach ($landing_forms as $page_slug => $script_file) {
        if (is_page($page_slug)) {
            wp_enqueue_script(
                'landing-form-' . sanitize_key($page_slug),
                get_stylesheet_directory_uri() . '/js/' . $script_file,
                array('bootstrap-js'),
                filemtime(get_stylesheet_directory() . '/js/' . $script_file),
                true
            );
        }
    }
}
add_action('wp_enqueue_scripts', 'clave2000_enqueue_new_landing_forms', 20);

function clave2000_enqueue_asistente_credito_home_js() {

    if (!is_page('clave-2000-copy')) {
        return;
    }

    wp_enqueue_script(
        'asistente-credito-home',
        get_stylesheet_directory_uri() . '/js/asistente-credito-home.js',
        array('bootstrap-js'),
        filemtime(get_stylesheet_directory() . '/js/asistente-credito-home.js'),
        true
    );
}
add_action('wp_enqueue_scripts', 'clave2000_enqueue_asistente_credito_home_js', 20);

function enqueue_material_icons() {
    wp_enqueue_style(
        'material-icons',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        [],
        null
    );
}
add_action('wp_enqueue_scripts', 'enqueue_material_icons');


function enqueue_asistente_styles() {
    if ( is_page( 'clave-2000-copy' ) ) {
        wp_enqueue_style(
            'asistente-styles',
            get_stylesheet_directory_uri() . '/css/asistente_styles.css',
            [],
            '1.0.0'
        );
    }
}
add_action( 'wp_enqueue_scripts', 'enqueue_asistente_styles' );


function enqueue_landing_form_styles() {
    if ( is_page( 'credito-para-taxistas-copy' ) ) {
        wp_enqueue_style(
            'landing_form-styles',
            get_stylesheet_directory_uri() . '/css/landing-form-styles.css',
            [],
            '1.0.0'
        );
    }
}
add_action( 'wp_enqueue_scripts', 'enqueue_landing_form_styles' );


// function clave2000_modo_mantenimiento() {

//     // No aplicar en admin
//     if (is_admin()) return;

//     // Permitir administradores
//     if (current_user_can('administrator')) return;

//     // Permitir login
//     if ($GLOBALS['pagenow'] === 'wp-login.php') return;

//     // Permitir REST API
//     if (defined('REST_REQUEST') && REST_REQUEST) return;

//     // ID o slug de la página de mantenimiento
//     if (!is_page('mantenimiento')) {

//         wp_redirect(home_url('/mantenimiento/'));
//         exit;
//     }
// }

// add_action('template_redirect', 'clave2000_modo_mantenimiento');