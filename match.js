(() => {
  const form = document.getElementById("match-form");
  const course = form.elements.course;
  const teacher = form.elements.teacher;
  const result = document.getElementById("request-result");
  const download = document.getElementById("download-request");
  const email = document.getElementById("email-request");
  const share = document.getElementById("share-request");
  const status = document.getElementById("request-status");
  const manualCopy = document.getElementById("manual-copy");
  const inbox = window.helpingHandsConfig.tutoringEmail.trim();
  let requestText = "";
  let downloadUrl = "";

  const selectedCourse = new URLSearchParams(location.search).get("course");
  if (selectedCourse && Array.from(course.options).some((option) => option.value === selectedCourse)) {
    course.value = selectedCourse;
  }

  teacher.addEventListener("input", () => teacher.setCustomValidity(""));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const teacherName = teacher.value.trim();
    if (!teacherName) {
      teacher.setCustomValidity("Enter your teacher’s name.");
      teacher.reportValidity();
      return;
    }

    const courseName = course.selectedOptions[0].text;
    const rows = [
      ["Course", courseName],
      ["Teacher", teacherName],
      ["Support requested", form.elements.support.value]
    ];
    const firstName = form.elements.student.value.trim();
    const studyGoal = form.elements.goal.value.trim();
    if (firstName) rows.push(["Student", firstName]);
    if (studyGoal) rows.push(["Study goal", studyGoal]);

    const summary = document.getElementById("request-summary");
    summary.replaceChildren();
    for (const [label, value] of rows) {
      const row = document.createElement("div");
      const term = document.createElement("dt");
      const detail = document.createElement("dd");
      term.textContent = label;
      detail.textContent = value;
      row.append(term, detail);
      summary.append(row);
    }

    requestText = ["Helping Hands Peer Tutoring", "Tutor request", "",
      ...rows.map(([label, value]) => label + ": " + value)].join("\n");
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    downloadUrl = URL.createObjectURL(new Blob([requestText + "\n"], { type: "text/plain;charset=utf-8" }));
    download.href = downloadUrl;
    if (inbox) {
      email.href = "mailto:" + inbox + "?subject=" + encodeURIComponent(courseName + " tutor request")
        + "&body=" + encodeURIComponent(requestText);
      email.hidden = false;
      download.classList.replace("button-primary", "button-outline");
    }
    share.hidden = typeof navigator.share !== "function";
    manualCopy.hidden = true;
    status.textContent = "";
    form.hidden = true;
    result.hidden = false;
    document.getElementById("result-title").focus();
  });

  document.getElementById("copy-request").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(requestText);
      manualCopy.hidden = true;
      status.textContent = "Request copied.";
    } catch {
      manualCopy.hidden = false;
      const text = document.getElementById("copy-text");
      text.value = requestText;
      text.focus();
      text.select();
      status.textContent = "Your request is selected for copying.";
    }
  });

  share.addEventListener("click", async () => {
    try {
      await navigator.share({ title: "Helping Hands tutor request", text: requestText });
    } catch (error) {
      if (error.name !== "AbortError") status.textContent = "You can share the request by downloading or copying it.";
    }
  });

  document.getElementById("edit-request").addEventListener("click", () => {
    result.hidden = true;
    form.hidden = false;
    course.focus();
  });
  document.getElementById("create-request").disabled = false;
})();
