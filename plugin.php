<?php
/*
Plugin Name: Unit Converter by Calculator.iO
Plugin URI: https://www.calculator.io/unit-converter/
Description: This free online tool converts common length, temperature, area, volume, weight, and time units.
Version: 1.0.0
Author: Calculator.io
Author URI: https://www.calculator.io/
License: GPLv2 or later
Text Domain: ci_unit_converter
*/

if (!function_exists('add_shortcode')) return "No direct call for Unit Converter by Calculator.iO";

function display_ci_unit_converter(){
    $page = 'index.html';
    return '<h2><a href="https://www.calculator.io/unit-converter/" target="_blank"><img src="' . esc_url(plugins_url('assets/images/icon-48.png', __FILE__ )) . '" width="48" height="48"></a> Unit Converter</h2><div><iframe style="background:transparent; overflow: scroll" src="' . esc_url(plugins_url($page, __FILE__ )) . '" width="100%" frameBorder="0" allowtransparency="true" onload="this.style.height = this.contentWindow.document.documentElement.scrollHeight + \'px\';" id="ci_unit_converter_iframe"></iframe></div>';
}

add_shortcode( 'ci_unit_converter', 'display_ci_unit_converter' );