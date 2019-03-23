//获取当前景区评论数量当前的排名和评论数 和评分数量当前景区的排名和评分数
//景区评论分数排名

var get_num_hotel_rank = function(hotel_rate, curr_hotel_index, hotellist) {
    var total = '/'
    for(var i = 0; i < hotellist.length; i++) {
        if(hotellist[i]['name'] == hotel_rate) {
            total += hotellist[i].latterAttr.toString();
            break;
        }
    }
    total = curr_hotel_index.toString() + total;
    return total;
};
var get_score_hotel_rank = function(hotel_rate, curr_hotel_index, hotellist) {
    var total = '/'
    for(var i = 0; i < hotellist.length; i++) {
        if(hotellist[i]['name'] == hotel_rate) {
            total += hotellist[i].latterAttr.toString();
            break;
        }
    }
    total = curr_hotel_index.toString() + total;
    return total;

};
export { get_num_hotel_rank, get_score_hotel_rank };
