//设置sessionStorage
var set_session_storage = function(key, value) {
  sessionStorage.setItem(key, value);
};
//获取cookie
var get_session_storage = function(key) {
  var value = sessionStorage.getItem(key);
  if (value == null) {
    if (key == "curr_spot") return "千岛湖";
    if (key == "qdh_curr_spot") return "中心湖";
    if (key == "isFirst") return false;
  } else return value;
};

var remove_session_storage = function(key) {
  var value = sessionStorage.removeItem(key);
};
export { set_session_storage, get_session_storage ,remove_session_storage};
