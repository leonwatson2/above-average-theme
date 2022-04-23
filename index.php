<?php

/**
 * Not synced with production because of build folder.
 * For production the path is '/prodBuild/index.css'
 */
function boilerplate_load_assets() {
    wp_enqueue_style('ourmaincss', get_theme_file_uri('/build/index.css'));
    wp_enqueue_script('ourmainjs', get_theme_file_uri('/build/index.js'), array(), null, true);
    wp_enqueue_style('googlefonts','https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
}
  
  add_action('wp_enqueue_scripts', 'boilerplate_load_assets');
get_header(); 
?>

    <div id="ridiculousIdName"></div>

<?php

get_footer();

?>