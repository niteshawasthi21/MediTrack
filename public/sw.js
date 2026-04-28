self.addEventListener("install", () => {
  console.log("Service Worker Installed");
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("Service Worker Activated");
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SHOW_NOTIFICATION") {
    event.waitUntil(
      self.registration.showNotification(event.data.title, {
        body: event.data.body,
        icon: "/icon.png",
      })
    );
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(clients.openWindow("/dashboard"));
});