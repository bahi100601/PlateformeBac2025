const scriptURL = "https://script.google.com/macros/s/AKfycbwOUrAP7CvqodmTALm0giKPfgfUShXndkuipS4X4cvzCc235xVCCxceRLOArhU7yLjr/exec";

window.onload = function () {
  const form = document.getElementById("studForm");
  const msg = document.getElementById("statusMsg");

  document.getElementById("addStud").onclick = () => handleSubmit("add");
  document.getElementById("getStud").onclick = () => handleSubmit("get");
  document.getElementById("delStud").onclick = () => handleSubmit("delete");
  document.getElementById("editStud").onclick = () => handleSubmit("edit");
  document.getElementById("clearForm").onclick = clearForm;

  function handleSubmit(action) {
    const data = {
      action: action,
      regNo: get("regNo"),
      lname: get("lname"),
      fname: get("fname"),
      dob: get("dob"),
      grade: get("grade"),
      stream: get("stream"),
      regPass: get("regPassStud"),
      phase1: get("phase1"),
      phase2: get("phase2"),
      pedDate: get("pedDate"),
      socDate: get("socDate"),
      wish: get("wish"),
      major: get("major"),
      state: get("state"),
      payNotes: get("payNotes")
    };

    fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.text())
      .then(text => {
        if (action === "get") {
          if (text === "NOT_FOUND") {
            msg.textContent = "الطالب غير موجود.";
          } else {
            const result = JSON.parse(text);
            set("regNo", result["رقم التسجيل"]);
            set("lname", result["اللقب"]);
            set("fname", result["الاسم"]);
            set("dob", result["تاريخ الميلاد"]);
            set("grade", result["المعدل"]);
            set("stream", result["الشعبة"]);
            set("regPassStud", result["الرقم السري"]);
            set("phase1", result["مرحلة التسجيل الأولي"]);
            set("phase2", result["مرحلة تأكيد التسجيل"]);
            set("pedDate", result["تاريخ التسجيل البيداغوجي"]);
            set("socDate", result["تاريخ تسجيل الخدمات الجامعية"]);
            set("wish", result["الرغبة"]);
            set("major", result["التخصص"]);
            set("state", result["الولاية"]);
            set("payNotes", result["حالة الدفع"]);
            msg.textContent = "تم جلب بيانات الطالب.";
          }
        } else if (text === "EXISTS") {
          msg.textContent = "الطالب مسجل مسبقًا.";
        } else if (text === "ADDED") {
          msg.textContent = "تمت إضافة الطالب.";
          clearForm();
        } else if (text === "UPDATED") {
          msg.textContent = "تم تعديل بيانات الطالب.";
        } else if (text === "DELETED") {
          msg.textContent = "تم حذف الطالب.";
          clearForm();
        } else {
          msg.textContent = "حدث خطأ: " + text;
        }
      });
  }

  function get(id) {
    return document.getElementById(id).value.trim();
  }

  function set(id, value) {
    document.getElementById(id).value = value || "";
  }

  function clearForm() {
    form.reset();
    msg.textContent = "";
  }
};
