console.log('JS ready!')

$(document).ready(function(){
  console.log('ready!')

  // $('[data-aos]').each(function(){ $(this).addClass("aos-init"); });

  $('.home').slick({
    dots: false,
    arrows:false,
    fade: true,
    infinite: true,
    // autoplay: true,
    autoplaySpeed: 3000,
    // pauseOnHover: false,
    
  })

 
})






$('#fullpage').fullpage({

  navigation: true,
  navigationTooltips: ['section 1','section 2','section 3'],
  showActiveTooltip: true,
  slidesNavPosition: 'bottom',

  anchors: ['home','aboutus','whyus','services','contact'],
  menu: '#menu',
  // license 
  licenseKey: false,
  // scrolling 
  css3: true,
  scrollingSpeed: 700,
  resetSliders: true,
  fadingEffect: false,
  responsiveWidth: 700,

  onLeave: function(){
    $('.section [data-aos]').each(function(){
        $(this).removeClass("aos-animate")
    });

    AOS.init({
      easing: 'ease',
      disable: 'mobile'
    })
    
  },
  onSlideLeave: function(){
    $('.slide [data-aos]').each(function(){
        $(this).removeClass("aos-animate")
    });
  },
  afterSlideLoad: function(){
      $('.slide.active [data-aos]').each(function(){
          $(this).addClass("aos-animate")
      });
  },
  afterLoad: function(anchor, index){
    $('[data-aos]').each(function(){ $(this).addClass("aos-init"); });

    $('.section.active [data-aos]').each(function(){
        $(this).addClass("aos-animate")
    });

    // const activeItem;

    // if(index == 1 || index == 2 || index == 3){
    //     activeItem = $('#menu').find('li').first()
    // }else{
    //       activeItem = $('#menu').find('li').last()    
    // }

    // activeItem.addClass('active').siblings().removeClass('active');

  }
    
})


 
