export {};
declare global {
  interface Window {
    $message: import("naive-ui").MessageApi;
    $dialog: import("naive-ui").DialogApi;
    $loadingBar: import("naive-ui").LoadingBarApi;
  }
}
