let audibleTabs = [];
let index = 0;
chrome.tabs.onUpdated.addListener(async (id, info) => {
  await loadAudibleTabs();
  index = 0;
});

async function loadAudibleTabs() {

  audibleTabs = await chrome.tabs.query({ audible: true })
  index = 0;
  chrome.action.setBadgeText({ text: audibleTabs.length == 0 ? "" : audibleTabs.length.toString() });
}
chrome.commands.onCommand.addListener(async (commandName, _) => {
  if (audibleTabs.length == 0)
    return;
  switch (commandName) {
    case 'previous_source':
      index--;
      if (index < 0)
        index = audibleTabs.length - 1;
      break;
    case 'next_source':
      index++;
      if (index > audibleTabs.length - 1)
        index = 0;
      break;

    default:
      break;
  }
  await chrome.tabs.update(audibleTabs[index].id, { active: true })

});
(async () => {
  await loadAudibleTabs();
})();