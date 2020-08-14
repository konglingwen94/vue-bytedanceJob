export const watchScrollDirection = function(scrollElement, callback) {
  const scrollPos = { x: 0, y: 0 };
  const scrollDirection = {
    directionX: 1,
    directionY: 1,
  };

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
  scrollElement.addEventListener("scroll", onScroll);
  return function() {
    scrollElement.removeEventListener("scroll", onScroll);
  };
};

export function formatDate(date, format=true) {
  date = new Date(date);
  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const Y = date.getFullYear();
  const M = date
    .getMonth()
    .toString()
    .padStart(2, 0);
  const d = date
    .getDay()
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
