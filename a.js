/* global nbWeather */

function getMonthlyAverages(weather, yearinput)
{
 // from David Koop assignment instruction
    myfinal = Array.apply(null, Array(12)).map(function () {
        return 0;
    });

    var filteryear = weather.filter(function (call) {
        return call['Year'] === yearinput;
    });

    Object.keys(filteryear).forEach(function (newarr) {

        if (filteryear.length !== 0) {

            var value = filteryear[newarr]['Month'];

            var filtermonth = filteryear.filter(function (montharray) {
                return montharray['Month'] === value;
            });

            filteryear = filteryear.filter(function (rmvmontharray) {
                return rmvmontharray['Month'] !== value;
            });

            var monthMeanArray = filtermonth.map(function (item) {
                return item.MeanTempF;
            });

            var totalmeantemp = monthMeanArray.reduce(function (oldmeantemp, newmeantemp) {
                return oldmeantemp + newmeantemp;
            });
           
            var avgmeantemp = totalmeantemp / monthMeanArray.length;

            myfinal [value - 1] = avgmeantemp.toFixed(2);

        } else {

            return false;
        }

    });
    return myfinal;
}



function createLineChart(mydiv, yearmydata)
{

    var svg = makeElt("svg", {width: 600, height: 400}, mydiv);
    makeElt("line", {x1: 70, y1: 50, x2: 70, y2: 350, stroke: "black", class: "strokeclass"}, svg);
    makeElt("line", {x1: 70, y1: 350, x2: 550, y2: 350, stroke: "black", class: "strokeclass"}, svg);
   
     // from David Koop given materials 
    var labelxjan = makeElt("text", {x: 65, y: 365, class: "labelprop"}, svg);
    labelxjan.appendChild(document.createTextNode("Jan"));

    var labelxdec = makeElt("text", {x: 505, y: 365, class: "labelprop"}, svg);
    labelxdec.appendChild(document.createTextNode("Dec"));

    var labely = makeElt("text", {x: 50, y: (350 - (75 * 4)) + 5, class: "labelprop"}, svg);
    labely.appendChild(document.createTextNode("75"));

    var scaleyearmydata = yearmydata.map(function (data) {
        return data * 4;
    });


    //alert (scaleyearmydata); 

    var Xplace = 70;
    var i;
    for (i = 1; i < yearmydata.length; i++) {

        makeElt("circle", {cx: Xplace, cy: 350 - scaleyearmydata[i - 1], r: "5", fill: "blue"}, svg);

        var Xnextplace = Xplace + 40;

        var labelavg = makeElt("text", {x: Xplace - 4, y: (350 - scaleyearmydata[i - 1]) + 15, class: "labelgraph", fill: "red"}, svg);
        labelavg.appendChild(document.createTextNode(scaleyearmydata[i - 1] / 4));

        makeElt("line", {x1: Xplace, y1: 350 - scaleyearmydata[i - 1], x2: Xnextplace, y2: 350 - scaleyearmydata[i], stroke: "blue", class: "strokeclass"}, svg);

        Xplace = 70 + ((i) * 40);

    }
    makeElt("circle", {cx: Xplace, cy: 350 - scaleyearmydata[i - 1], r: "4", fill: "blue"}, svg);
    var labelavg = makeElt("text", {x: Xplace - 4, y: (350 - scaleyearmydata[i - 1]) + 15, class: "labelgraph", fill: "red"}, svg);
        labelavg.appendChild(document.createTextNode(scaleyearmydata[i - 1] / 4));
}

 // from David Koop assignment instruction
function makeElt(name, attrs, appendTo)
{
    var element = document.createElementNS("http://www.w3.org/2000/svg", name);
    if (attrs === undefined)
        attrs = {};
    for (var key in attrs) {
        element.setAttributeNS(null, key, attrs[key]);
    }
    if (appendTo) {
        appendTo.appendChild(element);
    }
    return element;
}

window.onload = function () {

    document.getElementById('demo').innerHTML = '[' + getMonthlyAverages(nbWeather, 2014) + ']';

    createLineChart(document.getElementById('linechart'), getMonthlyAverages(nbWeather, 2015));

}