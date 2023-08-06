$(document).ready(function () {
  const galleryEl = document.querySelector(".js-gallery");
  const plusEl = $(".js-plus");
  const minusEl = $(".js-minus");

  const style = window.getComputedStyle(galleryEl);
  let columns = style.gridTemplateColumns.split(" ").length;

  plusEl.on("click", () => {
    columns += 1;
    if (columns > 8) columns = 8;
    updateColumns();
  });

  minusEl.on("click", () => {
    columns -= 1;
    if (columns < 1) columns = 1;
    updateColumns();
  });

  function updateColumns() {
    galleryEl.style.cssText = `grid-template-columns: repeat(${columns}, 1fr);`;
  }
});
