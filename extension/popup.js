const urlInput = document.getElementById("url");
const sourceTitleInput = document.getElementById("source_title");
const topicInput = document.getElementById("topic");
const notesInput = document.getElementById("notes");
const saveBtn = document.getElementById("saveBtn");
const statusEl = document.getElementById("status");

function setStatus(message, type) {
  statusEl.textContent = message;
  statusEl.className = type || "";
}

async function init() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab?.url) {
    urlInput.value = tab.url;
  }
  if (tab?.title) {
    sourceTitleInput.value = tab.title;
  }
}

async function saveLearning() {
  const url = urlInput.value.trim();
  const source_title = sourceTitleInput.value.trim();
  const topic_name = topicInput.value.trim();
  const notes = notesInput.value.trim();

  if (!url || !topic_name) {
    setStatus("URL and topic tag are required.", "err");
    return;
  }

  if (
    SOURCESNAP_CONFIG.SUPABASE_URL.includes("PASTE_YOUR") ||
    SOURCESNAP_CONFIG.SUPABASE_KEY.includes("PASTE_YOUR")
  ) {
    setStatus("Set up config.js with your Supabase project first.", "err");
    return;
  }

  saveBtn.disabled = true;
  setStatus("Saving...", "");

  try {
    const response = await fetch(
      `${SOURCESNAP_CONFIG.SUPABASE_URL}/rest/v1/learnings`,
      {
        method: "POST",
        headers: {
          apikey: SOURCESNAP_CONFIG.SUPABASE_KEY,
          Authorization: `Bearer ${SOURCESNAP_CONFIG.SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ url, source_title, topic_name, notes }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Insert failed.");
    }

    setStatus("Saved! Check your SourceSnap dashboard.", "ok");
    setTimeout(() => window.close(), 900);
  } catch (err) {
    console.error(err);
    setStatus("Failed to save. See console for details.", "err");
  } finally {
    saveBtn.disabled = false;
  }
}

saveBtn.addEventListener("click", saveLearning);
init();
