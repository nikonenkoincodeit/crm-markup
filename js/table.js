$(document).ready(function () {
  const mainBody = $(".js-main-body");
  const numSel = $(".js-num-sel");

  const tableBox = $(".table-box");
  const w = tableBox.width();

  function addResizableTable(selector) {
    $(selector).width(w);
    const colNum = $(selector + " thead tr th").length;

    $(selector).colResizable({
      minWidth: 60,
      liveDrag: true,
      gripInnerHtml: `<div class='grip'>
        <svg width="15" height="15">
        <use href="./images/icons.svg#icon-sync"></use>
    </svg>
        </div>`,
      draggingClass: "dragging",
      disabledColumns: [0, colNum - 2],
    });

    const allCheckbox = $(selector + ' tbody input[type="checkbox"]');
    const cellSetting = $(selector)
      .closest(".js-main-body")
      .find(".js-cell-setting");
    const mainCheckbox = $(selector + ' input[name="all"]');

    mainCheckbox.on("change", (e) => {
      updateCheckbox(e.target.checked);
      const num = $(selector + ' tbody input[type="checkbox"]:checked').length;
      toggleActionBox(num);
    });

    function updateCheckbox(toggle) {
      $.each(allCheckbox, (i, el) => {
        el.checked = toggle;
      });
    }

    allCheckbox.on("change", (e) => {
      const num = $(selector + ' tbody input[type="checkbox"]:checked').length;
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
  }

  addResizableTable(".table1");
  addResizableTable(".table2");

  const tableManagement = $(".table-management");

  const tableManagementWidth = tableManagement.width();

  let showTableManagement = false;

  $(".app").on("click", (e) => {
    if (e.target.closest(".fixed-cell")) return;
    if (!showTableManagement) return;

    tableManagement[0].style.cssText = ``;
    showTableManagement = false;
  });

  $(".fixed-cell").on("click", (e) => {
    const { x, y } = e.target.getBoundingClientRect();
    const left = x - tableManagementWidth;
    tableManagement[0].style.cssText = `left: ${left}px; top: ${y}px; display: block`;
    setTimeout(() => {
      showTableManagement = true;
    }, 0);
  });

  const btnFilter = $(".js-btn-filter");
  const searchBlock = $("search-block");
  const collapseBtn = $(".js-collapse-btn");

  btnFilter.on("click", () => {
    searchBlock.addClass("show");
  });

  collapseBtn.on("click", () => {
    searchBlock.removeClass("show");
  });
});
