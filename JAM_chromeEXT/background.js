// Activity logs stored in memory (and chrome.storage)
let logs = [];

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "LOG") {
    const log = msg.data;
    logs.push(log);
    if (logs.length > 100) logs = logs.slice(-100);
    chrome.storage.local.set({ activityLogs: logs });

    // Attempt to send to Vultr backend (configurable URL)
    chrome.storage.local.get("vultrApiUrl", (data) => {
      if (data.vultrApiUrl) {
        fetch(data.vultrApiUrl + "/api/logs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(log)
        }).catch(() => {});
      }
    });

    // Update badge based on category
    if (log.category === "HARMFUL") {
      chrome.action.setBadgeText({ text: "!", tabId: sender.tab?.id });
      chrome.action.setBadgeBackgroundColor({ color: "#e91e63", tabId: sender.tab?.id });
    } else if (log.category === "FAKE") {
      chrome.action.setBadgeText({ text: "⚠", tabId: sender.tab?.id });
      chrome.action.setBadgeBackgroundColor({ color: "#ff9800", tabId: sender.tab?.id });
    } else {
      chrome.action.setBadgeText({ text: "✓", tabId: sender.tab?.id });
      chrome.action.setBadgeBackgroundColor({ color: "#66bb6a", tabId: sender.tab?.id });
    }
  }

  if (msg.type === "ANALYZE_TEXT") {
    // Demo analysis from popup
    sendResponse({ received: true });
  }
});

// Initialize logs from storage
chrome.storage.local.get("activityLogs", (data) => {
  if (data.activityLogs) logs = data.activityLogs;
});
