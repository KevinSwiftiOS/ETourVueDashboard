//设置cookie
var set_cookies = function(key, value) {
  var d = new Date();
  d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  console.info(key + "=" + value + "; " + expires);
  document.cookie = key + "=" + value + "; " + expires;
};
//获取cookie
var get_cookies = function(key) {
  //根据空格进行划分
  var ca = document.cookie.split("; ");
  console.log(ca);
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].split("=");

    if (c[0] == key) {
      return c[1];
    }
  }
  if (key == "curr_spot") return "千岛湖";
  if (key == "qdh_curr_spot") return "中心湖";
};
//清除cookie 在退出时有用
var clear_cookies = function() {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--; )
      document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
  }
};

export { set_cookies, get_cookies, clear_cookies };
