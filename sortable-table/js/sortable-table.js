$(document).ready(function(){

    $('table').on('click','th',function(){
        var index = parseInt($(this).index() + 1);
        var itemsForSort = [];
        var selector = 'table tr:not(tr:first)';
        var sorted;

        $(selector).each(function(index){
            itemsForSort.push($(this));
        });

        if($(this).children('div').hasClass('desc')){                // Check if column has already sorted
            $(this).children('div').removeClass('desc');             // if so, sort descendingly
            $(this).children('div').addClass('asc');
            sorted = itemsForSort.sort(ascendingSort(index));
        } else {
            if($('th>div').length){                                 // Check if sorted by another column
                $('th>div').remove();                               // if so, clean everything out
            }
            $(this).append('<div></div>');                          // sort ascendingly
            $(this).children('div').addClass('desc');
            sorted = itemsForSort.sort(descendingSort(index));
        }

        $(selector).remove();
        sorted.forEach(function(val){
            $('table').append(val);
        });
    });
});


function getCellValue(obj, index){
    return obj.children(':nth-child('+ index + ')').text().toLowerCase();
}

function isNumber(value){
    var re = /^((?:\d+[., ]+)*(?:\d)+)/gi;
    if(value.match(re)){
        return true;
    } else {
        return false;
    }
}

function turnToNumber(value){
    var re = /[,. ]/g;
    var reSpace = /[ ]/g;
    var singleSeparator = /^\d+[,.]\d+/g;
    var t;
    if(value.match(re)){
        if(value.match(reSpace)) {
            t = value.replace(/ /g, "");
        } else {
            t = value;
        }
        if(t.match(singleSeparator)){
            return parseFloat(t);
        } else {
            return parseInt(t.replace(/[,.]/g, ""));
        }
    } else {
        return value;
    }
}

function ascendingSort(index){
    return function(x, y){
        var a = getCellValue(x, index);
        var b = getCellValue(y, index);
        if(isNumber(a) && isNumber(b)) {
            a = turnToNumber(a);
            b = turnToNumber(b);
            return b - a;
        } else {
            if (a > b) {
                return -1;
            }
            if (a < b) {
                return 1;
            }
            return 0;
        }
    }
}

function descendingSort(index){
    return function(x, y){
        var a = getCellValue(x, index);
        var b = getCellValue(y, index);
        if(isNumber(a) && isNumber(b)) {
            a = turnToNumber(a);
            b = turnToNumber(b);
            return a - b;
        } else {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        }
    }
}