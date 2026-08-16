# Browser, Device, and WebView Compatibility

Use when behavior depends on browser engines, operating systems, device sizes, touch, keyboard, WebView versions, native capabilities, or feature support.

## Support contract

Define the supported matrix before choosing a fix:

```text
platform: browser | WebView | React Native
engine/device: project-supported values
input: keyboard | pointer | touch | assistive technology
network: online | slow | offline
capability: supported | unavailable | permission denied
```

Prefer capability detection and progressive enhancement over user-agent assumptions. Define fallback behavior when a capability is missing. Keep platform
branches at explicit boundaries; do not spread checks through components unrelated to the changed branch.

## Verification

Test the changed risk on the smallest matrix that covers every changed platform branch or capability. Check viewport, orientation, safe area, touch target,
keyboard, focus, hover absence, reduced motion, file/input behavior, WebView bridge, permissions, and offline or slow network when the changed code touches
those surfaces. Record browser/device, version, route, and evidence.

Report documentation impact when a compatibility branch becomes a stable project rule.
