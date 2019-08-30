const Util = {
    getInterceptValue(data, value) {
        let path = decodeURI(data);
        let index = path.indexOf(value);
        return path.slice(index + value.length);
    }
}
export default Util;