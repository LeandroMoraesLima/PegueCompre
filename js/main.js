// lazyload
var _extends = Object.assign || function (e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e }, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e }; !function (e, t) { "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.LazyLoad = t() }(this, function () { "use strict"; var e = { elements_selector: "img", container: document, threshold: 300, data_src: "src", data_srcset: "srcset", class_loading: "loading", class_loaded: "loaded", class_error: "error", callback_load: null, callback_error: null, callback_set: null, callback_enter: null }, t = function (e, t) { return e.getAttribute("data-" + t) }, n = function (e, t, n) { return e.setAttribute("data-" + t, n) }, r = function (e) { return e.filter(function (e) { return !t(e, "was-processed") }) }, s = function (e, t) { var n, r = new e(t); try { n = new CustomEvent("LazyLoad::Initialized", { detail: { instance: r } }) } catch (e) { (n = document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized", !1, !1, { instance: r }) } window.dispatchEvent(n) }, o = function (e, n) { var r = n.data_srcset, s = e.parentNode; if ("PICTURE" === s.tagName) for (var o, a = 0; o = s.children[a]; a += 1)if ("SOURCE" === o.tagName) { var i = t(o, r); i && o.setAttribute("srcset", i) } }, a = function (e, n) { var r = n.data_src, s = n.data_srcset, a = e.tagName, i = t(e, r); if ("IMG" === a) { o(e, n); var c = t(e, s); return c && e.setAttribute("srcset", c), void (i && e.setAttribute("src", i)) } "IFRAME" !== a ? i && (e.style.backgroundImage = 'url("' + i + '")') : i && e.setAttribute("src", i) }, i = "classList" in document.createElement("p"), c = function (e, t) { i ? e.classList.add(t) : e.className += (e.className ? " " : "") + t }, l = function (e, t) { i ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(^|\\s+)" + t + "(\\s+|jQuery)"), " ").replace(/^\s+/, "").replace(/\s+jQuery/, "") }, u = function (e, t) { e && e(t) }, d = function (e, t, n) { e.removeEventListener("load", t), e.removeEventListener("error", n) }, f = function (e, t) { var n = function n(s) { _(s, !0, t), d(e, n, r) }, r = function r(s) { _(s, !1, t), d(e, n, r) }; e.addEventListener("load", n), e.addEventListener("error", r) }, _ = function (e, t, n) { var r = e.target; l(r, n.class_loading), c(r, t ? n.class_loaded : n.class_error), u(t ? n.callback_load : n.callback_error, r) }, v = function (e, t) { u(t.callback_enter, e), ["IMG", "IFRAME"].indexOf(e.tagName) > -1 && (f(e, t), c(e, t.class_loading)), a(e, t), n(e, "was-processed", !0), u(t.callback_set, e) }, m = function (t, n) { this._settings = _extends({}, e, t), this._setObserver(), this.update(n) }; m.prototype = { _setObserver: function () { var e = this; if ("IntersectionObserver" in window) { var t = this._settings; this._observer = new IntersectionObserver(function (n) { n.forEach(function (n) { if (n.isIntersecting || n.intersectionRatio > 0) { var r = n.target; v(r, t), e._observer.unobserve(r) } }), e._elements = r(e._elements) }, { root: t.container === document ? null : t.container, rootMargin: t.threshold + "px" }) } }, update: function (e) { var t = this, n = this._settings, s = e || n.container.querySelectorAll(n.elements_selector); this._elements = r(Array.prototype.slice.call(s)), this._observer ? this._elements.forEach(function (e) { t._observer.observe(e) }) : (this._elements.forEach(function (e) { v(e, n) }), this._elements = r(this._elements)) }, destroy: function () { var e = this; this._observer && (r(this._elements).forEach(function (t) { e._observer.unobserve(t) }), this._observer = null), this._elements = null, this._settings = null } }; var b = window.lazyLoadOptions; return b && function (e, t) { if (t.length) for (var n, r = 0; n = t[r]; r += 1)s(e, n); else s(e, t) }(m, b), m });

function toReal(value, str_cifrao) {
    return str_cifrao + ' ' + value.formatMoney(2, ',', '.');
}
Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(d{3})(?=d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

var theme = {
    instagram: function (link, token) {
        var jQueryrecebePhotos = jQuery('#instagram .list');
        var id = token.split(".")[0];
        var userid = parseInt(id);
        var num_photos = 5;

        jQuery.ajax({
            url: 'https://api.instagram.com/v1/users/' + userid + '/media/recent',
            dataType: 'jsonp',
            type: 'GET',
            data: { access_token: token, count: num_photos },
            success: function (data) {
                if (data.data.length > 0) {
                    jQuery("#instagram li:first .box-image").attr("href", 'https://www.instagram.com/'+ link.replace("@",""));
                    jQuery("#instagram .link-href").text(link);

                    for (var x = 0; x < data.data.length; x++) {
                        jQueryrecebePhotos.append('<li class="flex-grow""><a class="box-image" href="' + data.data[x].link + '" target="_blank"><img src="' + data.data[x].images.low_resolution.url + '"></li>');
                    }
                    jQuery('#instagram').fadeIn();
                    jQueryrecebePhotos.find("li").each(function () {
                        jQuery(this).find("img").load(function () {

                            var width = jQuery(this).width();
                            var height = jQuery(this).height();

                            if (width > height) {
                                jQuery(this).css("height", "100%");
                            }
                            else {
                                jQuery(this).css("width", "100%");
                            }
                        });
                    });
                }
            },
            error: function (data) {
                console.log("error: ", data);
            }
        });
    },
    headerFixed: function(){
        var wrapper = jQuery(".wrapper");
        (jQuery(window).scrollTop() > 0) ? wrapper.addClass("fixed") : wrapper.removeClass("fixed");
    },
    scrollHeader: function () {
        jQuery(window).scroll(function () {
            theme.headerFixed();
        });
    },
    bannerFull: function () {
        jQuery('.owl-full').owlCarousel({
            loop: true,
            items: 1,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000
        });
    },
    bannerExtra: function () {
        jQuery('.banner-carousel').owlCarousel({
            loop: true,
            lazyLoad: true,
            items: 1,
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            nav: false
        });
    },
    bannerRegua: function () {
        jQuery('.line-content .box-line').owlCarousel({
            loop: true,
            lazyLoad: false,
            items: 1,
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            nav: false
        });
    },
    depoimentos: function () {
        jQuery('.box-person .dep_lista').find('li[style="display: none;"]').remove();
        jQuery('.box-person .dep_lista').addClass('owl-carousel');
        jQuery('.box-person > ul').owlCarousel({
            loop: true,
            lazyLoad: false,
            items: 3,
            dots: false,
            nav: true,
            autoplay: true,
            autoplayTimeout: 5000,
            responsiveClass:true,
            responsive:{
                0:{
                    items  : 1
                },
                470:{
                    items  : 2
                },
                991:{
                    items  : 3
                }
            }
        });
    },
    menuMarcas: function () {
        jQuery('.menu-marcas > ul').owlCarousel({
            loop: false,
            lazyLoad: false,
            dots: false,
            nav: true,
            autoplay: false,
            autoplayTimeout: 2500,
            responsiveClass:true,
            responsive:{
                0:{
                    items  : 2
                },
                767:{
                    items  : 3
                },
                991:{
                    items  : 5
                }
            }
        });
    },
    menuIcones: function () {
        jQuery('#menu-icones > ul').owlCarousel({
            loop: false,
            lazyLoad: false,
            dots: false,
            nav: true,
            autoplay: true,
            autoplayTimeout: 5000,
            responsiveClass:true,
            responsive:{
                0:{
                    items  : 2
                },
                767:{
                    items  : 3
                },
                991:{
                    items  : 5
                },
                1200:{
                    items  : 6
                }
            }
        });
    },
    shipping: function (params) {
        jQuery.ajax({
            type: "POST",
            url: url,
            data: jQuery("#idForm").serialize(), // serializes the form's elements.
            success: function (data) {
                alert(data); // show response from the php script.
            }
        });
    },
    subOffset: function(){
       var nav =  jQuery('.nav .level-primary').offset().left + jQuery('.nav .level-primary').outerWidth();
       jQuery('.nav .box-sub').each(function(){
           var positionNav = (jQuery(this).offset().left + jQuery(this).outerWidth());
           (positionNav >= nav) ? jQuery(this).parent().addClass('no-relative') : jQuery(this).parent().removeClass('no-relative');
       });
    },
    menuHeader: function () {
        jQuery(".header .menu-bar").click(function (params) {
            jQuery(".header").toggleClass("active");
            jQuery(".wrapper").toggleClass("open");
            jQuery("body").toggleClass("menu-ativo");
        });

        jQuery('.shadow-nav, .icon.prev').click(function(){
            jQuery(".header").removeClass("active");
            jQuery(".wrapper").removeClass("open");
            jQuery("body").removeClass("menu-ativo");
        });
        
        jQuery('.nav-mobile li.subs > a').click(function(e){
            e.preventDefault();
            jQuery(this).parent().toggleClass('active');
        });
        
        theme.subOffset();

        jQuery(window).resize(function(){
            theme.subOffset();
        });
    },
    modalBox: function () {
        jQuery(".shadow-modal, .close-box").click(function (params) {
            jQuery(".modal-box").removeClass("active").removeClass("load");
            jQuery(".modal-box .append").find("*").remove();
        });
    },
    tracking: function() {
        
    },
    trackingSubmit: function () {
        jQuery(".tracking-form").submit(function (event) {
            var code = jQuery(this).find("input").val();
            //var url = 'https://www.rastreie.com/internal/br.php?lang=br&cod=' + code;
            //var url = 'https://www.rastreie.com/' + code;
            var url = 'https://www.muambator.com.br/pacotes/' + code + '/detalhes/';
            window.open(url, '_blank');
            /*var modal = jQuery(".modal-box.tracking");
            modal.addClass("active").addClass("load");
            modal.find(".append").append('<iframe class="iframe-tracking" frameborder="off" src="'+url+'">');
            modal.find("iframe").load(function (parms) {
                modal.removeClass("load");
            });*/
            event.preventDefault();
            return false;
        });
    },
    carouselProducts: function (){
        jQuery('.list.owl-carousel').owlCarousel({
            total: jQuery(this).find(".item").length,
            loop: this.total > 4,
            lazyLoad: true,
            items: 1,
            nav: true,
            dots: true,
            navText: [
                '<span class="prev arrow icon-left-arrow"></span>',
                '<span class="next arrow icon-right-arrow"></span>'
            ],
            responsive:{
                0:{
                    items:2,
                    loop: this.total > 2,
                    mouseDrag: this.total > 2
                },
                600:{
                    items:3,
                    loop: this.total > 3,
                    mouseDrag: this.total > 3
                },
                1000:{
                    items:4,
                    mouseDrag: this.total > 4
                }
            }
        });
    },
    carouselProducts2: function (){
        jQuery('.relamp.owl-carousel').owlCarousel({
            total: jQuery(this).find(".item").length,
            loop: this.total > 2,
            lazyLoad: true,
            items: 1,
            nav: true,
            margin: 30,
            dots: false,
            autoWidth:true,
            navText: [
                '<span class="prev arrow icon-left-arrow"></span>',
                '<span class="next arrow icon-right-arrow"></span>'
            ],
            responsive:{
                0:{
                    items:3,
                    loop: this.total > 2,
                    mouseDrag: this.total > 2
                },
                600:{
                    items:4,
                    loop: this.total > 3,
                    mouseDrag: this.total > 3
                },
                1000:{
                    items:5,
                    mouseDrag: this.total > 4
                }
            }
        });
    },
    carouselParceiros: function (){
        jQuery('.owl-carousel').owlCarousel({
            loop:true,
            margin:10,
            nav:true,
            navText: [
                '<span class="prev arrow icon-left-arrow"></span>',
                '<span class="next arrow icon-right-arrow"></span>'
            ],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:3
                },
                1000:{
                    items:6
                }
            }
        });
    },
    facebook: function(){
        if(jQuery('#fb-root').is(':visible')){
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = 'https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v3.0';
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }
    },
    footerMobile: function(){
        jQuery('.footer .title').click(function(){
            jQuery(this).next().toggleClass('active');
        });
    },
    slideProduct: function(){
        jQuery('.slide-post-product .owl-list').owlCarousel({
            loop: false,
            lazyLoad: true,
            items: 1,
            dots: true
        });
    }
}

