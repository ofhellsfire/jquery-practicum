$(document).ready(function(){
    makeReference("h1");
});

function makeReference(attachTarget, id){
    var id = id || "referencer";
    var divOpen = '<div id="'+ id +'">';
    var divClosed = '</div>';
    var html = divOpen;

    $("h2, h3, h4, h5, h6").each(function(index){
        var txt = $(this).text();
        var headerDigit = parseInt($(this).prop('tagName').slice(-1));
        var spacer = Array((headerDigit - 2) * 4).join('&nbsp;');
        var link = txt.replace(/\s/g,"_") + '_' + index;

        $(this).wrapInner('<a name="' + link + '" />');
        html += '<div>' + spacer + '<a href="#' + link + '">' + txt + '</a></div>';
    });

    html += divClosed;

    $(attachTarget).after(html);
}