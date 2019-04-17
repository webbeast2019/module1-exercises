'use strict';
const http = require('http');
const fs = require('fs');
const url = require('url');
const _ = require('./loaddash.min.js');
const INDEX_PAGE = 'index.html';

const contentTypes = new Map();
contentTypes.set('html', 'text/html');
contentTypes.set('js', 'text/javascript');
contentTypes.set('css', 'text/css');
contentTypes.set('json', 'application/json');

let params;
let searchParam;
http.createServer(function (req, res) {
    if (req.method != 'GET') {
        handleResponse(res, 200, 'Only GET method is supported', 'text/plain');
        return;
    }
    const reqUrl = url.parse(req.url, true);
    const fileName = getFileName(reqUrl);
    //if json fileName is not correct - return empty results
    if (!fileName) {
        handleResponse(res, 200, '{}', 'text/plain');
    } else {
        const ext = fileName.split('.')[1];
        const cType = contentTypes.get(ext);
        const prefix = ext == 'json' ? 'public/data/' : 'public/';
        fs.readFile(prefix + fileName, function (err, data) {
            if (err) {
                if (err.code == 'ENOENT') {
                    handleResponse(res, 404, 'Resource not found', 'text/plain');
                } else {
                    handleResponse(res, 500, 'Server Error', 'text/plain');
                }
            } else {
                if (ext == 'json') {
                    data = getData(data, fileName.split('.')[0]);
                }
                handleResponse(res, 200, data, cType);
            }
        });
    }
}).listen(8080, function () {
    console.log('Client is available at http://localhost:8080');
});

function handleResponse(res, status, resultData, contentType) {
    res.writeHead(status, { 'Content-Type': contentType });
    res.write(resultData);
    res.end();
}

function getData(data, file) {
    data = filterResults2(data, file);
    return JSON.stringify(data, undefined, 1);
}

function getFileName(reqUrl) {
    const extPattern = /.(js|html|css)$/g;
    let fileToFetch;
    if (reqUrl.href == '/') {
        fileToFetch = INDEX_PAGE;
    } else if (extPattern.test(reqUrl.pathname)) {
        fileToFetch = reqUrl.pathname;
    } else { //json file
        fileToFetch = getJsonFile(reqUrl);
    }
    return fileToFetch;
}

function getJsonFile(reqUrl) {

    const ext = '.json';

    params = reqUrl.query ? reqUrl.query : {};
    const pathName = reqUrl.pathname.substr(1);

    let jsonFileToFetch;
    if (pathName.indexOf('/') > -1) {
        jsonFileToFetch = getFileByRelationship(pathName);
    } else {
        jsonFileToFetch = pathName;
    }
    if (jsonFileToFetch) {
        jsonFileToFetch += ext;
    }
    return jsonFileToFetch;
}

function getFileByRelationship(pathName) {

    /** * Get the file to return by parent/child relationship if exist
     * One level of nested route is available.
     * ex - posts/1/comments is equivalent to /comments?postId=1
     * posts is the parent folder, comments is the child folder, postId is the relationship field
    */
    let jsonFileToFetch;
    const idPattern = /^[1-9][0-9]*$/;
    const arr = pathName.split('/');
    const parentFolder = arr[0];
    const parentId = arr.length > 1 ? arr[1] : null;
    const childFolder = arr.length > 2 ? arr[2] : null;
    jsonFileToFetch = parentFolder;
    if (childFolder) {
        if (parentId && idPattern.test(parentId)) {
            let childRel = ObjectPropertiesMap.get(childFolder);
            if (childRel && childRel.parentObjName && childRel.parentObjName == parentFolder) { //Not checked in real server - jsonplaceholder.typicode, only returns the child folder
                params[childRel.relationShipFld] = parentId;
                jsonFileToFetch = childFolder;
            } else {//child file not found or doeasn't have a relentionship  (ex - 1. posts/1/cm - cm doesnt exist Or 2. users/1/gfg - users is the base and gfg doesnt exist Or 3.comments/1/users - user is not the child folder of comments)
                jsonFileToFetch = null;
            }
        } else {
            jsonFileToFetch = null;
        }
    } else if (parentId) {
        if (idPattern.test(parentId)) {
            params.id = parentId;
        } else {
            jsonFileToFetch = null;
        }
    }
    return jsonFileToFetch;
}

