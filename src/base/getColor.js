var get_color = function(score, isHome) {
  var circleColor;
  if (isHome) {
    if (score >= 4.75) circleColor = "#FF0000";
    else if (score >= 4.7) circleColor = "#FF6100";
    else if (score >= 4.65) circleColor = "#FFFF00";
    else if (score >= 4.6) circleColor = "#00FF00";
    else if (score >= 4.55) circleColor = "#7CFC00";
    else if (score >= 4.5) circleColor = "#87CEEB";
    else circleColor = "#DA70D6";
  } else {
    //不同的时间区间
    if (score >= 4.5) circleColor = "#FF0000";
    else if (score >= 4.3) circleColor = "#FF6100";
    else if (score >= 4.1) circleColor = "#FFFF00";
    else if (score >= 3.9) circleColor = "#00FF00";
    else if (score >= 3.7) circleColor = "#7CFC00";
    else if (score >= 3.5) circleColor = "#87CEEB";
    else circleColor = "#DA70D6";
  }
  return circleColor;
};

var get_radius = function(num, is_home) {
  if (is_home) {
    if (num >= 0 && num <= 500) return 0;
    else if (num > 500 && num <= 1000) return 3;
    else if (num > 1000 && num <= 2000) return 6;
    else if (num > 2000 && num <= 3000) return 9;
    else if (num > 3000 && num <= 5000) return 12;
    else if (num > 5000 && num <= 7000) return 15;
    else if (num > 7000 && num <= 10000) return 18;
    else if (num > 10000 && num <= 15000) return 21;
    else if (num > 15000 && num <= 20000) return 27;
    else if (num > 20000 && num <= 30000) return 35;
    else return 40;
  } else {
    if (num >= 0 && num <= 50) return 0;
    else if (num > 50 && num <= 100) return 5;
    else if (num > 100 && num <= 200) return 10;
    else if (num > 200 && num <= 300) return 15;
    else if (num > 300 && num <= 500) return 20;
    else if (num > 500 && num <= 700) return 25;
    else if (num > 700 && num <= 1000) return 30;
    else if (num > 1000 && num <= 2000) return 31;
    else if (num > 2000 && num <= 5000) return 45;
    else if (num > 5000 && num <= 7000) return 50;
    else return 55;
  }
};

export { get_color, get_radius };
