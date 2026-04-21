(() => {
  const TOAST_ID = "zen-workspace-toast";
  let hideTimeout = null;

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
    const duration = parseInt(
      Services.prefs.getStringPref("mod.workspace-toast.duration", "1800"),
      10
    );
    const showIcon = Services.prefs.getBoolPref(
      "mod.workspace-toast.show-icon",
      true
    );

    const label = showIcon
      ? `${workspace.icon} ${workspace.name}`
      : workspace.name;

    const toast = getOrCreateToast();
    toast.textContent = label;

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
