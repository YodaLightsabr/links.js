

/**
 * Checks if a given string can be converted to a URL
 * @param {String} url - A url string to check 
 */
function checkUrl (url) {
    let parsed = false;
    try {
        parsed = new URL(url);
    } catch (err) {}
    return parsed;
}

function InternalSearchParamsHandler (searchParams) {
    let allParams = {};
    function getParam (param) {
        if (!param) return allParams;
        return searchParams.get(param);
    }
    searchParams.forEach((value, key) => {
        getParam[key] = value;
        allParams[key] = value;
    });
    getParam.prototype.getAll = searchParams.getAll;
    getParam.prototype.entries = searchParams.entries;
    getParam.prototype.append = searchParams.append;
    getParam.prototype.delete = searchParams.delete;
    getParam.prototype.get = searchParams.get;
    getParam.prototype.forEach = searchParams.forEach;
    getParam.prototype.getAll = searchParams.getAll;
    getParam.prototype.has = searchParams.has;
    getParam.prototype.keys = searchParams.keys;
    getParam.prototype.set = searchParams.set;
    getParam.prototype.sort = searchParams.sort;
    getParam.prototype.toString = searchParams.toString;
    getParam.prototype.values = searchParams.values;
    return getParam;
}

class Link {
    /**
     * Convert a URL or domain name to a Link class
     * @param {String} url - URL or domain name
     */
    constructor (url) {
        this.raw = url;
        let parsed = checkUrl(url);
        if (!url.includes('.')) throw new Error('Invalid URL'); // I mean how could a URL not have a period?
        if (!parsed) parsed = checkUrl(`https://${url}`); // Resource intensive (I'd imagine) guess and check method
        if (!parsed) parsed = checkUrl(`http://${url}`);
        if (!parsed) parsed = checkUrl(`https:${url}`);
        if (!parsed) parsed = checkUrl(`https${url}`);
        if (!parsed) throw new Error('Invalid URL');
        this.parsed = parsed;
    }

    get href () { return this.parsed.href }
    set href (input) { this.parsed.href = input }

    get origin () { return this.parsed.origin }
    set origin (input) { this.parsed.origin = input }

    get protocol () { return this.parsed.protocol }
    set protocol (input) { this.parsed.protocol = input }

    get usernane () { return this.parsed.usernane }
    set usernane (input) { this.parsed.usernane = input }

    get password () { return this.parsed.password }
    set password (input) { this.parsed.password = input }
    
    get host () { return this.parsed.host }
    set host (input) { this.parsed.host = input }

    get hostname () { return this.parsed.hostname }
    set hostname (input) { this.parsed.hostname = input }

    get port () { return this.parsed.port }
    set port (input) { this.parsed.port = input }

    get pathname () { return this.parsed.pathname }
    set pathname (input) { this.parsed.pathname = input }

    get path () { return this.parsed.pathname }
    set path (input) { this.parsed.pathname = input }

    get search () { return this.parsed.search }
    set search (input) { this.parsed.search = input }

    get queryString () { return this.parsed.search }
    set queryString (input) { this.parsed.search = input }

    get querystring () { return this.parsed.search }
    set querystring (input) { this.parsed.search = input }

    get hash () { return this.parsed.hash }
    set hash (input) { this.parsed.hash = input }

    get params () { return this.searchParams }
    set params (input) { this.searchParams = input }

    get queryParams () { return this.searchParams }
    set queryParams (input) { this.searchParams = input }

    get query () { return this.searchParams }
    set query (input) { this.searchParams = input }

    get searchParams () {
        let searchParams = this.parsed.searchParams;
        return InternalSearchParamsHandler(searchParams);
    }

    getParam (param) {
        return InternalSearchParamsHandler(this.parsed.searchParams)(param);
    }

    static validate (url) {
        let parsed = checkUrl(url);
        if (!url.includes('.')) return false; // I mean how could a URL not have a period?
        if (!parsed) parsed = checkUrl(`https://${url}`); // Resource intensive (I'd imagine) guess and check method
        if (!parsed) parsed = checkUrl(`http://${url}`);
        if (!parsed) parsed = checkUrl(`https:${url}`);
        if (!parsed) parsed = checkUrl(`https${url}`);
        return (parsed !== false) ? true : false;
    }
}

module.exports = function linksjs (url) {
    return new Link(url);
}
module.exports.Link = Link;
module.exports.checkUrl = checkUrl;
module.exports.validate = Link.validate;
