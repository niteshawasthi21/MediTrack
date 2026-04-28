export async function requestNotificationPermission() {
  if (!("Notification" in window)) return "unsupported";

  const permission = await Notification.requestPermission();
  return permission;
}

export async function sendNotification(title: string, body: string) {
  if (!("serviceWorker" in navigator)) return;
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  const registration = await navigator.serviceWorker.ready;

  registration.active?.postMessage({
    type: "SHOW_NOTIFICATION",
    title,
    body,
  });
}