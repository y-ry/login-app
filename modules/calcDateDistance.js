
var SECOND_MILLISECOND = 1000,
    MINUTE_MILLISECOND = 60 * SECOND_MILLISECOND,
    HOUR_MILLISECOND = 60 * MINUTE_MILLISECOND,
    DAY_MILLISECOND = 24 * HOUR_MILLISECOND,
    WEEK_MILLISECOND = 7 * DAY_MILLISECOND,
    YEAR_MILLISECOND = 365 * DAY_MILLISECOND;

/**
 *  @returns {number}
 *  @param {Date} src
 *  @param {Date} dst
 */
module.exports.yearDistance = function (src, dst) {
    var deltaMillsecond = dst.getTime() - src.getTime();
    return deltaMillsecond / YEAR_MILLISECOND;
};
// snip
module.exports.secondDistance = function (src, dst) {
    var deltaMillsecond = dst.getTime() - src.getTime();
    return deltaMillsecond / SECOND_MILLISECOND;
};
module.exports.minuteDistance = function (src, dst) {
    console.log('param',src,dst);
    var deltaMillsecond = dst.getTime() - src.getTime();
    return deltaMillsecond / MINUTE_MILLISECOND;    
};

module.exports.getNumberOfDaysForMonth = function (year, month) {
        return new Date(year, month + 1, 0).getDate()
    };
    /**
     *  @returns {number}
     *  @param {Date} src
     *  @param {Date} dst
     */
module.exports.monthDistance = function (src, dst) {
    var deltaYear = dst.getFullYear() - src.getFullYear(),
        deltaMonth = deltaYear * 12 + dst.getMonth() - src.getMonth(),
        srcOffsetMilliseconds = src.getDate() * DAY_MILLISECOND + src.getHours() * HOUR_MILLISECOND + src.getMinutes() * MINUTE_MILLISECOND + src.getSeconds() * SECOND_MILLISECOND + src.getMilliseconds(),
        srcNumberOfDaysForMonth = this.getNumberOfDaysForMonth(src.getFullYear(), src.getMonth() + 1),
        srcOffsetRate = srcOffsetMilliseconds / (srcNumberOfDaysForMonth * DAY_MILLISECOND),
        dstOffsetMilliseconds = dst.getDate() * DAY_MILLISECOND + dst.getHours() * HOUR_MILLISECOND + dst.getMinutes() * MINUTE_MILLISECOND + dst.getSeconds() * SECOND_MILLISECOND + dst.getMilliseconds(),
        dstNumberOfDaysForMonth = this.getNumberOfDaysForMonth(dst.getFullYear(), dst.getMonth() + 1),
        dstOffsetRate = dstOffsetMilliseconds / (dstNumberOfDaysForMonth * DAY_MILLISECOND);

    return deltaMonth - srcOffsetRate + dstOffsetRate;
};