function filterResults2(resData, file) {
    let result = JSON.parse(resData);
    if (Object.keys(params).length > 0) {
        const validParams = getValidParams2(file);
        const searchParams = params.search && !_.isEmpty(params.search) ? ObjectPropertiesMap.get(file).phraseSearchParams : null;
        const textSearch = searchParams ? params.search.toLowerCase() : null;
        //searct text will work if it its encoded in the query string - example : aut\nsed wont get results work but aut%0Ase will
        if (validParams || searchParams) {
            result = _.filter(result, item => {
                return _.isMatchWith(item, validParams, matchCustomizer) && isSeacrhPhraseIncluded(item, searchParams, textSearch);
            });
        }
        if (result.length > 0) {
            result = sortData(result);
        }
    }
    result = result.length == 0 ? {} : result;
    return result;
}

function matchCustomizer(objValue, srcValue) {
    if ((_.isNumber(objValue) || _.isNumber(srcValue)) && objValue == srcValue) {
        return true;
    } else if (srcValue.split(',').length > 1) {
        return _.includes(srcValue.split(','), _.isNumber(objValue) ? objValue.toString() : objValue);
    }
    else {
        return _.isEqual(objValue.toString().toLowerCase(), srcValue.toString().toLowerCase());
    }
}

function isSeacrhPhraseIncluded(item, searchParams, seacrhText) {
    if (!searchParams || !seacrhText) {
        return true;
    } else {
        for (let i = 0; i < searchParams.length; i++) {
            if (item[searchParams[i]].toString().toLowerCase().includes(seacrhText)) {
                return true;
            }
        }
    }
    return false;
}

function sortData(data) {
    if (params.sortBy) {
        const order = params.order ? params.order.split(',') : ['asc'];
        data = _.orderBy(data, params.sortBy.split(','), order);
    }
    return data;
}

function getValidParams2(file) {
    let validParams = _.pick(params, ObjectPropertiesMap.get(file).validSeacrhParams);
    validParams = _.omitBy(validParams, _.isEmpty);
    return Object.keys(validParams).length > 0 ? validParams : null;
}


/** Map to handle the files relationship and data (valid properties to search by)
 * ex : comments file - 
 *      parent file is posts,
 *      realtionship field - comments.postId
 *      result can be filtered by the properties : 'postId', 'id', 'name', 'email', 'body'
 *      free text search will be in properties : 'name', 'body'
*/
class ObjectProperties {
    constructor(name, parentName, relationShipFld, validSeacrhParams, phraseSearchParams) {
        this.objName = name;
        this.parentObjName = parentName;
        this.relationShipFld = relationShipFld;
        this.validSeacrhParams = validSeacrhParams;
        this.phraseSearchParams = phraseSearchParams;
    }
}
const ObjectPropertiesMap = new Map();
ObjectPropertiesMap.set('albums', new ObjectProperties('albums', 'users', 'userId', ['userId', 'id', 'title']));
ObjectPropertiesMap.set('comments', new ObjectProperties('comments', 'posts', 'postId', ['postId', 'id', 'name', 'email', 'body'], ['name', 'body']));
ObjectPropertiesMap.set('photos', new ObjectProperties('photos', 'albums', 'albumId', ['albumId', 'id', 'title', 'url', 'thumbnailUrl']));
ObjectPropertiesMap.set('posts', new ObjectProperties('posts', 'users', 'userId', ['userId', 'id', 'title', 'body'], ['title', 'body']));
ObjectPropertiesMap.set('todos', new ObjectProperties('todos', 'users', 'userId', ['userId', 'id', 'title', 'completed']));
ObjectPropertiesMap.set('users', new ObjectProperties('users', null, null, ['id', 'name', 'username', 'email', 'phone', 'website']));