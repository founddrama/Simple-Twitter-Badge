<?php
/**
 * Plugin Name: Simple Twitter Badge
 * Version: 0.2
 * Plugin URI: https://github.com/founddrama/Simple-Twitter-Badge
 * Description: Super-simple Twitter badge for WordPress blog sidebars.
 * Author: Rob Friesel
 * Author URI: http://blog.founddrama.net
*/
class Simple_Twitter_Badge extends WP_Widget {
	/** constructor */
	function Simple_Twitter_Badge() {
		$widget_ops = array('classname' => 'simple_twitter_badge', 'description' => __('A simple Twitter badge for WordPress blog sidebars.'));
		$control_ops = array('width' => 400, 'height' => 350);
		$this->WP_Widget('simple_twitter_badge', __('Simple Twitter Badge'), $widget_ops, $control_ops);
	}
	
	/** @see WP_Widget::widget */
	function widget($args, $instance) {
		extract($args);
		$twitter_name = $instance['twitter_name'];
		echo $before_widget;
		if ( $twitter_name ) {
			echo $before_title . '@' . $twitter_name . $after_title; ?>
			<div id="twitter_div"><ul id="twitter_update_list"></ul></div>
		<?php
			add_action('wp_footer',
				create_function('', 'echo \'<script type="text/javascript" src="http://api.twitter.com/1/statuses/user_timeline.json?screen_name=' . $twitter_name . '&callback=twitterCallback2&count=' . $instance['twitter_limit'] . '"></script>\';')
			);
		}
		echo $after_widget;
	}
	
	function update($new_instance, $old_instance) {
		$instance = $old_instance;
		$instance['twitter_name'] = strip_tags($new_instance['twitter_name']);
		$instance['twitter_limit'] = $new_instance['twitter_limit'];
		return $instance;
	}
	
	function form($instance) {
		$twitter_name = strip_tags(esc_attr($instance['twitter_name']));
		$twitter_limit = esc_attr($instance['twitter_limit']); ?>
			<p>
				<label for="<?php echo $this->get_field_id('twitter_name'); ?>"><?php _e('Twitter User Name:'); ?> <input class="widefat" id="<?php echo $this->get_field_id('twitter_name'); ?>" name="<?php echo $this->get_field_name('twitter_name'); ?>" type="text" value="<?php echo $twitter_name; ?>" /></label>
				<label for="<?php echo $this->get_field_id('twitter_limit'); ?>"><?php _e('Number of Tweets'); ?> <select class="widefat" id="<?php echo $this->get_field_id('twitter_limit'); ?>" name="<?php echo $this->get_field_name('twitter_limit'); ?>"><?php
					for ( $i = 1; $i <= 25; ++$i ) {
						echo "<option value=\"$i\" " . ( $twitter_limit == $i ? 'selected="selected"' : '' ) . ">$i</option>";
					}
				?></select></label>
			</p>
		<?php
	}
}

add_action('widgets_init', create_function('', 'return register_widget("Simple_Twitter_Badge");'));
add_action('wp_footer', create_function('', 'echo \'<script type="text/javascript" src="'.plugins_url('/js/callback.js',__FILE__).'"></script>\';'));

?>