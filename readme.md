# Workspace Toast for Zen Browser

A lightweight mod that shows a subtle toast notification with the workspace icon and name whenever you switch workspaces in Zen Browser's onlysidebar or compact mode — so you always know where you are.

---

## Screenshot

<!-- Add screenshot here -->
![Workspace Toast preview](./preview.png)

---

## Installation

1. Open Zen Browser settings and navigate to the **Sine** section.
2. Paste the repository URL into the mod input field:
   ```
   https://github.com/Nelkit/zen-workspace-toast
   ```
3. Click **Install** and reload the browser.

---

## How It Works

The mod intercepts `gZenWorkspaces.changeWorkspace`, the internal method Zen Browser calls when switching workspaces. After the original method resolves, it reads the workspace `icon` and `name` from the workspace object and renders a temporary overlay element on screen. The element fades in via CSS and is automatically hidden after the configured duration using a `clearTimeout`-guarded `setTimeout`, preventing overlapping toasts on rapid switches.

---

## Preferences

All preferences are accessible via the Sine mod settings panel.

| Preference | Description | Options | Default |
| --- | --- | --- | --- |
| `mod.workspace-toast.duration` | How long the toast stays visible | Any value in ms | `1800` |
| `mod.workspace-toast.show-icon` | Show the workspace emoji icon next to the name | `true` / `false` | `true` |
| `mod.workspace-toast.position` | Where the toast appears on screen | `Bottom` / `Top` | `Bottom` |
| `mod.workspace-toast.size` | Size of the toast | `Small` / `Regular` / `Large` | `Small` |
| `mod.workspace-toast.background` | Background style | `Solid` / `Blur` | `Solid` |

---

## Compatibility

- Zen Browser with **onlysidebar** mode
- Zen Browser with **compact** mode

---

## License

MIT
