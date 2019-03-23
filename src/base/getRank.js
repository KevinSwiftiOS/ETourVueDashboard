//获取当前景区评论数量当前的排名和评论数 和评分数量当前景区的排名和评分数
//景区评论分数排名
var compare = function(val1, val2) {
  if (val1.commentScore - val2.commentScore < 0) return 1;
  else return -1;
};

var get_num_rank = function(list, cur_spot, is_home) {
  var total = "/18";
  if (!is_home) total = "/21";

  for (var i = 0; i < list.length; i++)
    if (list[i]._id == cur_spot) {
      var dic = {
        commentNumber: list[i].commentNumber,
        rank: (i + 1).toString() + total
      };
      return dic;
    }
  //当前没有景区排名
  return {
    commentNumber: 0,
    rank: "0"
  };
};
var get_score_rank = function(list, cur_spot, is_home) {
  var total = "/18";
  if (!is_home) total = "/21";
  var temp = [];
  for (var i = 0; i < list.length; i++) temp.push(list[i]);
  var score_list = temp.sort(compare);

  for (var i = 0; i < score_list.length; i++)
    if (score_list[i]._id == cur_spot) {
      var dic = {
        commentScore: score_list[i].commentScore.toFixed(2),
        rank: (i + 1).toString() + total
      };
      return dic;
    }
  //当前没有景区排名
  return {
    commentScore: 0,
    rank: "0"
  };
};
export { get_num_rank, get_score_rank };
