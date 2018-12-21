<?php
/**
 * Plugin Name: Bloque base de mowomo
 * Description: Bloque básico de mowomo
 * Version: 1.0.0
 * Author: mowomo
 * Url: mowomo.com
 * @package mwm-bloque-base
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class mwm_bloque_base {
    private static $instance;
    private $slug;
    private $blockNames;
    private $wordpressPackages;
    private $version;

    public static function __init() {
        if (!self::$instance) {
            self::$instance = new mwm_bloque_base();
        } else {
            echo 'There is already a created instance of this class.';
        }
    }

    private function __construct() {
        // CONFIGURAR ESTAS VARIABLES -----------------------------------------------
        $this->slug              = 'mwm-bloque-base';
        $this->blockNames        = [
                                    'texto-completo'
                                ];
        $this->wordpressPackages = ['wp-blocks', 'wp-element', 'wp-editor'];
        $this->version           = '1.0.0';
        //---------------------------------------------------------------------------

        add_action( 'init', array( $this, 'register_dynamic_editor_assets' ) );
    }

    public function register_dynamic_editor_assets() {
        $slug              = $this->slug;
        $blockNames        = $this->blockNames;
        $wordpressPackages = $this->wordpressPackages;
        $version           = $this->version;

        for ($i=0; $i < count($blockNames); $i++) {
            wp_register_script(
                $slug .'/'. $blockNames[$i] .'-editor-script',
                plugins_url('./build/block.build.js', __FILE__),
                $wordpressPackages,
                $version
            );
            wp_register_style(
                $slug .'/'. $blockNames[$i] .'-editor-style',
                plugins_url('./build/block.editor.build.css', __FILE__),
                array( 'wp-edit-blocks' ),
                filemtime( plugin_dir_path( __FILE__ ) . './build/block.editor.build.css' )
            );
            wp_register_style(
                $slug .'/'. $blockNames[$i] .'-style',
                plugins_url('./build/block.style.build.css', __FILE__),
                array( 'wp-edit-blocks' ),
                filemtime( plugin_dir_path( __FILE__ ) . './build/block.style.build.css' )
            );

            register_block_type(
                $slug .'/'. $blockNames[$i],
                array(
                    'editor_script' => $slug .'/'. $blockNames[$i] .'-editor-script',
                    'editor_style'  => $slug .'/'. $blockNames[$i] .'-editor-style',
                    'style'         => $slug .'/'. $blockNames[$i] .'-style'
                ) );
        }
    }
}

mwm_bloque_base::__init();
