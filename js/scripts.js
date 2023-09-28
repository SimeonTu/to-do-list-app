function newItem() {
  //jQuery
  // 1. Adding a new item to the list of items:

  //Defining variables
  let checkedlist = $("#checkedList");
  let checkedcounter = $("#checkedCounter");
  let list = $("#list");
  list.show(); //show unordered list element only when a new list item is added

  let li = $("<li></li>");
  let form = $('<form name="toDoList" class="item-form"></form>');
  let handle = $('<span class="handle">#</span>');
  let checkbox = $('<input type="checkbox" class="check-box"></input>');
  let textbox = $(
    '<input type="text" name="ListItem" class="text-box"></input>'
  );
  let crossOutButton = $("<crossOutButton>X</crossOutButton>"); // 2. Adding a delete button

  //Assembling elements
  form.append(handle);
  form.append(checkbox);
  form.append(textbox);
  form.append(crossOutButton);
  li.append(form);

  //Slide down animation for each new list item
  li.hide();
  list.append(li);
  li.slideDown(100);

  //Function to assign numbered IDs to each available list item for preserving order (when an item is unchecked, it goes back to its original place in the list)
  rearrange();

  //Adding event listeners
  checkbox.on("click", checkedBox); //Checking a box adds the item to separate "checked list" for finished tasks

  crossOutButton.on("click", function () {
    //Pressing the "X" button deletes items from the list
    li.slideUp(100); //Slide up animation
    setTimeout(deleteListItem, 125); //Delete item after animation finishes
  });

  // 3. Making the lists sortable
  $("#list").sortable({
    handle: ".handle", //Can only be sorted by dragging the "handle" (represented by a "#")
    update: rearrange, //Dragging elements updates their IDs to be in proper order
  });

  $("#checkedList").sortable({
    handle: ".handle",
    update: rearrange,
  });

  //Function to assign IDs to elements in numbered order
  function rearrange() {
    $("li").each(function (index) {
      $(this).prop("id", index + 1);
    });
  }

  //Function to add and remove items from checked list
  function checkedBox() {
    if (checkbox.prop("checked")) {
      checkedcounter.show();
      checkedlist.show();
      checkedlist.append(li);
      li.children(".item-form").children(".text-box").addClass("strike"); // 4. Crossing an item out: (items are crossed out when they're added to the checked list)
      li.children(".item-form").children(".text-box").css("color", "grey");

      updateCheckedList();
    } else {
      if ($(`#list li:nth-child(${li.prop("id")})`).length < 1) {
        list.append(li);
        li.children(".item-form").children(".text-box").removeClass("strike");
        li.children(".item-form").children(".text-box").css("color", "black");
        console.log(li.children());

        updateCheckedList();
      } else {
        li.insertBefore($(`#list li:nth-child(${li.prop("id")})`));
        li.children(".item-form").children(".text-box").removeClass("strike");
        li.children(".item-form").children(".text-box").css("color", "black");

        updateCheckedList();
      }
    }
  }

  //Function to update checked items counter and hide the element if there are no checked items
  function updateCheckedList() {
    $("#checkedCounter span").text(checkedlist.children().length);

    if (checkedlist.children().length < 1) {
      checkedcounter.hide();
    }
  }

  //Function with tasks to perform when an item is removed from the list
  function deleteListItem() {
    li.remove();
    rearrange();
    console.log(localStorage);

    updateCheckedList();
  }
  
}
