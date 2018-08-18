document.getElementById("callPretty").addEventListener("click", prettyPrint);
document.getElementById("newTab").addEventListener("click", newTab);
document.getElementById("callRaw").addEventListener("click", rawPrint);
document.getElementById("callCopyMe").addEventListener("click", copyMe);
document.getElementById("jsonStringEscape").addEventListener("click", escapeJson);
document.getElementById("jsonStringUnescape").addEventListener("click", unescapeJson);


window.onload = function () {
    addLinesInTextarea();
};

JSON._parse = JSON.parse
JSON.parse = function (json) {
    try {
        return JSON._parse(json)
    } catch (e) {
        jsonlint.parse(json)
    }
}

function prettyPrint() {
    try {
        var ugly = document.getElementById('dumpArea').value;
        var obj = JSON.parse(ugly);
        var pretty = JSON.stringify(obj, undefined, 4);
        document.getElementById('dumpArea').value = pretty;
        $("#infoArea").html("Formatted Json");
    } catch (exc) {
        $("#infoArea").html(exc + '');
    }
}

function escapeJson() {
    try {
        var unescaped = document.getElementById('dumpArea').value;
        var myJSONString = JSON.stringify(unescaped);
        myJSONString = myJSONString.substring(1, myJSONString.length - 1);
        document.getElementById('dumpArea').value = myJSONString;
        $("#infoArea").html("Escaped text");
    } catch (exc) {
        $("#infoArea").html(exc + '');
    }
}

function unescapeJson() {
    try {
        var escaped = document.getElementById('dumpArea').value;
        var myJSONString = escaped.unescapeSpecialChars();
        document.getElementById('dumpArea').value = myJSONString;
        $("#infoArea").html("Unescaped text");
    } catch (exc) {
        $("#infoArea").html(exc + '');
    }
}

String.prototype.unescapeSpecialChars = function () {
    var original = this
    var replaced = this.replace(/\\\\/g, "\\")
    if (original.toString() !== replaced.toString()) {
        return this.replace(/\\\\/g, "\\")
            .replace(/\\'/g, "'")
            .replace(/\\"/g, '"');
    } else {
        return this.replace(/\\'/g, "'")
            .replace(/\\"/g, '"')
            .replace(/\\&/g, "\&")
            .replace(/\\n/g, "\n")
            .replace(/\\r/g, "\r")
            .replace(/\\t/g, "\t")
            .replace(/\\b/g, "\b")
            .replace(/\\f/g, "\f");
    }
};

function rawPrint() {
    var formatted = document.getElementById('dumpArea').value;
    var raw = formatted.replace(/(\r\n|\n|\r)/gm, "");
    raw = raw.replace(/\s+/g, ' ');
    document.getElementById('dumpArea').value = raw;
    $("#infoArea").html("Raw Text");
}

function copyMe() {
    var $temp = $("<textarea style='height:0px'>");
    $("body").append($temp);
    $temp.val(document.getElementById('dumpArea').value).select();
    document.execCommand("copy");
    $("#infoArea").html("Text Copied");
    $temp.remove();
}

function newTab() {
    chrome.tabs.create({url: chrome.extension.getURL('newTab.html#window')});
    return false;
}

function addLinesInTextarea() {
    $(".lined").linedtextarea();
}