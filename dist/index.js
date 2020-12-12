"use strict";
// By Henrique Bruno Fantauzzi de Almeida, aka SrBrama. December 12, 2020.
Object.defineProperty(exports, "__esModule", { value: true });
exports.decomposeSku = exports.getValAndValidate = void 0;
// Full Example:
// 'app_myApp.os_ios.id_license.id2_0.t_3m.loc_br.v_1';
function getFieldValue(source, field) {
    var _a, _b;
    var r = new RegExp("(?<!\\w)" + field + "_(\\w+)");
    return (_b = (_a = r.exec(source)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : undefined;
}
function getValAndValidate(sku, field, required, validation) {
    if (required !== 'required' && required !== 'optional')
        throw new Error("\"required\" parameter is neither \"required\" or \"optional\". Value=\"" + required + "\"");
    var val = getFieldValue(sku, field);
    if (val === undefined) {
        if (required === 'required')
            throw new Error("\"" + field + "\" SKU required field not found. SKU=\"" + sku + "\"");
    }
    else {
        if (validation) {
            if (!validation.test(val))
                throw new Error("\"" + field + "\" SKU field doesn't match the regex. SKU=\"" + sku + "\", value=\"" + val + "\", regex=\"" + validation + "\"");
        }
    }
    return val;
}
exports.getValAndValidate = getValAndValidate;
function decomposeSku(sku) {
    function getVal(field, required, validation) {
        return getValAndValidate(sku, field, required, validation);
    }
    var app = getVal('app', 'optional');
    var os = getVal('os', 'required', new RegExp('(android)|(ios)'));
    var duration = getVal('t', 'required');
    var id = getVal('id', 'required');
    var id2 = getVal('id2', 'optional');
    var loc = getVal('loc', 'optional');
    var vStr = getVal('v', 'required');
    var v = Number(vStr);
    if (isNaN(v)) {
        throw new Error("\"v\" SKU field is not a valid number. Value=\"" + vStr + "\"");
    }
    return {
        app: app,
        duration: duration,
        id: id,
        id2: id2,
        loc: loc,
        v: v,
        os: os,
        sku: sku
    };
}
exports.decomposeSku = decomposeSku;
