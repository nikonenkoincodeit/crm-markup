$(document).ready(function () {
  const allCheckbox = $('tbody input[type="checkbox"]');
  const mainBody = $(".js-main-body");
  const cellSetting = $(".js-cell-setting");
  const mainCheckbox = $('input[name="all"]');
  const numSel = $(".js-num-sel");

  mainCheckbox.on("change", (e) => {
    updateCheckbox(e.target.checked);
    const num = $('tbody input[type="checkbox"]:checked').length;
    toggleActionBox(num);
  });

  function updateCheckbox(toggle) {
    $.each(allCheckbox, (i, el) => {
      el.checked = toggle;
    });
  }

  allCheckbox.on("change", (e) => {
    const num = $('tbody input[type="checkbox"]:checked').length;
    mainCheckbox[0].checked = Boolean(num);
    toggleActionBox(num);
  });

  function toggleActionBox(num) {
    numSel.text(num);
    if (num > 0) {
      cellSetting.removeClass("is-hidden");
    } else {
      cellSetting.addClass("is-hidden");
    }
  }

  const height = cellSetting.height();

  mainBody.on("scroll", (e) => {
    if (mainBody.scrollTop() > height + 20) {
      cellSetting.removeClass("pos-abs");
    } else {
      cellSetting.addClass("pos-abs");
    }
  });

  $("table").colResizable({
    liveDrag: true,
    gripInnerHtml: `<div class='grip'>
    <svg width="15" height="15">
    <use href="./images/icons.svg#icon-sync"></use>
</svg>
    </div>`,
    draggingClass: "dragging",
    minWidth: 100,
    disabledColumns: [0, 5],
  });
});
