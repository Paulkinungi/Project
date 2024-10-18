(function ($) {

    var teapoyAuthValidation = {

        init : function() {
            jQuery( 'body' ).delegate( '.teapoy-pro-login-link', 'click', function(e){

                jQuery.ajax({
                    type: "POST",
                    url: teapoy_urls.ajaxurl,
                    data:
                    {
                        action: 'teapoy_pro_show_login_form_popup',
                    },
                    success: function (response) {
    
                        jQuery('body').find('.teapoy-pro-login-form-container').remove();
                        jQuery('body').find('.teapoy-pro-login-form-overlay').remove();
                        jQuery('body').append(response);
    
                        jQuery('#user_login').focus();

                        teapoyAuthValidation.addPlaceholder();
    
                    }
                });
    
                e.preventDefault();
    
            });
    
            jQuery(document).on('click', function(e) {
                if (!jQuery(e.target).closest('.teapoy-pro-login-form-wrapper').length) {
                    jQuery('.teapoy-pro-login-form-container').fadeOut();
                    jQuery('.teapoy-pro-login-form-overlay').fadeOut();
                }
            });

            jQuery( 'body' ).delegate( '#teapoy-custom-auth-register-button', 'click', function(e) {
                jQuery('#loginform').on('submit', function(e) {
                    var first_name = jQuery('#first_name').val();
                    var last_name  = jQuery('#last_name').val();
                    var user_name  = jQuery('#user_name').val();
                    var password   = jQuery('#password').val();
                    var user_email = jQuery('#user_email').val();
                        jQuery.ajax({
                            type: "POST",
                            url: teapoy_urls.ajaxurl,
                            data:
                            {
                                action: 'teapoy_pro_register_user_front_end',
                                first_name: first_name,
                                last_name: last_name,
                                user_name: user_name,
                                password: password,
                                user_email: user_email
                            },
                            success: function(results){
                                jQuery('.teapoy-custom-auth-register-alert').text(results).show();
                            },
                            error: function(results) {

                            }

                        });

                        e.preventDefault();
                });
            });

        },

        addPlaceholder : function() {

            // Login Form Scripts
            $('#loginform input[id="user_login"]').attr('placeholder', 'Username');
            $('#loginform input[id="user_pass"]').attr('placeholder', 'Password');
            
            $('#loginform label[for="user_login"]').contents().filter(function() {
                return this.nodeType === 3;
            }).remove();
            $('#loginform label[for="user_pass"]').contents().filter(function() {
                return this.nodeType === 3;
            }).remove();
            
            $('input[type="checkbox"]').click(function() {
                $(this+':checked').parent('label').css("background-position","0px -20px");
                $(this).not(':checked').parent('label').css("background-position","0px 0px");
            });
        }

    }

    "use strict";
    $(document).ready(function () {   
        teapoyAuthValidation.init();

        // Custom register page
        if( ($('#signup-content').length) || ($('#signup-content').length) > 1 ) {
            $('body').addClass('wdt-custom-auth-form');
            $('.wrapper').addClass('wdt-custom-auth-form');
        }
    });

})(jQuery);