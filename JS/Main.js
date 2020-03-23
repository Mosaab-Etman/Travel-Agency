$(document).ready(function() {
    
  
        
    // Nice Scroll
    
    $("body").niceScroll({
        cursorcolor: '#b57903',
        cursoropacitymin: 0.7,
        cursorwidth: "7px",
        zindex: "10",
        cursorborder: "none",
        cursorborderradius: "5px", 
    });
    
    
    // Recoloring Navbar on scrolling------
    
    $(window).on('scroll', function() {
        
        if ($(window).scrollTop() >= 33) {
            
            $('.upperNavbar').css({
            backgroundColor: 'rgb(222, 222, 221)'});
            
        } else {
            
            $('.upperNavbar').css({
            backgroundColor: 'rgba(222, 222, 221, 0.5)'});
        }
    })
    
    // -------------------ScrollTop arrow---- 
    
    $(window).on('scroll', function() {
        
        if ($(window).scrollTop() >= 1000) {
        
        $('.fa-angle-double-up').show().animate({bottom: '35px'}).animate({bottom: '30px'});
        
        } else {
        
        $('.fa-angle-double-up').hide().stop(true);
        
        }
    })
    
    $('.fa-angle-double-up').on('click', function() {
        
        $('html').animate({ scrollTop: '0px'})
    })
    
    
    //--------------*** Home page ***-----------------//
    
    //--- Iteractions of gallery Section 
    
    
    // Resizing the thumnails
    
    $('.thumbnails img').width($(window).width() / 6)
    
    $(window).on('resize', function() {
        
        $('.thumbnails img').width($(window).width() / 6);
    })
    
    
    // Changing mainPic 
    
    // First: by clicking on the image
    
    $('.thumbnails img').on('click', function() {
        
        $(this).addClass('active').siblings().removeClass('active');
        
        $('.mainPic img').fadeOut(100, function() {
            
            $(this).attr('src', $('.thumbnails .active').attr('src')).fadeIn();
            
        })
    })
    
    // Second : by clicking on the right arrow
    
    $('.mainPic .fa-caret-right').on('click', function() {
        
        // Changing the image
                  
        if ($('.thumbnails .active').is(':last-child')) { 
            
            $('.mainPic img').fadeOut(100, function() {
            
                $('.thumbnails .active').removeClass('active').siblings(':first-child').addClass('active');

                $('.mainPic img').attr('src', $('.thumbnails .active').attr('src')).fadeIn();
        })
                        
        } else {
            
        $('.mainPic img').fadeOut(100, function() {
            
            $('.thumbnails .active').removeClass('active').next().addClass('active');
            
            $('.mainPic img').attr('src', $('.thumbnails .active').attr('src')).fadeIn(); 
        })
            
        }
        
        // Sliding the thumbnails
        
        if ($('.thumbnails .active').is(':last-child')) {
            
            $('.thumbnails').first().animate({marginLeft: '0px'});
        }
        
        else if ($(window).width() <= $('.thumbnails .active').next().offset().left + $('.thumbnails img').outerWidth()) {
            
            $('.thumbnails').first().animate({marginLeft: '-=224px'});
            
        } 
    })
    
    // Third : by clicking on the left arrow
    
    $('.mainPic .fa-caret-left').on('click', function() {
        
        // Changing the image
                  
        if (!$('.thumbnails .active').is(':first-child')) {
            
            $('.mainPic img').fadeOut(100, function() {

                $('.thumbnails .active').removeClass('active').prev().addClass('active');

                $('.mainPic img').attr('src', $('.thumbnails .active').attr('src')).fadeIn();
        
        }) 
        
        } 
        
        // Sliding the thumbnails 
        
        if ($('.thumbnails').first().offset().left < 0) {
            
            $('.thumbnails').first().animate({marginLeft: '+=224px'})
        }
        
        
    })
    
    
    //--------------*** About page ***-----------------//
    
    // FadingIn contents of timeline
    
    $(window).on('load', function () {
        
        if ($('body').hasClass('about')) {
            
            $(window).on('scroll', function() {
            
            if ($(window).scrollTop() > $('.Timeline').offset().top - 200) {
                
                $('.Timeline .story p').animate({opacity: '1'}, 1000);
                
                }
            })  
        }
    })
    
    
    //--------------*** Contacts page ***-----------------//
    
    // Showing the required warning
    
    $('.reach form input').after('<span class="warn">* Field is requiered</span>')
    
    $('.reach form input').on('blur', function() {
        
        if ($(this).val() == '') {
            
            $(this).siblings('.warn').fadeIn(500);
            
        } else {
            
            $(this).siblings('.warn').fadeOut(500);
        }
    })
    
    // Changing the direction of writing
    
    $('.reach form input').on('keydown', function() {
        
        if ($(this).val().charCodeAt(0) < 200) {
            
            $(this).css('direction', 'ltr');
            
        } else {
            
            $(this).css('direction', 'rtl');
        }
    })
    
    
    //--------------*** Booking page ***-----------------// 
    
    // Toggling application
    
    $('.booking .type li').on('click', function() {
        
        $(this).addClass('active').siblings().removeClass('active');
        
        $($(this).data('type')).show(10, function() { $(this).css('display', 'flex')}).siblings('div').hide(10);
    })
    
    
    // Checkingout Price
    
    var totalPrice = $('.receipt .price span');
    
    $('.booking button').on('click', function (e) {
        
        e.preventDefault();
        
        $(this).css('backgroundImage', 'linear-gradient(#ffa900, #f7c563)');
        
        if ($('.booking .type li').first().hasClass('active')) {
        
            var startDate = Date.parse($('.hotels .time .start input').val()),
                endDate = Date.parse($('.hotels .time .end input').val()),
                days = (endDate - startDate) / (24 * 60 * 60 * 1000),
                selOption = $('.hotels .place input').val(),
                nightPrice = $('.hotels .place option[value=' +selOption+ ']').attr('data-NP'),
                adultsNum = $('.hotels .persons .adults input').val(),
                childNum = $('.hotels .persons .children input').val(),
                discount = days * nightPrice * (adultsNum - 1) * 0.05;

            if (adultsNum > 1) {

                totalPrice.text('$' + ((days * nightPrice * adultsNum + days * nightPrice * childNum * 0.5) - discount));

            }   else {

                totalPrice.text('$' + (days * nightPrice * adultsNum + days * nightPrice * childNum * 0.5));

            }
            
            // Showing the details section
            
            $('.btn-details').on('click', function() {
                
                $(this).css('backgroundImage', 'linear-gradient(#ffa900, #f7c563)');
        
                $('.adultPrice').text('Adult price : $ ' + nightPrice + ' * ' + adultsNum + ' adult = $' + (nightPrice * adultsNum));
                $('.childPrice').text('Children price :' + ' $ ' + nightPrice + ' * ' + childNum + ' children ' + '* 50% = $ ' + (nightPrice * childNum * 0.5));
                $('.discount').text('Discount : ' + (adultsNum - 1) + ' adult * 5% = $ ' + discount);
                $('.total').text('Total : ' + totalPrice.text());
                
                $('body').css('overflow', 'auto');
                $('.details').fadeIn().css('display', 'flex');
            })

            
        }   else if ($('.booking .type li').eq(1).hasClass('active')) {
            
                var selOption = $('.flights .place input').val(),
                    ticketPrice = $('.flights .place option[value=' +selOption+             ']').attr('data-TP'),
                    classOption = $('.flights .time .class input').val(),
                    classPrice = $('.flights .time option[value=' +classOption+             ']').attr('data-CP'),
                    adultsNum = $('.flights .persons .adults input').val(),
                    childNum = $('.flights .persons .children input').val(),
                    discount = Math.round(classPrice * ticketPrice * (adultsNum - 1) * 0.07);

                if (adultsNum > 1) {

                    totalPrice.text('$' + ((classPrice * ticketPrice * adultsNum + classPrice * ticketPrice * childNum * 0.5) - discount));

                } else {

                totalPrice.text('$' + (classPrice * ticketPrice * adultsNum + classPrice * ticketPrice * childNum * 0.5));

                }
            
            // Showing the details section
            
            $('.btn-details').on('click', function() {
                
                $(this).css('backgroundImage', 'linear-gradient(#ffa900, #f7c563)');
        
                $('.adultPrice').text('Adult price : $ ' + ticketPrice + ' * ' + adultsNum + ' adult = $' + (ticketPrice * adultsNum));
                $('.childPrice').text('Children price :' + ' $ ' + ticketPrice + ' * ' + childNum + ' children ' + '* 50% = $ ' + (ticketPrice * childNum * 0.5));
                $('.discount').text('Discount : ' + (adultsNum - 1) + ' adult * 7% = $ ' + discount);
                $('.total').text('Total : ' + totalPrice.text());
                
                $('body').css('overflow', 'auto');
                $('.details').fadeIn().css('display', 'flex');
            })
        }
        
        $('.receipt').fadeIn().css('display', 'flex');
    })
    
    
})

