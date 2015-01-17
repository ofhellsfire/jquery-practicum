$(document).ready(function(){
    $("div.list a").each(function(){
        var link = $(this).attr('href').split('.').pop();
        $("div.list a[href$=" + link + "]").before('<div class="file-icon" data-type="' + link + '"></div>');
    });
});