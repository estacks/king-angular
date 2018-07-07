<?php
/**
 * WP Rest API hook for a simple contact form to email a chosen person.
 * Google Invisible reCAPTCHA support.
 */

class KA_EmailAPI {

}

function contact_email($data) {
  if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    return new WP_Error('bad_data', 'You did not properly fill out the form.', array('status' => 400));
  }

  $to = KA_Plugin::get_option('contact_email');
  if (empty($to)) $to = 'eric@king.rocks';
  $to = sanitize_email($to);

  $subject = 'Wordpress Contact Form: Message from ' + sanitize_text_field($data['name']);
  $message = sanitize_textarea_field($data['message']);

  return wp_mail($to, $subject, $message);
}

function register_rest_routes() {
  register_rest_route('king-angular/v1', '/contact', array(
    'methods' => 'POST',
    'callback' => 'contact_email'
  ));
}

add_action('init', 'register_rest_routes');

 ?>
