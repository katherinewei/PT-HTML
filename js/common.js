/**
 * Created by Administrator on 2018/1/2.
 */

function browserRedirect(callback){
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
    var bIsIphone = sUserAgent.match(/iphone os/i) == 'iphone os';
    var bIsMidp = sUserAgent.match(/midp/i) == 'midp';
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
    var bIsUc = sUserAgent.match(/ucweb/i) == 'web';
    var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
    var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';
    var bIsAndroid = sUserAgent.match(/android/i) == 'android';

    if(bIsIpad || bIsIphone || bIsMidp || bIsUc7 || bIsUc || bIsCE || bIsWM || bIsAndroid ){
        callback();
    }
}

var lang = 'ch';
var string = zh_cn;
try {
     lang = localStorage.getItem('lang');
     string = zh_cn;
    if(lang && lang == 'en'){
        string = en_US;
    }
}
catch (e){

}

var api = 'http://paco.xiaonange.com/index.php/api/v1/';

//提示
function messageTip(value){
    if($('.messageTips').length > 0){
        $('.messageTips').remove();
    }
    $('body').append('<div class="messageTips"><p>'+value+'</p></div>')
    setTimeout(function(){
        $('.messageTips').remove();
    },2000)
}

//获取url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


var header=' <div class="w1200"> <ul> <li><a href="https://pacotora.jd.com/"><i class="jd"></i>京东商城</a> </li> <li><a href="https://pacotora.tmall.com/"><i class="tm"></i>天猫商城</a></li> <li><a href="https://j.youzan.com/_z4lah"><i class="yz"></i>有赞商城</a></li> <li class="lang"><p><a   data-lang="ch">中</a> <a  data-lang="en">En</a></p></li> </ul> </div> ';

$('.header').html(header);




$('.lang a').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    var lang = $(this).data('lang');
    localStorage.setItem('lang',lang);
    location.reload()
})
var phone = '电话：',address = '地址：';

if(lang && lang == 'en'){
    $('.lang a').last().addClass('active');
    phone = 'phone:';address = 'address:';
}else{
    $('.lang a').eq(0).addClass('active')
}

var footicons = ['PTClub.html','https://weibo.com/pacotora?topnav=1&wvr=6&topsug=1&is_hot=1','https://www.facebook.com/PACO-TORA-538221566544257/','https://www.instagram.com/pacotora_/'];

var footIcon = [];

for(var i = 0, l = footicons.length ; i < l ; i++){
    footIcon.push('<a href="'+footicons[i]+'"> <img src="imgs/img/footerIcon'+(i+1)+'.png" /></a>');
}

var footer = '<div class="leftContent"> <p>'+phone+'020-62903830转8813<br/>'+address+'广州市花都区<br/>Copyright 版权所有 © 2017-2022   广州图拉米拉贸易有限公司<br/>All rights reserved</p></div><div class="rightIcon"><div>'+footIcon.join('')+'</div></div> ';
$('.footer').html(footer);




var menu = [{
    name:'首页',
    en:'HOME',
    url:'index.html',
    className:'Index'
},{
    name:'PT BAG',
    url:'product.html',
    className:'Product'
},{
    name:'PT WORLD',
    url:'PTWorld.html',
    className:'WORLD'
},{
    name:'PT CLUB',
    url:'PTClub.html',
    className:'CLUB'
},{
    name:'联系我们',
    en:'CONTACT US',
    url:'contact.html',
    className:'Contact'
}],menuH=[];
var lp = location.pathname.split('/');
var banner = '';
var currntPage = 0;
if(!lp[1]){
    menu[0].url = '';
    menu[0].active = 'active';
}
if(location.pathname.indexOf('brand') > -1){
    menu[2].active = 'active';
}

$.each(menu,function(i,item){
    // item.active ='';
    if(new RegExp(item.url).test(location.pathname)){
        item.href = '';
        item.active = 'active';
        //banner = item.className;
        currntPage = i+1;
    }
    var name = lang && lang == 'en' &&  item.en ? item.en : item.name;
    menuH.push('<a href="'+item.url+'" class="navItem nav'+item.className+' '+item.active+'"><span>'+name+'</span></a>');
})


$('.bodyHead').append('<div class="navContent"></div>');
$('.navContent').append('<div class="logoContainer"> <div class="logo"> <img src="imgs/img/logo.png"/> </div> <img src="imgs/img/line.png"/> </div> <div class="nav">'+menuH.join('')+'</div>');

//获取banner
if(currntPage > 0){
    $.ajax({
        type: "GET",
        url: api+"get_brand?page="+currntPage,
        dataType: "json",
        success: function (data) {
            banner = data.brand; //数据
                var bannerImg = banner ?  '<div class="banner">\n' +
                    ' <div class="bannerInner"><img src="'+banner+'"/>' +
                    '</div>\n' +
                    ' <div class="bgBlack"></div>\n' +
                    '</div>' : '';
                $('.bodyHead').append(bannerImg);
                var $banner =  $('.bannerInner');
                var $bannerwidth = $banner.width();
                var borderRadius = ($bannerwidth / 2) + 'px /  '+($bannerwidth / 4) + 'px';
                $banner.css({'border-radius': borderRadius,'height':$bannerwidth / 2})
                $('.bgBlack').height($bannerwidth / 4  );
        },
        error:function (res) {
            //console.log(res);
            messageTip('无法获取banner');
        }
    });
}







