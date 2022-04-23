<?php


function boilerplate_add_support() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
}

/* Custom Post Type Start */

function add_social_links_post_type() {
	register_post_type( 'social_link',
	
	array(
		'labels' => array(
		 'name' => __( 'Social Links' ),
		 'singular_name' => __( 'Social Link' ),
     'add_new_item'=> __('Add New Social Link'),
     'edit_item'=> __('Edit Social Link'),
		),
		'public' => true,
		'has_archive' => false,
		'show_in_rest' => true,
		'rewrite' => array('slug' => 'social'),
		'map_meta_cap' => true,
    'publicly_queryable' => false,
    'supports' => array('title'),
    'capability_type' => 'social_link'
	 )
	);

}
  function add_social_links_caps(){
    
    $role = get_role('podcast_manager');
    $roleA = get_role('administrator');
    $cap = array(
        "edit_social_link",  
        "read_social_link",
        "delete_social_link",
        "edit_social_link",
        "edit_social_links",
        "edit_others_social_links",
        "delete_social_links",
        "publish_social_links",
        "read_private_social_links",
        "read",
        "delete_private_social_links",
        "delete_published_social_links",
        "delete_others_social_links",
        "edit_private_social_links",
        "edit_published_social_links",
    );
    foreach ($cap as $value){
      $roleA->add_cap($value);
      $role->add_cap($value);
    }
  }
	// Hooking up our function to theme setup
	add_action( 'init', 'add_social_links_post_type' );
	add_action( 'init', 'add_social_links_caps');
	add_filter( 'acf/settings/rest_api_format', function () {
    return 'standard';
} );

//Remove from the Side Menu
add_action( 'admin_menu', 'remove_default_post_type' );
 
function remove_default_post_type() {
	remove_menu_page( 'index.php' );                  //Dashboard
  remove_menu_page( 'edit.php' );                   //Posts
  // remove_menu_page( 'upload.php' );                 //Media
  remove_menu_page( 'edit.php?post_type=page' );    //Pages
  remove_menu_page( 'edit-comments.php' );          //Comments
  // remove_menu_page( 'themes.php' );                 //Appearance
  // remove_menu_page( 'plugins.php' );                //Plugins
  // remove_menu_page( 'users.php' );                  //Users
  // remove_menu_page( 'tools.php' );                  //Tools
  // remove_menu_page( 'options-general.php' );        //Settings
}


add_action('after_setup_theme', 'boilerplate_add_support');