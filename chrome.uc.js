(() => {
  const TOAST_ID = "zen-workspace-toast";
  const VERSION = "1.0.3";
  let hideTimeout = null;

  console.log(`[Workspace Toast v${VERSION}] installed and running.`);

  function getPref(type, key, fallback) {
    try {
      if (type === "string") return Services.prefs.getStringPref(key, fallback);
      if (type === "bool")   return Services.prefs.getBoolPref(key, fallback);
    } catch {
      return fallback;
    }
  }

  function getOrCreateToast() {
    let toast = document.getElementById(TOAST_ID);
    if (!toast) {
      toast = document.createElement("div");
      toast.id = TOAST_ID;
      document.documentElement.appendChild(toast);
    }
    return toast;
  }

  function showToast(workspace) {
    const duration   = parseInt(getPref("string", "mod.workspace-toast.duration", "1800"), 10);
    const showIcon   = getPref("bool",   "mod.workspace-toast.show-icon",   true);
    const position   = getPref("string", "mod.workspace-toast.position",    "bottom");
    const size       = getPref("string", "mod.workspace-toast.size",        "small");
    const background = getPref("string", "mod.workspace-toast.background",  "solid");

    const label = showIcon ? `${workspace.icon} ${workspace.name}` : workspace.name;

    const toast = getOrCreateToast();
    toast.textContent = label;
    toast.dataset.position   = position;
    toast.dataset.size       = size;
    toast.dataset.background = background;

    clearTimeout(hideTimeout);
    toast.classList.add("visible");

    hideTimeout = setTimeout(() => {
      toast.classList.remove("visible");
    }, duration);
  }

  const original = gZenWorkspaces.changeWorkspace.bind(gZenWorkspaces);

  gZenWorkspaces.changeWorkspace = async function (workspace, ...args) {
    const result = await original(workspace, ...args);
    showToast(workspace);
    return result;
  };
})();
