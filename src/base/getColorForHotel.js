var get_color_hotel = function (score,isHome) {
    var circleColor;
    if(isHome) {
        if (score >= 4.75)
            circleColor = '#FF0000';
        else if (score >= 4.70)
            circleColor = '#FF6100'
        else if (score >= 4.65)
            circleColor = '#FFFF00'
        else if (score >= 4.6)
            circleColor = '#00FF00'
        else if (score >= 4.55)
            circleColor = '#7CFC00';
        else if (score >= 4.5)
            circleColor = '#87CEEB';
        else
            circleColor = '#DA70D6';
    }else{
        //不同的时间区间
        if (score >= 4.5)
            circleColor = '#FF0000';
        else if (score >= 4.3)
            circleColor = '#FF6100'
        else if (score >= 4.1)
            circleColor = '#FFFF00'
        else if (score >= 3.9)
            circleColor = '#00FF00'
        else if (score >= 3.7)
            circleColor = '#7CFC00';
        else if (score >= 3.5)
            circleColor = '#87CEEB';
        else
            circleColor = '#DA70D6';
    }
    return circleColor;
}
var get_radius_hotel = function (num,is_home) {
    if(is_home) {
        if(num >= 0 && num <= 5)
            return 5;
        else if(num > 5 && num <= 10)
            return 6;
        else if(num > 10 && num <= 15)
            return 7;
        else if(num > 15 && num <= 20)
            return 8;
        else if(num > 25 && num <= 30)
            return 9;
        else if(num > 35 && num <= 40)
            return 10;
        else if(num > 40 && num <= 60)
            return 11;
        else if(num > 60 && num <= 80)
            return 12;
        else if(num > 80 && num <= 100)
            return 13;
        else if(num > 100 && num <= 150)
            return 14;
        else if(num > 150 && num <= 200)
            return 15;
        else if(num > 200 && num <= 300)
            return 16;
        else if(num > 300 && num <= 1000)
            return 17;
        else if(num > 1000 && num <= 5000)
            return 18;
        else if(num > 5000 && num <= 10000)
            return 19;
        else
            return 20;
    }else{
        if(num >= 0 && num <= 5)
            return 5;
        else if(num > 5 && num <= 10)
            return 6;
        else if(num > 10 && num <= 15)
            return 7;
        else if(num > 15 && num <= 20)
            return 8;
        else if(num > 25 && num <= 30)
            return 9;
        else if(num > 35 && num <= 40)
            return 10;
        else if(num > 40 && num <= 60)
            return 11;
        else if(num > 60 && num <= 80)
            return 12;
        else if(num > 80 && num <= 100)
            return 13;
        else if(num > 100 && num <= 150)
            return 14;
        else if(num > 150 && num <= 200)
            return 15;
        else if(num > 200 && num <= 300)
            return 16;
        else if(num > 300 && num <= 1000)
            return 17;
        else if(num > 1000 && num <= 5000)
            return 18;
        else if(num > 5000 && num <= 10000)
            return 19;
        else
            return 20;
    }
}
export {get_color_hotel,get_radius_hotel};