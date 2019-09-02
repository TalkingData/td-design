const Util = {
    getInterceptValue(data, value) {
        let path = decodeURI(data);
        let index = path.indexOf(value);
        return path.slice(index + value.length);
    },
    /** 
     * 获取cook
     */
    getCookie(cookieName) {
        var cookieValue = "";
        if (document.cookie && document.cookie != "") {
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                if (
                    cookie.substring(0, cookieName.length + 2).trim() ==
                    cookieName.trim() + "="
                ) {
                    cookieValue = cookie.substring(
                        cookieName.length + 2,
                        cookie.length
                    );
                    break;
                }
            }
        }
        return cookieValue;
    }
}
export default Util;