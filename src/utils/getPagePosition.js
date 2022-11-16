export function getPagePosition(event) {
  //   let { posX, posY } = { posX: event.pageX, posY: event.pageY };
  let posX = event.pageX,
    posY = event.pageY;
  return { posX, posY };
}
