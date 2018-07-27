<?php
add_theme_support( 'post-thumbnails' );

//Disable Wordpress's <p> and <br> tag filters.
remove_filter( 'the_content', 'wpautop' );
remove_filter( 'the_excerpt', 'wpautop' );
?>
