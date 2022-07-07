const detectInteraction = (observedEntryInfoList) => {
  for (let index = 0; index < observedEntryInfoList.length; index++) {
    const observedEntryInfo = observedEntryInfoList[index];
    if (observedEntryInfo.isIntersecting) {
      console.log(`[attach]`, observedEntryInfo.target);
      observedEntryInfo.target.src = observedEntryInfo.target.dataset.loadUrl;
      observedEntryInfo.target.classList.remove('lazy');
      lazyLoadObserver.unobserve(observedEntryInfo.target);
    } else {
      console.log(`[detach]`, observedEntryInfo.target);
    }
  }
};

const lazyLoadObserver = new IntersectionObserver(detectInteraction);
const lazyLoadDomList = [...document.querySelectorAll('video.lazy')];
for (let index = 0; index < lazyLoadDomList.length; index++) {
  const lazyLoadDom = lazyLoadDomList[index];
  lazyLoadObserver.observe(lazyLoadDom);
}
