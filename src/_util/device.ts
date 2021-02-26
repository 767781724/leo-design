/**
 * @return {boolean}
 */
function isAndroid() {
  const u = navigator.userAgent;
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    return true;
  }
  return false;
}

/**
 * @return {boolean}
 */
function isIos() {
  const u = navigator.userAgent;
  if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
    return true;
  }
  return false;
}
/**
 * @return {boolean}
 */
function isPc() {
  const u = navigator.userAgent;
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(u)) {
    return false;
  } else {
    return true;
  }
}

export {
  isAndroid,
  isIos,
  isPc,
};
