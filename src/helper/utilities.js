export const watchScrollDirection = function(scrollElement, callback) {
  const scrollPos = { x: 0, y: 0 };
  const scrollDirection = {
    directionX: 1,
    directionY: 1,
  };
  let previousTimer;
  function onScroll(e) {
    const scrollTop = scrollElement.scrollTop || scrollElement.pageYOffset;
    const scrollLeft = scrollElement.scrollLeft || scrollElement.pageXOffset;

    if (scrollPos.y > scrollTop) {
      scrollDirection.directionY = -1;
    } else {
      scrollDirection.directionY = 1;
    }
    if (scrollPos.x > scrollLeft) {
      scrollDirection.directionX = -1;
    } else {
      scrollDirection.directionX = 1;
    }

    callback.call(scrollElement, scrollDirection, scrollPos);

    scrollPos.x = scrollLeft;
    scrollPos.y = scrollTop;
  }
  function throttle() {
    let now = Date.now();
    if (!previousTimer) previousTimer = now;
    if (now - previousTimer > 30) {
      onScroll();
      previousTimer = now;
    }
  }
  scrollElement.addEventListener("scroll", throttle);
  return function() {
    scrollElement.removeEventListener("scroll", throttle);
  };
};

export function formatDate(date, format = true) {
  date = new Date(date);
  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const Y = date.getFullYear();
  const M = (parseInt(date.getMonth()) + 1).toString().padStart(2, 0);
  const d = date
    .getDate()
    .toString()
    .padStart(2, 0);
  const h = date
    .getHours()
    .toString()
    .padStart(2, 0);
  const m = date
    .getMinutes()
    .toString()
    .padStart(2, 0);
  const s = date
    .getSeconds()
    .toString()
    .padStart(2, 0);

  return format ? `${Y}-${M}-${d} ${h}:${m}:${s}` : `${Y}-${M}-${d}`;
}

export function getOffsetTop(relativeNode, node, topSum = 0) {
  topSum += node.offsetTop;

  if (node.offsetParent !== relativeNode) {
    return getOffsetTop(relativeNode, node.offsetParent, topSum);
  }
  return topSum;
}

export function pick(obj = {}, keys = []) {
  const result = {};
  keys.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  });
  return result;
}
