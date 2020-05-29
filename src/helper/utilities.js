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
    callback.call(scrollElement, scrollDirection,scrollPos);

    scrollPos.x = scrollLeft;
    scrollPos.y = scrollTop;
  }
  scrollElement.addEventListener("scroll", onScroll);
  return function() {
    scrollElement.removeEventListener("scroll", onScroll);
  };
};
