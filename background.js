let audibleTabs = [];
let index = 0;
chrome.tabs.onUpdated.addListener(async (id, info) => {
  await loadAudibleTabs();
  index = 0;
});

async function loadAudibleTabs() {

  audibleTabs = await chrome.tabs.query({ audible: true })
  index = 0;
}
chrome.commands.onCommand.addListener(async (s, t) => {
  if (audibleTabs.length == 0)
    return;
  switch (s) {
    case 'previous_source':
      index--;
      if (index < 0)
        index = audibleTabs.length;
      break;
    case 'next_source':
      index++;
      if (index > audibleTabs.length)
        index = 0;
      break;

    default:
      break;
  }
  await chrome.tabs.update(audibleTabs[index % audibleTabs.length].id, { active: true })

});
(async () => {
  await loadAudibleTabs();
})();