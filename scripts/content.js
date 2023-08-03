// Set favicon
document.querySelector("link[rel~='icon']").href = chrome.runtime.getURL("../assets/icon128.png");

function waitForElement(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

// Set loading page icon
waitForElement('[aria-label="Loading…"]').then((container) => {
  container.innerHTML = "";

  const twitterIcon = document.createElement("img");
  twitterIcon.src = chrome.runtime.getURL("../assets/icon128.png");
  twitterIcon.width = 42;
  twitterIcon.height = 42;
  container.appendChild(twitterIcon);
});

// Set web app icon
waitForElement('[aria-label="Twitter"]').then((elm) => {
  const container = elm.children[0];
  container.innerHTML = "";

  const twitterIcon = document.createElement("img");
  twitterIcon.src = chrome.runtime.getURL("../assets/icon128.png");
  twitterIcon.width = 42;
  twitterIcon.height = 42;
  container.appendChild(twitterIcon);
});

// Set tweet button
waitForElement('[aria-label="Post"]').then((elm) => {
  // from the element find any descendant that is a <span> with the innerText "Post"
  const tweetButton = findSpanWithTweetInnerHTML(elm);

  if (tweetButton) {
    tweetButton.innerText = "Tweet";
  }
});

function findSpanWithTweetInnerHTML(element) {
  if (element.children.length === 0) {
    return null;
  }
  for (let i = 0; i < element.children.length; i++) {
    const child = element.children[i];
    if (child.tagName === 'SPAN' && child.innerHTML === 'Post') {
      return child;
    }
    const found = findSpanWithTweetInnerHTML(child);
    if (found !== null) {
      return found;
    }
  }
  return null;
}

