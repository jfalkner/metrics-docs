// global config
Window.App = {
    blankQuery: true,
    query: null
}

Window.App.isBlank = (str) => {
    if (!str || str.length === 0 || str.trim() == '' || typeof str == 'undefined' || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g,"") === "") {
        return true
    }
    return false
}

// URI param parser taken originally from http://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
Window.App.getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}