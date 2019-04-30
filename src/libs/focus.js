const appTitle = document.title;
document.addEventListener("visibilitychange", () => {
  const isHidden = document.hidden;
  if (isHidden) {
    document.title = `HALO - 🌈及时行乐`;
  } else {
    document.title = appTitle;
  }
});
