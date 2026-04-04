// Jam - Popup Script

document.addEventListener("DOMContentLoaded", () => {
  // Load stored data
  chrome.storage.local.get(["lastScan", "totalScans", "blockedCount", "isEnabled"], (data) => {
    document.getElementById("totalScans").textContent = data.totalScans || 0;
    document.getElementById("blockedCount").textContent = data.blockedCount || 0;

    if (data.lastScan) {
      updateLastScan(data.lastScan);
    }

    const toggle = document.getElementById("toggleProtection");
    if (data.isEnabled === false) {
      toggle.classList.remove("active");
    }
  });

  // Toggle protection
  document.getElementById("toggleProtection").addEventListener("click", function () {
    this.classList.toggle("active");
    const isEnabled = this.classList.contains("active");
    chrome.storage.local.set({ isEnabled });
    document.getElementById("safeStatus").textContent = isEnabled ? "✓" : "⏸";
  });

  // Demo mode
  document.getElementById("demoBtn").addEventListener("click", () => {
    const text = document.getElementById("demoInput").value.trim();
    if (!text) return;

    document.getElementById("demoBtn").disabled = true;
    document.getElementById("demoBtn").textContent = "Analyzing...";

    chrome.runtime.sendMessage({ action: "analyzeText", text }, (result) => {
      document.getElementById("demoBtn").disabled = false;
      document.getElementById("demoBtn").textContent = "Analyze Content";

      if (result) {
        const demoResult = document.getElementById("demoResult");
        demoResult.classList.add("show");

        const badge = document.getElementById("demoBadge");
        badge.textContent = result.classification;
        badge.className = "badge badge-" + result.classification.toLowerCase();

        document.getElementById("demoConfidence").textContent = (result.confidence * 100).toFixed(0) + "%";
        document.getElementById("demoKeywords").textContent = result.keywords.length > 0
          ? "Keywords: " + result.keywords.join(", ")
          : "";

        updateLastScan(result);
        chrome.storage.local.get(["totalScans", "blockedCount"], (data) => {
          document.getElementById("totalScans").textContent = data.totalScans || 0;
          document.getElementById("blockedCount").textContent = data.blockedCount || 0;
        });
      }
    });
  });
});

function updateLastScan(scan) {
  document.getElementById("scanUrl").textContent = scan.url || scan.title || "—";
  document.getElementById("scanTime").textContent = new Date(scan.timestamp).toLocaleTimeString();
  const badge = document.getElementById("scanBadge");
  badge.style.display = "inline-block";
  badge.textContent = scan.classification;
  badge.className = "badge badge-" + scan.classification.toLowerCase();

  const status = document.getElementById("safeStatus");
  if (scan.classification === "HARMFUL") {
    status.textContent = "⚠";
    status.style.color = "#f87171";
  } else if (scan.classification === "FAKE") {
    status.textContent = "⚠";
    status.style.color = "#fbbf24";
  } else {
    status.textContent = "✓";
    status.style.color = "#34d399";
  }
}