var cart = {
    session: function () {
        return jQuery("html").attr("data-session");
    },
    removeProduct: function (id, variantNumber,add){
        var variant = variantNumber == 0 ? '' : '/' + variantNumber ;
        var addText = add == "" ? '' : "/?additional_information=" + add.replace(/br>/g, 'br/>');
        jQuery.ajax({
            method: "DELETE",
            url: "/web_api/carts/" + cart.session() + "/" + id + variant + addText,
        }).success(function (response) {
            //console.log(response);
            cart.listProduct();
        }).fail(function (error) {
            //console.log("error remove product: ", error.responseText);
            cart.listProduct();
        });
    },
    listProduct: function () {
        jQuery.ajax({
            method: "GET",
            url: "/web_api/cart/" + cart.session()
        }).success(function (response) {
            cart.forProduct(response);
        }).fail(function (error) {
            var response = jQuery.parseJSON(error.responseText);
            cart.forProduct([]);
            //console.log("error list product: ", response);
        });
    },
    forProduct: function (listProducts) {
        var listDom = jQuery('.cart-sidebar .content-cart .list');
        listDom.find('*').remove();

        if (listProducts.length){
            listProducts.forEach(function (product) {

                //console.log('array cart', product);
                product = product.Cart;
            
                prices = product;
                // product.productImage.thumbs[90].https;
                
                var infoAdd = product.additional_information.replace(/\//g, '');

                listDom.append(cart.templateProduct(product.product_id, product.variant_id, product.product_name, product.product_image.thumbs[90].https, product.quantity, product.price, product.product_url.https, infoAdd));
        
            });
        }
        else{
            listDom.append('<div class="error"><div class="icon icon-bag"></div><div clas="text">Sacola vazia</div></div>');
        }
        
        jQuery('.number-cart').text(listProducts.length);
    },
    showCart: function () {
        cart.listProduct();
        jQuery('.cart-sidebar').addClass('active');
    },
    hideCart: function () {
        jQuery('.cart-sidebar').removeClass('active');
    },
    startCart: function () {
        jQuery('.header .cart a').click(function (e) {
            e.preventDefault();
            cart.showCart();
        });
        jQuery('.shadow-cart, .cart-sidebar .prev').click(function () {
            cart.hideCart();
        });
        jQuery(".cart-sidebar").on('click','.remove', function () {
           var removeId = parseInt(jQuery(this).attr('data-id'));
           var removeVariant = parseInt(jQuery(this).attr('data-variant'));
           var add = jQuery(this).attr('data-add');
           cart.removeProduct(removeId, removeVariant, add);
        });
    },
    templateProduct: function (id,variant,name,image,qnt,price,url,add) {
        var template = '\
            <div class="item">\
                <div class="box-cart flex align-center">\
                    <div class="box-image">\
                        <a href="{url}" class="image">\
                            <img src="{image}" alt="{name}">\
                        </a>\
                    </div>\
                    <div class="info-product">\
                        <div class="line-top flex justify-between">\
                            <a href="{url}" class="name t-color">{name}</a>\
                            <div tabindex="0" class="remove t-color icon-trash" data-id="{id}" data-variant="{variant}" data-add="{add}"></div>\
                        </div>\
                        <div class="line-down flex justify-between">\
                            <div class="qnt">Quantidade: {length}</div>\
                            <div class="price">{price}</div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        ';

        template = template.replace(/{url}/g,url);
        template = template.replace(/{image}/g,image);
        template = template.replace(/{name}/g,name);
        template = template.replace(/{id}/g,id);
        template = template.replace(/{length}/g,qnt);
        template = template.replace(/{variant}/g,variant);
        template = template.replace(/{add}/g,add);
        price = toReal(parseFloat(price), 'R$');
        template = template.replace(/{price}/g,price);
        return template;
    },
    previewCart: function(){
        jQuery('.cart-preview'); //modal
    }
}

jQuery(document).ready(function () {

    jQuery('.caixa-frete, .caixa-forma-frete, .caixa-total, .caixa-botoes').wrapAll('<div class="box-right-cart"></div>');
    
    jQuery('.smart-filter .filtro > ul').find('li').closest('.filtro').addClass('contem-filtro');    

    // Filtros
    jQuery('.sidebar').find('.smart-filter').closest('body').addClass('filtro-habilitado');
    jQuery('.sidebar .titulo-filtro').click(function(){
        jQuery('.smart-filter').addClass('filtro-ativo');
    });
    jQuery('.smart-filter .fechar-filtros').click(function(){
        jQuery('.smart-filter').removeClass('filtro-ativo');
    });     

    // Noticias
    function limita(str, size){
        var nova = str;
        if(str.length >= size+3){
            nova = str.substring(0, size).concat(' ...');
        }
        return nova;
    }      
    jQuery('.box-col #ultimasNoticias a').each(function(){
        var jQuerytitulo = jQuery(this).text();
        jQuery(this).text(limita(jQuerytitulo, 40));
    });

    // Menu de marcas
    function removeAcento(text){       
        text = text.toLowerCase();                                                         
        text = text.replace(new RegExp('[¡¿¬√]','gi'), 'a');
        text = text.replace(new RegExp('[…» ]','gi'), 'e');
        text = text.replace(new RegExp('[ÕÃŒ]','gi'), 'i');
        text = text.replace(new RegExp('[”“‘’]','gi'), 'o');
        text = text.replace(new RegExp('[⁄Ÿ€]','gi'), 'u');
        text = text.replace(new RegExp('[«]','gi'), 'c');
        return text;                 
    }

    if (jQuery('.menu-marcas li a').length){
        var caminhoImg = jQuery('.menu-marcas li a img').attr('src');
        jQuery('.menu-marcas li a').each(function() {
            var jQuerythis = jQuery(this);
            var title = removeAcento(jQuerythis.attr('href').toLowerCase().replace(/ /g,'-'));
            jQuery(this).attr('href', title);
            jQuery(this).find('img').attr('src', caminhoImg + title + '.png');
        });
    }

    // Script para gerar menu de marcas automatico sem as marcas que n„o tem imagem cadastradas
    var list = [ ];
    
    jQuery('.menu-marcas a img').load(function(e,se){
        list.push({src: jQuery(this).attr('src'), link: jQuery(this).parents('a').attr('href'), name: jQuery(this).attr('alt')});
    });
    
    setTimeout(function() {
        
        jQuery('.menu-marcas').append('<ul class="new-list owl-carousel"></ul>');        
        var template = '<li><a href="{link}"><img src="{src}" alt="{name}"></a></li>';        
        list.forEach(function(val){
            jQuery('.menu-marcas').find('.new-list').append(template.replace('{link}', val.link).replace('{src}', val.src).replace('{name}', val.name));
        });        
        
        jQuery('.menu-marcas .list-complete').remove();  
        theme.menuMarcas();       

    }, 5000);

    theme.headerFixed();
    theme.scrollHeader();
    theme.bannerFull();
    theme.bannerExtra();
    theme.depoimentos();
    theme.menuHeader();
    theme.modalBox();
    theme.trackingSubmit();
    theme.carouselProducts();
    theme.carouselProducts2();
    theme.carouselParceiros();
    theme.footerMobile();
    theme.slideProduct(); 
    theme.menuIcones();   
    if ( jQuery('#instagram').is(':visible') )  theme.instagram('@'+jQuery('#instagram').data('name'),jQuery('#instagram').data('token'));
    var imageProduct = new LazyLoad({
        elements_selector: ".lazyload"
    });

    if(jQuery(window).width() < 768){
        jQuery('.line-content .box-line').addClass('owl-carousel');
        theme.bannerRegua();   
    }

    jQuery('.compreJunto li div.produto img').each(function(){
        jQuery(this).after('<div class="name-product">'+jQuery(this).attr('title')+'</div>');
    });
    
    cart.startCart();

});

jQuery(window).load(function(){

    theme.facebook();   
    theme.menuMarcas(); 

    // Modal Frete
    jQuery('#form_comprar .botao-simular-frete').click(function(){
        if ( (jQuery(this).closest('#cepbox').find("#cep1").val().length > 4) && (jQuery(this).closest('#cepbox').find("#cep2").val().length > 2) ){
            jQuery('#modal').addClass('open-modal');
        };
    }); 
    jQuery('#form_comprar #bt_comprar .botao-comprar').click(function(){
        var verificaBotao = jQuery(this).closest('#bt_comprar').html();
        var verificaBotao2 = jQuery(verificaBotao).attr('data-title');
        if (verificaBotao2 == 'TERMO DE ACEITA«√O'){            
            jQuery('#modal-form').addClass('open-modal');
        }         
    });  
    jQuery('.brinde_produto a, #produto_preco .botao_tire_duvidas').click(function(){
        jQuery('#modal-form').addClass('open-modal');
    });     
    jQuery('#modal .close, #modal-form .close').click(function(){
        jQuery('body').removeClass('modal-open');
        jQuery('.modal-backdrop').remove();
    });  

    jQuery('.page-content').before(jQuery('.catalog-header .breadcrumb, .central-breadcrumb, #product-container .breadcrumb'));
    
    jQuery('.produto-imagem.zoom-off').attr('data-toggle', '');
    
    cssVars();
    

});
function process(quant){
    var value = parseInt(document.getElementById("quant").value);
    value+=quant;
    if(value < 1){
      document.getElementById("quant").value = 1;
    }else{
    document.getElementById("quant").value = value;
    }
}
function contagem_regressiva(data){
    var target_date = new Date("january 15, 2018").getTime();
    var dias, horas, minutos, segundos;
    var regressiva = document.getElementById("regressiva");

    setInterval(function () {

        var current_date = new Date().getTime();
        var segundos_f = (target_date - current_date) / 1000;

        dias = parseInt(segundos_f / 86400);
        segundos_f = segundos_f % 86400;
        
        horas = parseInt(segundos_f / 3600);
        segundos_f = segundos_f % 3600;
        
        minutos = parseInt(segundos_f / 60);
        segundos = parseInt(segundos_f % 60);

        document.getElementById('dia').innerHTML = dias;
        document.getElementById('hora').innerHTML = horas;
        document.getElementById('minuto').innerHTML = minutos;
        document.getElementById('segundo').innerHTML = segundos;
      

    }, 1000);
}