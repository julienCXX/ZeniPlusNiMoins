// ==UserScript==
// @name        ZeniPlusNiMoins
// @namespace   https://chmodplusx.eu/
// @description Améliore le fonctionnement du Zenith de l’Ensimag
// @include     https://intranet.ensimag.fr/Zenith2/*
// @version     1.0
// @grant       none
// ==/UserScript==

// Author: julienCXX

(function() {
var table, coefSumNode, meanNode, meanRow;
var coefSum = 0, gradeSum = 0;

var addExtraStyles = function() {
    var extraStyles = "th, td {padding: 5px;}"
                    + ".lessThan8 {background-color: #FF3333;}"
                    + ".lessThan10 {background-color: #FFAAAA;}"
                    + ".lessThan12 {background-color: #FFB981;}"
                    + ".lessThan14 {background-color: #CCFFA9;}"
                    + ".lessThan16 {background-color: #76FF76;}"
                    + ".upTo20 {background-color: #009953;}"
                    + "tfoot > tr {font-weight: bold;}";

    var headNode = document.getElementsByTagName("head")[0];
    var styleNode = document.createElement("style");
    styleNode.type = "text/css";
    styleNode.textContent = extraStyles;
    headNode.appendChild(styleNode);
};

var addTableFooter = function() {
    var tfoot = document.createElement("tfoot");
    table.appendChild(tfoot);
    meanRow = tfoot.insertRow();
    meanRow.insertCell().textContent = "Somme des coefficients";
    coefSumNode = meanRow.insertCell();
    meanRow.insertCell().textContent = "Moyenne";
    meanNode = meanRow.insertCell();
};

var updateStyle = function(row) {
    var coefText = row.children[1].textContent;
    var coefFloat = parseFloat(coefText);
    var gradeText = row.children[3].textContent;
    var gradeFloat = parseFloat(gradeText);
    if (gradeFloat === NaN)
        row.className = "";
    else if (gradeFloat < 8)
        row.className = "lessThan8";
    else if (gradeFloat < 10)
        row.className = "lessThan10";
    else if (gradeFloat < 12)
        row.className = "lessThan12";
    else if (gradeFloat < 14)
        row.className = "lessThan14";
    else if (gradeFloat < 16)
        row.className = "lessThan16";
    else if (gradeFloat <= 20)
        row.className = "upTo20";
    else
        row.className = "";

    return {coef: coefFloat, grade: gradeFloat};
};

    if (document.URL.indexOf("ConsultNotes") != -1) {
        table = document.getElementsByTagName("table")[0];
        addExtraStyles();
        addTableFooter();
        var tableBody = table.children[1];
        var subjects = tableBody.children;
        for (var i = 0, length = subjects.length; i < length; i++) {
            var subject = subjects[i];
            var rowValues = updateStyle(subject);
            if (rowValues.coef !== NaN)
                coefSum += rowValues.coef;
            if (rowValues.coef !== NaN && rowValues.grade !== NaN)
                gradeSum += rowValues.coef * rowValues.grade;
        }
        coefSumNode.textContent = coefSum;
        meanNode.textContent = gradeSum / coefSum;
        updateStyle(meanRow);
    }
})();
